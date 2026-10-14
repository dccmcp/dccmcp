# Contributing

Thanks for helping. Two things to read first: `LICENSING.md` (what is open, what
is commercial) and this file.

## Developer Certificate of Origin

Every commit must be signed off:

```bash
git commit -s -m "hosts: fix Blender 5.2 colour-management translation"
```

The `Signed-off-by:` line certifies the Developer Certificate of Origin (see
`DCO`). There is no CLA.

## Which license applies to your contribution

Your contribution is licensed under the license of the directory you change:

| Directory | License |
| --- | --- |
| `packages/contract`, `packages/verify`, `packages/gateway`, `packages/dccmcp*` | Apache-2.0 |
| `packages/dccmcp-blender/plugin`, `packages/dccmcp-qgis/plugin` | GPL-2.0-or-later |
| `packages/dccmcp-freecad/plugin` | LGPL-2.1-or-later |
| `ee/**` | Not open for external contribution (issues and design discussion welcome) |

Add an SPDX header to every new source file:

```js
// SPDX-License-Identifier: Apache-2.0
```

```python
# SPDX-License-Identifier: GPL-2.0-or-later
```

## Hard rules enforced by CI

1. `ee/` may depend on `packages/*`. The reverse is forbidden.
2. `packages/*` must not import anything from `ee/`.
3. Host plugins must not import the gateway implementation — they talk over a
   protocol, not over imports. Only generated types from `packages/contract` are
   allowed.
4. The contract has a single source of truth: `packages/contract/schema`. Files
   under `generated/` are build output; edit the schema and re-run `npm run gen`.
5. Every source file carries an SPDX header (`npm run check:boundary` and
   `reuse lint` both check this).

Run the same checks CI runs, before pushing:

```bash
npm run check:boundary
npm run check:generated
```

## Adding a new host integration

1. Add `packages/dccmcp-<host>/` with a `cli.js` that exposes `serve` and
   `doctor` (copy an existing host's CLI as the starting point).
2. Pick the license from `LICENSING.md` — GPL-family hosts keep the in-host
   plugin under `plugin/` with a GPL-compatible license.
3. Register the package in `scripts/publish-all.sh` (order matters only for the
   root CLI, which publishes first).
4. Update the docs site so the install command matches what actually ships.

## Reporting issues

Please include: host application and version, the output of `dccmcp doctor`, and
your OS. `dccmcp doctor` prints a block you can paste — that is exactly what we
built it for.
