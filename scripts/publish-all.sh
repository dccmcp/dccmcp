#!/usr/bin/env bash
#
# Publish every DCCMCP package to the public npm registry.
#
# The machine's default registry is often a mirror (registry.npmmirror.com),
# which is read-only. Publishing always targets registry.npmjs.org explicitly.
#
# Usage:
#   bash scripts/publish-all.sh --dry-run   # build tarballs, publish nothing
#   bash scripts/publish-all.sh             # publish for real
#
set -euo pipefail

REGISTRY="https://registry.npmjs.org"
DRY_RUN=""
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN="--dry-run"

cd "$(dirname "$0")/.."

# Publish order: the CLI first, then the per-application servers.
PACKAGES=(
  dccmcp
  dccmcp-blender
  dccmcp-maya
  dccmcp-houdini
  dccmcp-3dsmax
  dccmcp-rhino
  dccmcp-zbrush
  dccmcp-photoshop
  dccmcp-freecad
  dccmcp-qgis
  dccmcp-opencv
)

if [[ -z "$DRY_RUN" ]]; then
  if ! npm whoami --registry "$REGISTRY" >/dev/null 2>&1; then
    echo "Not logged in to npm. Run this first, then re-run the script:" >&2
    echo "  npm login --registry $REGISTRY --auth-type web" >&2
    exit 1
  fi
  echo "Publishing as: $(npm whoami --registry "$REGISTRY")"
fi

failed=()
for name in "${PACKAGES[@]}"; do
  printf '%-22s ' "$name"
  if (cd "packages/$name" && npm publish --registry "$REGISTRY" $DRY_RUN >/tmp/npm-publish.log 2>&1); then
    if [[ -n "$DRY_RUN" ]]; then
      echo "dry run ok"
    else
      echo "published"
    fi
  else
    echo "FAILED"
    sed 's/^/    /' /tmp/npm-publish.log | tail -6
    failed+=("$name")
  fi
done

echo
if (( ${#failed[@]} )); then
  echo "${#failed[@]} package(s) failed: ${failed[*]}" >&2
  exit 1
fi
echo "All ${#PACKAGES[@]} packages processed."
