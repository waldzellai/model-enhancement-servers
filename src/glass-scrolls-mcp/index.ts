#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runPlan } from './loop.js';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'demo:bass';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (command === 'demo:bass') {
    const planPath = path.resolve(__dirname, 'plans', 'bass.plan.yaml');
    await runPlan({ planFilePath: planPath, outputDir: process.cwd() });
    return;
  }

  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});