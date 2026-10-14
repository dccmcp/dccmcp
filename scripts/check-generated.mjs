#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
/**
 * Rule: everything under a package's generated/ directory is build output and must
 * not be edited by hand. `npm run gen` writes a manifest of their hashes; this script verifies
 * the working tree still matches it.
 *
 * Skips (with a notice) when no manifest exists yet — the generator lands with
 * the contract implementation.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const MANIFEST = join(ROOT, "packages/contract/generated/.manifest.json");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name !== ".manifest.json") out.push(full);
  }
  return out;
}

if (!existsSync(MANIFEST)) {
  console.log("check-generated: no manifest yet (generator ships with the contract implementation) — skipped");
  process.exit(0);
}

const dir = join(ROOT, "packages/contract/generated");
const expected = JSON.parse(readFileSync(MANIFEST, "utf8"));
const actual = {};
for (const file of walk(dir)) {
  const rel = relative(dir, file).split(sep).join("/");
  actual[rel] = createHash("sha256").update(readFileSync(file)).digest("hex");
}

const drift = [];
for (const [rel, hash] of Object.entries(actual)) {
  if (!(rel in expected)) drift.push(`${rel} (untracked: regenerate with "npm run gen")`);
  else if (expected[rel] !== hash) drift.push(`${rel} (modified by hand)`);
}
for (const rel of Object.keys(expected)) {
  if (!(rel in actual)) drift.push(`${rel} (deleted)`);
}

if (drift.length > 0) {
  console.error("check-generated: generated files drifted from the manifest\n");
  for (const d of drift) console.error(`  ✗ ${d}`);
  console.error("\nEdit packages/contract/schema instead, then run npm run gen.");
  process.exit(1);
}
console.log(`check-generated: OK (${Object.keys(actual).length} generated files match)`);
