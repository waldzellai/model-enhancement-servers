# Pewter Zero — MCP Server (System Dynamics + Operational Reasoning)

Operational Reasoning MCP server with a Python worker for simple system dynamics. Built with the Sequentialthinking++ Kit.

## Features
- Tools: run_model, sweep, sensitivity, report
- Python worker (pure-Python Bass fallback; PySD-ready)
- Trace + replay (JSON artifact)
- 5-minute first win demo (Bass diffusion)
- Wins telemetry (local file + optional webhook)

## Quickstart

- Prereqs: node >= 20, pnpm >= 9, python >= 3.10
- Setup
  - `pnpm install`
  - `cp .env.example .env`
- Dev server
  - `pnpm dev`
- Demo (Bass diffusion)
  - `pnpm demo:bass`  # produces `./demos/bass/out/{run.json, memo.md, trace.json}`
- Tests
  - `pnpm test`

## License
MIT