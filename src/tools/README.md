# Tools

Report & memo utilities for demos.

## Usage

Build in workspace root:

```
npm run build --workspaces
```

Run the memo report generator (from repo root):

```
node src/tools/dist/report.js --template demos/bass/memo.template.md --inputDir demos/bass/out --outDir demos/bass/out --memoName memo.md
```

It prints a JSON summary with `assets` including the generated `memo.md` and optional `runs-chart.png`.