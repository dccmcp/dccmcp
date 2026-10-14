#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
/**
 * Enforces the open-core license boundary described in LICENSING.md.
 *
 * Rules
 *  1. packages/** must never import or reference ee/**        (reverse dependency)
 *  2. packages/*!(!plugin)/** must not import the gateway implementation
 *     (only generated types from packages/contract are allowed outside plugins)
 *  3. ee/** may depend on packages/**                         (allowed, not checked)
 *  4. every source file in a non-reservation package must carry an SPDX header
 *
 * Reservation packages (npm name placeholders, UNLICENSED) are exempt from rule 4
 * until a real implementation lands; see LICENSING.md "Name reservation".
 *
 * Usage: node scripts/check-license-boundary.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", "__pycache__"]);
const SOURCE_EXT = new Set([".js", ".mjs", ".cjs", ".ts", ".tsx", ".py"]);

/** Packages kept as UNLICENSED npm name reservations (see LICENSING.md). */
const RESERVATION_PACKAGES = new Set([
  "dccmcp",
  "dccmcp-blender",
  "dccmcp-maya",
  "dccmcp-houdini",
  "dccmcp-3dsmax",
  "dccmcp-rhino",
  "dccmcp-zbrush",
  "dccmcp-photoshop",
  "dccmcp-freecad",
  "dccmcp-qgis",
  "dccmcp-opencv",
]);

/** Directories that are part of the open integration layer (rule 4 target). */
const OPEN_DIRS = ["packages", "scripts"];

const violations = [];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, out);
    } else if (SOURCE_EXT.has(entry.name.slice(entry.name.lastIndexOf(".")))) {
      out.push(full);
    }
  }
  return out;
}

const pathOf = (file) => relative(ROOT, file).split(sep).join("/");

/** Extract import specifiers / referenced paths from JS, TS and Python. */
function specifiers(source) {
  const found = new Set();
  const patterns = [
    /(?:^|\n)\s*import\s[^;]*?from\s*["']([^"']+)["']/g,
    /(?:^|\n)\s*import\s*["']([^"']+)["']/g,
    /(?:^|\n)\s*export\s[^;]*?from\s*["']([^"']+)["']/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
    /(?:^|\n)\s*import\s+([A-Za-z0-9_.]+)/g, // python: import a.b, os
    /(?:^|\n)\s*from\s+([A-Za-z0-9_.]+)\s+import\b/g, // python: from a.b import c
  ];
  for (const re of patterns) {
    for (const match of source.matchAll(re)) found.add(match[1]);
  }
  return [...found];
}

const isReservation = (rel) => {
  const m = rel.match(/^packages\/([^/]+)\//);
  return Boolean(m) && RESERVATION_PACKAGES.has(m[1]);
};

const files = [...walk(join(ROOT, "packages")), ...walk(join(ROOT, "ee")), ...walk(join(ROOT, "scripts"))];

for (const file of files) {
  const rel = pathOf(file);
  const source = readFileSync(file, "utf8");
  const specs = specifiers(source);

  // Rule 1: nothing under packages/** may reach into ee/**
  if (rel.startsWith("packages/")) {
    for (const spec of specs) {
      if (spec.includes("ee/") || spec.startsWith("@dccmcp/ee") || spec.includes("../ee")) {
        violations.push(
          `[rule 1] ${rel} imports "${spec}" — packages/** must never depend on ee/** (see LICENSING.md)`,
        );
      }
    }
  }

  // Rule 2: host plugins talk over a protocol, not over imports
  const pluginMatch = rel.match(/^packages\/([^/]+)\/plugin\//);
  if (pluginMatch) {
    for (const spec of specs) {
      const touchesGateway =
        spec.includes("gateway") ||
        spec.startsWith("@dccmcp/gateway") ||
        /(^|\/)packages\/gateway/.test(spec);
      const isContract = spec.startsWith("@dccmcp/contract") || spec.includes("contract/generated");
      if (touchesGateway && !isContract) {
        violations.push(
          `[rule 2] ${rel} imports "${spec}" — host plugins must not import the gateway implementation ` +
            `(protocol only; generated contract types are allowed)`,
        );
      }
    }
  }

  // Rule 4: SPDX header required outside reservation packages
  if (OPEN_DIRS.some((d) => rel.startsWith(`${d}/`)) && !isReservation(rel) && !rel.includes("/generated/")) {
    const head = source.split("\n").slice(0, 5).join("\n");
    if (!/SPDX-License-Identifier:/.test(head)) {
      violations.push(`[rule 4] ${rel} has no "SPDX-License-Identifier" header`);
    }
  }
}

const scanned = files.length;
if (violations.length > 0) {
  console.error(`license boundary: ${violations.length} violation(s) across ${scanned} files\n`);
  for (const v of violations) console.error(`  ✗ ${v}`);
  console.error("\nSee LICENSING.md and CONTRIBUTING.md for the rules.");
  process.exit(1);
}
console.log(`license boundary: OK (${scanned} files scanned)`);
