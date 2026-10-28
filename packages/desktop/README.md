# @dccmcp/desktop

DCCMCP Desktop shell (M0): Tauri 2 window + tray with placeholder status data.
Connection state, policy and checkpoints live in `packages/gateway`; paid
governance UI lands in `ee/desktop-governance` (see `LICENSING.md`).

## Develop

```bash
npm install
npm run dev -w @dccmcp/desktop        # frontend only (Vite)
npm run tauri -w @dccmcp/desktop -- dev   # full desktop app
npm run tauri -w @dccmcp/desktop -- build
```

Icons are regenerated from a placeholder PNG via `npm run icon -w @dccmcp/desktop`.

## Status

Fake data only. The gateway IPC contract lands in M1 (Obsidian vault, doc 41).
Do not wire the UI to real hosts yet.
