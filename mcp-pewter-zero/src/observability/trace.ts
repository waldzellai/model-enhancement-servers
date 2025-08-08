import * as fs from 'node:fs/promises';

export interface TraceEvent {
  t: number;
  type?: string;
  [k: string]: any;
}

export function setupTracing() {
  const events: TraceEvent[] = [];
  return {
    add: (e: any) => events.push({ t: Date.now(), ...e }),
    toJSON: () => ({ events }),
    persist: async (p: string) => fs.writeFile(p, JSON.stringify({ events }, null, 2)),
  };
}