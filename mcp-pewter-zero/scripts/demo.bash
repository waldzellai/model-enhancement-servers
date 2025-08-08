#!/usr/bin/env bash
set -euo pipefail

node --import=tsx -e "
  import { callPythonWorker } from './src/adapters/pythonWorker.ts';
  import fs from 'node:fs/promises';
  const input = { spec:{ kind:'python', entry:'python.models.bass_diffusion:model', variables:['A'], dt:0.5, t_end:50 }, params:{ p:0.03, q:0.38, M:10000 } };
  const out = await callPythonWorker({ fn:'run_model', payload: input });
  await fs.mkdir('demos/bass/out', { recursive: true });
  await fs.writeFile('demos/bass/out/run.json', JSON.stringify(out,null,2));
  await fs.writeFile('demos/bass/out/trace.json', JSON.stringify({ events:[{ type:'demo', input, output: out }]}, null, 2));
  console.log('Demo complete: demos/bass/out/run.json');
"