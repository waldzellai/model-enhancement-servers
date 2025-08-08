import { spawn } from 'node:child_process';
import { once } from 'node:events';

export interface PyCall {
  fn: 'run_model' | 'sweep' | 'sensitivity';
  payload: any;
}

function getPythonCmd(): string {
  return process.env.PYTHON || 'python3';
}

export async function callPythonWorker(call: PyCall): Promise<any> {
  const child = spawn(getPythonCmd(), ['-u', 'python/worker/main.py'], { stdio: ['pipe', 'pipe', 'inherit'] });
  child.stdin.write(JSON.stringify(call) + '\n');
  child.stdin.end();
  const [stdout] = await once(child.stdout, 'data');
  const text = stdout.toString('utf-8').trim();
  try { return JSON.parse(text); } catch (e) { throw new Error('Invalid JSON from python: ' + text); }
}