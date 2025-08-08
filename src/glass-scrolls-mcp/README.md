# Glass Scrolls MCP (Trace & Replay)

Commands:

- `demo`: runs a stubbed plan, records events with schema `{ts,type,stepId,toolName,input,output,durationMs}`, and writes trace to `demos/bass/out/trace.json`.
- `replay`: replays the plan using the recorded trace without calling tools; writes memo to `demos/bass/out/memo.txt`.

Usage:

```bash
npm run build --workspaces
node src/glass-scrolls-mcp/dist/index.js demo
node src/glass-scrolls-mcp/dist/index.js replay
```