#!/usr/bin/env bash
set -euo pipefail

# Resolve repo root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

OUT_DIR="$REPO_ROOT/demos/bass/out"
RUN_JSON="$OUT_DIR/run.json"
TRACE_JSON="$OUT_DIR/trace.json"

mkdir -p "$OUT_DIR"

# Run the server briefly to ensure it boots (stdio server; we just check it starts)
# Use timeout to avoid hanging. Prefer gtimeout on macOS if available.
TIMEOUT_BIN="timeout"
if command -v gtimeout >/dev/null 2>&1; then
  TIMEOUT_BIN="gtimeout"
fi

# Start server and capture a brief log
TMP_LOG="$(mktemp)"
if command -v "$TIMEOUT_BIN" >/dev/null 2>&1; then
  "$TIMEOUT_BIN" 2s pnpm -s dev >"$TMP_LOG" 2>&1 || true
else
  # Fallback: run in background and kill after 2s
  (pnpm -s dev >"$TMP_LOG" 2>&1 & echo $! >"$TMP_LOG.pid")
  sleep 2
  if [ -f "$TMP_LOG.pid" ]; then
    kill "$(cat "$TMP_LOG.pid")" 2>/dev/null || true
    rm -f "$TMP_LOG.pid"
  fi
fi
if ! grep -q "\[or-server\] ready" "$TMP_LOG"; then
  echo "Server did not report ready; log:" >&2
  cat "$TMP_LOG" >&2
  exit 1
fi

# Produce demo outputs
cat >"$RUN_JSON" <<'JSON'
{
  "demo": "bass",
  "status": "ok",
  "message": "Glass Scrolls bootstrap demo",
  "timestamp": "__NOW__"
}
JSON

cat >"$TRACE_JSON" <<'JSON'
{
  "trace": [
    { "event": "start" },
    { "event": "server_ready" },
    { "event": "write_outputs" },
    { "event": "done" }
  ]
}
JSON

# Replace timestamp with current ISO string
if command -v node >/dev/null 2>&1; then
  node -e "const fs=require('fs'); const p='$RUN_JSON'; const s=fs.readFileSync(p,'utf8').replace('__NOW__', new Date().toISOString()); fs.writeFileSync(p,s);"
else
  # Fallback: use date
  sed -i.bak "s/__NOW__/$(date -u +%Y-%m-%dT%H:%M:%SZ)/" "$RUN_JSON" && rm -f "$RUN_JSON.bak"
fi

# Validate that JSON files are non-empty and valid JSON using node if present
if command -v node >/dev/null 2>&1; then
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$RUN_JSON"
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$TRACE_JSON"
fi

# Print path to run.json as required
echo "$RUN_JSON"