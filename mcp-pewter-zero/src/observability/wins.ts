import * as fs from 'node:fs/promises';
const LOG = '.wins/log.json';

export async function recordWin(event: { template: string; demo: string; kind: 'local'|'web'; meta?: any }) {
  try {
    const prev = JSON.parse(await fs.readFile(LOG, 'utf-8')) as any[];
    prev.push({ ts: Date.now(), ...event });
    await fs.writeFile(LOG, JSON.stringify(prev, null, 2));
  } catch {
    await fs.mkdir('.wins', { recursive: true });
    await fs.writeFile(LOG, JSON.stringify([{ ts: Date.now(), ...event }], null, 2));
  }
  if (process.env.WINS_WEBHOOK) {
    // optional webhook post
    // await fetch(process.env.WINS_WEBHOOK, { method: 'POST', body: JSON.stringify(event) });
  }
}