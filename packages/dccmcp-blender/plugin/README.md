# Blender plugin (GPL-2.0-or-later)

The in-Blender half of the Blender integration: an addon that runs inside
Blender's process and exposes the live session to the DCCMCP gateway.

**License:** GPL-2.0-or-later (see `LICENSE` in this directory). Blender is GPL,
and addons that use `bpy` must be GPL-compatible.

**What it must never contain:** policy enforcement, approval decisions, audit
logic or any commercial feature. It reads state, performs atomic operations,
creates undo checkpoints and talks over a local socket. The gateway (separate
process, Apache-2.0) owns governance — that separation is what keeps the
proprietary layer legally separate (see root `LICENSING.md`).
