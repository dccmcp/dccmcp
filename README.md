# DCCMCP

**MCP servers for creative and engineering software.**

We build production-grade MCP servers, plugins and tool bridges that let AI agents control
Blender, Maya, Houdini, 3ds Max, Rhino, ZBrush, Photoshop, FreeCAD, QGIS and OpenCV — with typed
tools, safety policies, checkpoints and audit logs.

Documentation and downloads: **https://dccmcp.com**

## Packages

| Package | Integration |
| --- | --- |
| `dccmcp` | Command line: `policy`, `audit`, `restore`, `doctor`, `texture` |
| `dccmcp-blender` | Blender |
| `dccmcp-maya` | Maya |
| `dccmcp-houdini` | Houdini |
| `dccmcp-3dsmax` | 3ds Max |
| `dccmcp-rhino` | Rhino and Grasshopper |
| `dccmcp-zbrush` | ZBrush |
| `dccmcp-photoshop` | Photoshop |
| `dccmcp-freecad` | FreeCAD |
| `dccmcp-qgis` | QGIS |
| `dccmcp-opencv` | OpenCV |

All packages are pre-release. Run any of them with `--help` for the current status.

## Licensing

DCCMCP is **open-core**:

- **Open source (the integration layer)** — `packages/contract`, `packages/verify`,
  `packages/gateway`, the CLIs and every host adapter. Apache-2.0, except Blender and QGIS
  in-host plugins, which are GPL-2.0-or-later because those hosts require it.
- **Commercial (the governance and evidence layer)** — everything under `ee/`: team policies,
  approvals, roles, audit retention/export, multi-instance orchestration, rule packs and
  enterprise capabilities.

The boundary is a **process boundary**: host plugins talk to the gateway over a local protocol and
never link against the commercial layer. `LICENSING.md` is the authoritative description; run
`npm run check` to verify the boundary holds (CI runs the same check on every pull request).

Some packages in this repository currently exist to reserve an npm name. Those are marked
`UNLICENSED`, grant no rights, and change license in the same commit that lands a real
implementation.

## Maintainers

```bash
npm login --registry https://registry.npmjs.org --auth-type web
bash scripts/publish-all.sh --dry-run   # verify
bash scripts/publish-all.sh             # publish
```

Publishing always targets the public npm registry, never a mirror.

---

DCCMCP provides independent, third-party integrations. We are not affiliated with, endorsed by or
sponsored by any software vendor or project we interoperate with. All product names and trademarks
are the property of their respective owners and are used for identification and compatibility
purposes only.
