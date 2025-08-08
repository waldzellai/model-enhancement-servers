import { recordWin } from '../src/observability/wins';

async function runDemo(): Promise<void> {
  // Placeholder for real demo logic. Simulate work.
  await new Promise((resolve) => setTimeout(resolve, 50));
}

async function main(): Promise<void> {
  try {
    await runDemo();
    const kind = process.env.CI ? 'ci' : 'local';
    await recordWin({ template: 'or-server', demo: 'bass', kind });
    // eslint-disable-next-line no-console
    console.log('Bass demo completed and win recorded.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Bass demo failed:', error);
    process.exitCode = 1;
  }
}

main();