#!/usr/bin/env node
/**
 * dccmcp — command line for DCCMCP
 *
 * This package name is reserved by DCCMCP. The CLI is not released yet.
 * Docs and release status: https://dccmcp.com/docs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const { name, version } = JSON.parse(readFileSync(join(here, "package.json"), "utf8"));

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);

if (flag("--version") || flag("-v")) {
  console.log(version);
  process.exit(0);
}

if (flag("--help") || flag("-h") || args.length === 0) {
  console.log(`
${name} ${version}
Command line for DCCMCP — MCP servers for creative and engineering software.

USAGE
  dccmcp <command> [options]

INTEGRATIONS
  npx dccmcp-blender serve      Blender
  npx dccmcp-maya serve         Maya
  npx dccmcp-houdini serve      Houdini
  npx dccmcp-3dsmax serve       3ds Max
  npx dccmcp-rhino serve        Rhino
  npx dccmcp-zbrush serve       ZBrush
  npx dccmcp-photoshop serve    Photoshop
  npx dccmcp-freecad serve      FreeCAD
  npx dccmcp-qgis serve         QGIS

COMMANDS
  doctor      Check installation and connection
  policy      Manage safety policies and approvals
  audit       Read the audit log
  restore     Restore a checkpoint
  texture     Configure texture export conventions
  import      Import a policy or tool set

STATUS
  This package name is reserved by DCCMCP. The CLI is not published yet.

  Docs      https://dccmcp.com/docs
  Website   https://dccmcp.com
`.trim());
  process.exit(0);
}

console.error(`${name}: the CLI is not released yet.`);
console.error(`Status and release date: https://dccmcp.com/docs`);
process.exit(1);
