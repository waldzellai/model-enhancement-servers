import { callPythonWorker } from '../../src/adapters/pythonWorker';

const input = {
  spec: { kind: 'python', entry: 'python.models.bass_diffusion:model', variables: ['A'], dt: 0.5, t_end: 50 },
  params: { p: 0.03, q: 0.38, M: 10000 }
};

const out = await callPythonWorker({ fn: 'run_model', payload: input });
process.stdout.write(JSON.stringify(out));