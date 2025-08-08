#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

node "$ROOT_DIR/src/glass-scrolls-mcp/dist/index.js" demo | cat
node "$ROOT_DIR/src/glass-scrolls-mcp/dist/index.js" replay | cat

echo "Done. Outputs in $ROOT_DIR/demos/bass/out"