# SPDX-License-Identifier: GPL-2.0-or-later
"""DCCMCP Bridge — the in-Blender half of the Blender integration.

This addon runs inside Blender's own process, so it is licensed
GPL-2.0-or-later (Blender is GPL, and addons that use ``bpy`` must be
GPL-compatible).

It deliberately contains no policy, approval or audit logic. Its only job is to
read real state, perform atomic operations and create undo checkpoints, and to
talk to the DCCMCP gateway over a local socket. Governance lives in the gateway,
outside the host process — that is what keeps this file separable from the
proprietary commercial layer (see LICENSING.md).

Implementation lands with P0; this file is the addon skeleton so the package
layout and the license boundary are real from day one.
"""

bl_info = {
    "name": "DCCMCP Bridge",
    "author": "DCCMCP",
    "version": (0, 1, 0),
    "blender": (4, 2, 0),
    "location": "View3D > Sidebar > DCCMCP",
    "description": "Local bridge that lets a DCCMCP gateway inspect and operate this Blender session.",
    "category": "Development",
}

GATEWAY_PROTOCOL_VERSION = 1


def register() -> None:
    """Called by Blender when the addon is enabled. Implementation lands with P0."""


def unregister() -> None:
    """Called by Blender when the addon is disabled. Implementation lands with P0."""


if __name__ == "__main__":
    register()
