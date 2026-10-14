#!/usr/bin/env node
// SPDX-License-Identifier: Apache-2.0
/**
 * Regenerates the contract build output and the manifest that proves it was not
 * hand-edited.
 *
 * Type emission (JSON Schema → TypeScript + Python) lands with the contract
 * implementation. The manifest is real today: `npm run check:generated` verifies
 * it, so any hand-edit of generated files fails CI the moment generation starts.
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIR = join(ROOT, "packages/contract/generated");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name !== ".manifest.json") out.push(full);
  }
  return out;
}

mkdirSync(DIR, { recursive: true });

const manifest = {};
for (const file of walk(DIR)) {
  const rel = relative(DIR, file).split(sep).join("/");
  manifest[rel] = createHash("sha256").update(readFileSync(file)).digest("hex");
}
writeFileSync(join(DIR, ".manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

const count = Object.keys(manifest).length;
console.log(`gen-contract: manifest written (${count} generated file${count === 1 ? "" : "s"})`);
if (count === 0) {
  console.log("gen-contract: type emission is stubbed until the contract implementation lands (T2)");
}
