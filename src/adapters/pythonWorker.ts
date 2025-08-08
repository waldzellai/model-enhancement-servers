import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

export type PythonWorkerRequest = {
  fn: string
  payload: unknown
}

export async function callPythonWorker<T = any>(request: PythonWorkerRequest): Promise<T> {
  const pythonPath = 'python3'
  const workerPath = path.resolve('/workspace/python/worker/main.py')

  return new Promise<T>((resolve, reject) => {
    const child = spawn(pythonPath, [workerPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: process.env,
    })

    let stdoutBuffer = ''
    let settled = false

    const settle = async (value: any, isError = false) => {
      if (settled) return
      settled = true
      try {
        // Persist the last run result for verification/debugging
        const runJsonPath = path.resolve('/workspace/run.json')
        await writeFile(runJsonPath, JSON.stringify(value, null, 2), 'utf-8')
      } catch (_) {
        // ignore file write errors
      }
      if (isError) reject(value)
      else resolve(value as T)
      // Ensure child is cleaned up
      try { child.kill() } catch {}
    }

    child.stdout.setEncoding('utf-8')
    child.stdout.on('data', (chunk: string) => {
      stdoutBuffer += chunk
      const idx = stdoutBuffer.indexOf('\n')
      if (idx !== -1) {
        const line = stdoutBuffer.slice(0, idx)
        stdoutBuffer = ''
        try {
          const parsed = JSON.parse(line)
          if (parsed && parsed.error) {
            settle(new Error(parsed.error), true)
          } else {
            settle(parsed, false)
          }
        } catch (err) {
          settle(err, true)
        }
      }
    })

    child.stderr.setEncoding('utf-8')
    child.stderr.on('data', (chunk: string) => {
      // Surface stderr lines in case parsing never resolves
      // Do not settle on stderr alone
      console.error('[python-worker]', chunk.trim())
    })

    child.on('error', (err) => {
      settle(err, true)
    })

    child.on('close', (code) => {
      if (!settled) {
        settle(new Error(`Python worker exited with code ${code}`), true)
      }
    })

    // Send the single-line JSON request
    try {
      const line = JSON.stringify(request) + '\n'
      child.stdin.write(line)
      child.stdin.end()
    } catch (err) {
      settle(err, true)
    }
  })
}