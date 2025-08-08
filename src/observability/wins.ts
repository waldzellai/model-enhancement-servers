import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export type WinRecord = {
  timestamp: string;
  template: string;
  demo: string;
  kind: string;
  ci: boolean;
  sha?: string;
  actor?: string;
  runId?: string;
  repo?: string;
  host?: string;
};

function getRepoRoot(): string {
  return process.cwd();
}

function ensureDirectoryExists(directoryPath: string): void {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function readExistingLog(logFilePath: string): WinRecord[] {
  try {
    if (!fs.existsSync(logFilePath)) {
      return [];
    }
    const content = fs.readFileSync(logFilePath, 'utf8').trim();
    if (!content) {
      return [];
    }
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLog(logFilePath: string, records: WinRecord[]): void {
  fs.writeFileSync(logFilePath, JSON.stringify(records, null, 2) + '\n', 'utf8');
}

async function postJson(urlString: string, data: unknown): Promise<void> {
  try {
    await fetch(urlString, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'user-agent': 'wins-telemetry/1.0' },
      body: JSON.stringify(data),
    });
  } catch {
    // Ignore webhook failures; local log is primary
  }
}

export async function recordWin(params: { template: string; demo: string; kind: string }): Promise<WinRecord> {
  const repoRoot = getRepoRoot();
  const winsDir = path.join(repoRoot, '.wins');
  const logFilePath = path.join(winsDir, 'log.json');

  ensureDirectoryExists(winsDir);

  const record: WinRecord = {
    timestamp: new Date().toISOString(),
    template: params.template,
    demo: params.demo,
    kind: params.kind,
    ci: !!process.env.CI,
    sha: process.env.GITHUB_SHA,
    actor: process.env.GITHUB_ACTOR,
    runId: process.env.GITHUB_RUN_ID,
    repo: process.env.GITHUB_REPOSITORY,
    host: os.hostname(),
  };

  const existing = readExistingLog(logFilePath);
  existing.push(record);
  writeLog(logFilePath, existing);

  const webhookUrl = process.env.WINS_WEBHOOK;
  if (webhookUrl) {
    await postJson(webhookUrl, record);
  }

  return record;
}

export default recordWin;