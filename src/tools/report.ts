#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Eta } from 'eta';
import fetch from 'node-fetch';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface AssetResult {
  type: 'file';
  path: string;
  mime?: string;
  description?: string;
}

interface RunSummary {
  totalRuns: number;
  successCount: number;
  failureCount: number;
  runFiles: string[];
  sampleKeys: string[];
  baselines: Record<string, unknown>;
}

function ensureDirectoryExists(directoryPath: string): void {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function readJsonFilesFromDirectory(inputDirectory: string): Array<Record<string, unknown>> {
  if (!fs.existsSync(inputDirectory)) return [];
  const files = fs.readdirSync(inputDirectory).filter((f) => f.endsWith('.json'));
  const results: Array<Record<string, unknown>> = [];
  for (const file of files) {
    const fullPath = path.join(inputDirectory, file);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const parsed = JSON.parse(content) as Record<string, unknown>;
      results.push(parsed);
    } catch (_err) {
      // skip invalid JSON
    }
  }
  return results;
}

function summarizeRuns(inputDirectory: string): RunSummary {
  const jsonObjects = readJsonFilesFromDirectory(inputDirectory);
  const runFiles = fs.existsSync(inputDirectory)
    ? fs.readdirSync(inputDirectory).filter((f) => f.endsWith('.json'))
    : [];

  let successCount = 0;
  let failureCount = 0;
  const sampleKeySet = new Set<string>();
  const baselines: Record<string, unknown> = {};

  for (const obj of jsonObjects) {
    // heuristic: look for status/success fields
    const status = (obj as any).status ?? (obj as any).result ?? (obj as any).outcome;
    const success = (obj as any).success ?? (typeof status === 'string' && status.toLowerCase() === 'success');
    if (success === true) successCount++;
    else if (success === false) failureCount++;

    // collect sample keys
    for (const key of Object.keys(obj)) sampleKeySet.add(key);

    // heuristic baseline extraction
    if ((obj as any).baseline) {
      Object.assign(baselines, (obj as any).baseline);
    }
    if ((obj as any).parameters) {
      if (typeof (obj as any).parameters === 'object') {
        Object.assign(baselines, (obj as any).parameters);
      }
    }
  }

  const totalRuns = jsonObjects.length;

  return {
    totalRuns,
    successCount,
    failureCount,
    runFiles,
    sampleKeys: Array.from(sampleKeySet).slice(0, 20),
    baselines,
  };
}

async function generateQuickChartPNG(
  config: Record<string, unknown>,
  outFile: string,
  width = 640,
  height = 360,
): Promise<boolean> {
  try {
    const res = await fetch('https://quickchart.io/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chart: config, width, height, format: 'png', backgroundColor: 'white' }),
    });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outFile, buf);
    return true;
  } catch (_err) {
    return false;
  }
}

async function main(): Promise<void> {
  const argv = await yargs(hideBin(process.argv))
    .option('template', {
      type: 'string',
      default: path.resolve(process.cwd(), 'demos/bass/memo.template.md'),
      describe: 'Path to Eta template file for the memo',
    })
    .option('inputDir', {
      type: 'string',
      default: path.resolve(process.cwd(), 'demos/bass/out'),
      describe: 'Directory containing run JSON files to summarize',
    })
    .option('outDir', {
      type: 'string',
      default: path.resolve(process.cwd(), 'demos/bass/out'),
      describe: 'Directory to write memo and assets',
    })
    .option('memoName', {
      type: 'string',
      default: 'memo.md',
      describe: 'Output memo filename',
    })
    .option('chart', {
      type: 'boolean',
      default: true,
      describe: 'Whether to generate a PNG chart via QuickChart',
    })
    .strict()
    .parse();

  const templatePath = argv.template as string;
  const inputDir = argv.inputDir as string;
  const outDir = argv.outDir as string;
  const memoName = argv.memoName as string;
  const shouldChart = argv.chart as boolean;

  ensureDirectoryExists(outDir);

  const eta = new Eta({ views: path.dirname(templatePath) });

  // Prepare context
  const runSummary = summarizeRuns(inputDir);
  const nowIso = new Date().toISOString();

  const chartPath = path.join(outDir, 'runs-chart.png');
  let chartGenerated = false;
  if (shouldChart) {
    const config = {
      type: 'bar',
      data: {
        labels: ['Success', 'Failure'],
        datasets: [
          {
            label: 'Runs',
            backgroundColor: ['#36a2eb', '#ff6384'],
            data: [runSummary.successCount, Math.max(runSummary.failureCount, runSummary.totalRuns - runSummary.successCount)],
          },
        ],
      },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } },
    } as Record<string, unknown>;

    chartGenerated = await generateQuickChartPNG(config, chartPath);
  }

  const templateContent = fs.existsSync(templatePath)
    ? fs.readFileSync(templatePath, 'utf-8')
    : `# Decision Memo\n\nGenerated: <%= it.nowIso %>\n\n## Baseline Parameters\n<%~ JSON.stringify(it.runSummary.baselines, null, 2) %>\n\n## Summary\n- Total runs: <%= it.runSummary.totalRuns %>\n- Successes: <%= it.runSummary.successCount %>\n- Failures: <%= it.runSummary.failureCount %>\n\n## Files\n<% for (const f of it.runSummary.runFiles) { %>- <%= f %>\n<% } %>\n\n<% if (it.chartGenerated) { %>![Run Chart](./runs-chart.png)\n<% } %>`;

  const rendered = eta.renderString(templateContent, {
    nowIso,
    runSummary,
    chartGenerated,
    chartPath: chartGenerated ? chartPath : undefined,
  });

  const memoPath = path.join(outDir, memoName);
  fs.writeFileSync(memoPath, rendered ?? '', 'utf-8');

  const assets: AssetResult[] = [
    { type: 'file', path: memoPath, mime: 'text/markdown', description: 'Rendered decision memo' },
  ];
  if (chartGenerated) {
    assets.push({ type: 'file', path: chartPath, mime: 'image/png', description: 'Runs summary chart' });
  }

  // Also include any JSON inputs as assets
  for (const f of runSummary.runFiles) {
    const p = path.join(inputDir, f);
    assets.push({ type: 'file', path: p, mime: 'application/json' });
  }

  // Print summary for CLI use
  const stats = fs.statSync(memoPath);
  const result = {
    ok: true,
    message: 'Memo generated',
    memoPath,
    bytes: stats.size,
    assets,
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});