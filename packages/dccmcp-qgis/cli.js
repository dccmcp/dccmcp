#!/usr/bin/env node
/**
 * dccmcp-qgis — MCP server for QGIS
 *
 * This package name is reserved by DCCMCP. The integration is not released yet.
 * Docs and release status: https://dccmcp.com/mcp-for-qgis
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const { name, version } = JSON.parse(readFileSync(join(here, "package.json"), "utf8"));

const SOFTWARE = "QGIS";
const DOCS = "https://dccmcp.com/mcp-for-qgis";
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);

if (flag("--version") || flag("-v")) {
  console.log(version);
  process.exit(0);
}

if (flag("--help") || flag("-h") || args.length === 0) {
  console.log(`
${name} ${version}
MCP server for ${SOFTWARE} — let AI agents work inside a real ${SOFTWARE} session
with typed tools, safety policies, checkpoints and audit logs.

USAGE
  npx ${name} serve [options]

COMMANDS
  serve        Start the local MCP server and attach to ${SOFTWARE}
  doctor       Check the host application and connection

STATUS
  This package name is reserved by DCCMCP. The server is not published yet.

  Docs      ${DOCS}
  Website   https://dccmcp.com
  Download  https://dccmcp.com/download
`.trim());
  process.exit(0);
}

console.error(`${name}: the ${SOFTWARE} MCP server is not released yet.`);
console.error(`Status and release date: ${DOCS}`);
process.exit(1);
