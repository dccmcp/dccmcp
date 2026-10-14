# @dccmcp/contract

The single source of truth for what an agent is allowed to call, on which host
version, and what it gets back when it fails. Apache-2.0.

## Layout

| Path | Contents |
| --- | --- |
| `schema/` | JSON Schema definitions — **the source of truth**. Language neutral. |
| `src/` | TypeScript entry point; re-exports generated types. |
| `generated/` | Build output (TS + Python types). Never edit by hand — run `npm run gen`. |

## Why JSON Schema

The contract is consumed by TypeScript (gateway, CLIs) and Python (in-host
plugins). Keeping the definition language-neutral is what makes the
"same contract across hosts" claim real rather than aspirational.

## Version tiers

Every capability declares `applicableVersions`. A capability that is not valid
for the running host version is **not exposed**, rather than exposed-and-failing.
That is the mechanism behind "the agent can never guess an API".
