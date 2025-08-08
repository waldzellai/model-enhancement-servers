import test from 'node:test';
import assert from 'node:assert/strict';
import { callPythonWorker } from '../../src/adapters/pythonWorker.ts';

test('T02: Sweep respects budget and grid shape', async () => {
  const out = await callPythonWorker({ fn: 'sweep', payload: {
    spec: { kind: 'python', entry: 'python.models.bass_diffusion:model', variables: ['A'], dt: 0.5, t_end: 50 },
    grid: { p: [0.02,0.03], q: [0.3,0.4], M: [10000] },
    budget: 4
  }});
  assert.equal(out.runs.length, 4);
});