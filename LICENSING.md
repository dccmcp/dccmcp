# Licensing

DCCMCP is an open-core product. This file is authoritative for what is open
source, what is commercial, and where the boundary sits.

## Open source — the integration layer

| Path | License |
| --- | --- |
| `packages/contract`, `packages/verify`, `packages/gateway` | Apache-2.0 |
| `packages/dccmcp`, `packages/dccmcp-inspect` | Apache-2.0 |
| `packages/desktop` | Apache-2.0 |
| `packages/dccmcp-blender`, `packages/dccmcp-qgis` — CLI and MCP server | Apache-2.0 |
| `packages/dccmcp-blender/plugin`, `packages/dccmcp-qgis/plugin` | GPL-2.0-or-later |
| `packages/dccmcp-freecad/plugin` | LGPL-2.1-or-later |
| `packages/dccmcp-{rhino,maya,houdini,3dsmax,zbrush,photoshop}` | Apache-2.0 |
| `docs`, `examples` | Apache-2.0 (code) / CC-BY-4.0 (prose) |

Host plugins for GPL applications (Blender, QGIS) are GPL-2.0-or-later and are
distributed as source, as those host applications require. Everything else in
the integration layer is Apache-2.0: use it, modify it, redistribute it, ship it
inside a commercial pipeline.

## Commercial — the governance and evidence layer

`ee/**` is proprietary and is not covered by any open-source license. It contains
the team policy engine, approval workflows, role management, audit retention and
export, multi-instance orchestration, rule packs, the hosted rule/evidence
service, and enterprise capabilities (SSO, self-hosting, SIEM, SBOM, signed
builds). See `ee/LICENSE`.

## The boundary is a process boundary

Open and commercial components do not link. A host plugin (running inside the
host application's process) communicates with the gateway (a separate process)
only over a documented protocol on stdio or a local socket. No commercial module
is imported into, linked with, or executed inside a host application process.

This matters twice over:

1. **Licensing.** Separate processes talking over a documented protocol are not a
   single derived work, which keeps GPL host plugins separate from proprietary
   components.
2. **Trust.** The component that enforces read-only-by-default must be
   inspectable by the people who rely on it. That is why the gateway is open.

## Name reservation

Some packages in this repository exist to reserve an npm name before their
implementation lands. Those packages are marked `UNLICENSED` and grant no rights;
their README states that they are not released. A package changes license in the
same commit that introduces a real implementation — never afterwards.

## Contributions

Contributions are accepted under the Developer Certificate of Origin (see `DCO`).
By signing off a commit you certify that you have the right to submit it under
the license of the directory you are modifying.

## Questions

legal@dccmcp.com
