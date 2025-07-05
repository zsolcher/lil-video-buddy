#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { downloadVideo } from './commands/download';
import { listFormats } from './commands/formats';

const program = new Command();

program
  .name('video-buddy')
  .description('🎥 lil-video-buddy - A lil CLI tool to download videos from web sources like YouTube')
  .version('1.0.0');

program
  .command('download')
  .alias('dl')
  .description('Download a video from a URL')
  .argument('<url>', 'Video URL to download')
  .option('-o, --output <path>', 'Output directory', './downloads')
  .option('-q, --quality <quality>', 'Video quality (highest, lowest, or specific itag)', 'highest')
  .option('-f, --format <format>', 'Output format (mp4, mp3)', 'mp4')
  .action(downloadVideo);

program
  .command('formats')
  .alias('fmt')
  .description('List available formats for a video')
  .argument('<url>', 'Video URL to check formats')
  .action(listFormats);

program.parse();
