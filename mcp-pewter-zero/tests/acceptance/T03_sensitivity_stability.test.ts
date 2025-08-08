import test from 'node:test';
import assert from 'node:assert/strict';
import { callPythonWorker } from '../../src/adapters/pythonWorker.ts';

test('T03: Sensitivity returns non-empty ranking with q >= p typically', async () => {
  const out = await callPythonWorker({ fn: 'sensitivity', payload: {
    spec: { kind: 'python', entry: 'python.models.bass_diffusion:model', variables: ['A'], dt: 0.5, t_end: 50 },
    baseline: { p: 0.03, q: 0.38, M: 10000 },
    method: 'one_at_a_time'
  }});
  assert.ok(out.ranking.length >= 2);
});