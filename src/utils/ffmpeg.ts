import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function mergeVideoAudio(videoPath: string, audioPath: string, outputPath: string): Promise<boolean> {
  const spinner = ora('Merging video and audio...').start();
  
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y', // Overwrite output file
      '-i', videoPath,
      '-i', audioPath,
      '-c:v', 'copy', // Copy video stream without re-encoding
      '-c:a', 'aac',  // Re-encode audio to AAC
      '-strict', 'experimental',
      outputPath
    ]);

    ffmpeg.stderr.on('data', (data) => {
      // FFmpeg outputs progress to stderr
      const output = data.toString();
      if (output.includes('time=')) {
        const timeMatch = output.match(/time=(\d{2}:\d{2}:\d{2})/);
        if (timeMatch) {
          spinner.text = `Merging video and audio... ${timeMatch[1]}`;
        }
      }
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        spinner.succeed(chalk.green('Successfully merged video and audio'));
        
        // Clean up temporary files
        try {
          fs.unlinkSync(videoPath);
          fs.unlinkSync(audioPath);
        } catch (error) {
          console.warn(chalk.yellow('Warning: Could not clean up temporary files'));
        }
        
        resolve(true);
      } else {
        spinner.fail(chalk.red(`FFmpeg failed with code ${code}`));
        reject(new Error(`FFmpeg process exited with code ${code}`));
      }
    });

    ffmpeg.on('error', (error) => {
      spinner.fail(chalk.red(`FFmpeg error: ${error.message}`));
      reject(error);
    });
  });
}

export function checkFFmpegAvailable(): boolean {
  try {
    const { execSync } = require('child_process');
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
