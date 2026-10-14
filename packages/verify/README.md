# @dccmcp/verify

verification engine — part of the open integration layer (Apache-2.0). Skeleton only; the
implementation lands with P0 (see the roadmap note in the docs site and the
project planning vault).

Boundary rules that apply here: this package must never import from `ee/`, and
host plugins must never import this package directly — they talk over stdio or a
local socket protocol.
