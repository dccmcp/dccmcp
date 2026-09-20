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
