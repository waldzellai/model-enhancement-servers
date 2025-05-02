#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runServer } from './server.js';

const argv = yargs(hideBin(process.argv))
  .option('port', {
    alias: 'p',
    type: 'number',
    description: 'Port number for the server to listen on',
    default: 3000, // Default port
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
    default: false,
  })
  .help()
  .alias('help', 'h')
  .parseSync();

runServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
