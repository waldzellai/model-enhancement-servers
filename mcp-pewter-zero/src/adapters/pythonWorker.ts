import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface PyCall {
  fn: 'run_model' | 'sweep' | 'sensitivity';
  payload: any;
}

function getPythonCmd(): string {
  return process.env.PYTHON || 'python3';
}

function getWorkerPath(): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, '../../python/worker/main.py');
}

export async function callPythonWorker(call: PyCall): Promise<any> {
  const workerPath = getWorkerPath();
  return await new Promise((resolve, reject) => {
    const child = spawn(getPythonCmd(), ['-u', workerPath], { stdio: ['pipe', 'pipe', 'inherit'] });

    let stdoutBuffer = '';
    child.stdout.setEncoding('utf-8');
    child.stdout.on('data', (chunk: string) => {
      stdoutBuffer += chunk;
    });

    child.on('error', (err) => reject(err));

    child.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python worker exited with code ${code}`));
      }
      const text = stdoutBuffer.trim();
      // If the worker ever prints multiple lines, read the last non-empty line
      const lastLine = text.split('\n').filter(Boolean).pop() ?? '';
      try {
        resolve(JSON.parse(lastLine));
      } catch (e) {
        reject(new Error('Invalid JSON from python: ' + lastLine));
      }
    });

    child.stdin.write(JSON.stringify(call) + '\n');
    child.stdin.end();
  });
}