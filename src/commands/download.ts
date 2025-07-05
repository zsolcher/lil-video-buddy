import ytdl from '@distube/ytdl-core';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { sanitizeFilename } from '../utils/helpers';
import { mergeVideoAudio, checkFFmpegAvailable } from '../utils/ffmpeg';

interface DownloadOptions {
  output: string;
  quality: string;
  format: string;
}

export async function downloadVideo(url: string, options: DownloadOptions) {
  const spinner = ora('🎥 lil-video-buddy is validating URL...').start();

  try {
    // Validate URL
    if (!ytdl.validateURL(url)) {
      spinner.fail(chalk.red('Invalid YouTube URL'));
      return;
    }

    // Get video info
    spinner.text = '🔍 Fetching video information...';
    const info = await ytdl.getInfo(url);
    const title = sanitizeFilename(info.videoDetails.title);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(options.output)) {
      fs.mkdirSync(options.output, { recursive: true });
    }

    // Determine file extension
    const ext = options.format === 'mp3' ? 'mp3' : 'mp4';
    const filename = `${title}.${ext}`;
    const filepath = path.join(options.output, filename);

    spinner.succeed(chalk.green(`✨ Found: ${title}`));
    
    if (options.format === 'mp3') {
      // Download audio only for MP3
      await downloadAudioOnly(url, filepath, title);
    } else {
      // For MP4, try to get the best quality with audio
      await downloadVideoWithAudio(url, filepath, title, options.quality, info);
    }

  } catch (error) {
    spinner.fail(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
  }
}

async function downloadAudioOnly(url: string, filepath: string, title: string) {
  const downloadSpinner = ora(`Downloading ${path.basename(filepath)}...`).start();
  
  const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
  const writeStream = fs.createWriteStream(filepath);

  stream.pipe(writeStream);

  stream.on('progress', (chunkLength: number, downloaded: number, total: number) => {
    const percent = downloaded / total;
    downloadSpinner.text = `Downloading ${path.basename(filepath)}... ${(percent * 100).toFixed(1)}%`;
  });

  return new Promise<void>((resolve, reject) => {
    writeStream.on('finish', () => {
      downloadSpinner.succeed(chalk.green(`🎉 Downloaded: ${path.basename(filepath)}`));
      console.log(chalk.blue(`📁 Saved to: ${filepath}`));
      resolve();
    });

    writeStream.on('error', (error: Error) => {
      downloadSpinner.fail(chalk.red(`Download failed: ${error.message}`));
      reject(error);
    });
  });
}

async function downloadVideoWithAudio(url: string, filepath: string, title: string, quality: string, info: any) {
  // Check if FFmpeg is available for high-quality merging
  const hasFFmpeg = checkFFmpegAvailable();
  
  // Look for combined video+audio formats first
  const combinedFormats = ytdl.filterFormats(info.formats, 'videoandaudio');
  
  if (combinedFormats.length > 0 && (quality === 'lowest' || !hasFFmpeg)) {
    // Use combined format for simplicity or when FFmpeg is not available
    const downloadSpinner = ora(`Downloading ${path.basename(filepath)}...`).start();
    
    let format;
    if (quality === 'lowest') {
      format = combinedFormats[combinedFormats.length - 1]; // Last one is usually lowest quality
    } else {
      format = combinedFormats[0]; // First one is usually highest quality
    }
    
    const stream = ytdl(url, { quality: format.itag });
    const writeStream = fs.createWriteStream(filepath);

    stream.pipe(writeStream);

    stream.on('progress', (chunkLength: number, downloaded: number, total: number) => {
      const percent = downloaded / total;
      downloadSpinner.text = `Downloading ${path.basename(filepath)}... ${(percent * 100).toFixed(1)}%`;
    });

    return new Promise<void>((resolve, reject) => {
      writeStream.on('finish', () => {
        downloadSpinner.succeed(chalk.green(`🎉 Downloaded: ${path.basename(filepath)}`));
        console.log(chalk.blue(`📁 Saved to: ${filepath}`));
        resolve();
      });

      writeStream.on('error', (error: Error) => {
        downloadSpinner.fail(chalk.red(`Download failed: ${error.message}`));
        reject(error);
      });
    });
  } else if (hasFFmpeg) {
    // Use FFmpeg to merge best video and audio
    await downloadAndMerge(url, filepath, title, quality, info);
  } else {
    // Fallback to video-only if no other options
    console.log(chalk.yellow('Warning: FFmpeg not available and no combined formats found.'));
    console.log(chalk.yellow('Installing FFmpeg will enable high-quality video+audio downloads.'));
    
    const downloadSpinner = ora(`Downloading ${path.basename(filepath)} (video only)...`).start();
    
    const stream = ytdl(url, { quality: quality === 'lowest' ? 'lowest' : 'highest', filter: 'video' });
    const writeStream = fs.createWriteStream(filepath);

    stream.pipe(writeStream);

    stream.on('progress', (chunkLength: number, downloaded: number, total: number) => {
      const percent = downloaded / total;
      downloadSpinner.text = `Downloading ${path.basename(filepath)} (video only)... ${(percent * 100).toFixed(1)}%`;
    });

    return new Promise<void>((resolve, reject) => {
      writeStream.on('finish', () => {
        downloadSpinner.succeed(chalk.yellow(`🎉 Downloaded: ${path.basename(filepath)} (no audio)`));
        console.log(chalk.blue(`📁 Saved to: ${filepath}`));
        resolve();
      });

      writeStream.on('error', (error: Error) => {
        downloadSpinner.fail(chalk.red(`Download failed: ${error.message}`));
        reject(error);
      });
    });
  }
}

async function downloadAndMerge(url: string, filepath: string, title: string, quality: string, info: any) {
  const tempDir = path.join(path.dirname(filepath), 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const tempVideoPath = path.join(tempDir, `${title}_video.mp4`);
  const tempAudioPath = path.join(tempDir, `${title}_audio.mp4`);

  try {
    // Download video stream
    const videoSpinner = ora('Downloading video stream...').start();
    const videoStream = ytdl(url, { quality: quality === 'lowest' ? 'lowest' : 'highest', filter: 'video' });
    const videoWriteStream = fs.createWriteStream(tempVideoPath);
    
    videoStream.pipe(videoWriteStream);
    
    videoStream.on('progress', (chunkLength: number, downloaded: number, total: number) => {
      const percent = downloaded / total;
      videoSpinner.text = `Downloading video stream... ${(percent * 100).toFixed(1)}%`;
    });

    await new Promise<void>((resolve, reject) => {
      videoWriteStream.on('finish', () => {
        videoSpinner.succeed(chalk.green('Video stream downloaded'));
        resolve();
      });
      videoWriteStream.on('error', reject);
    });

    // Download audio stream
    const audioSpinner = ora('Downloading audio stream...').start();
    const audioStream = ytdl(url, { quality: 'highestaudio', filter: 'audioonly' });
    const audioWriteStream = fs.createWriteStream(tempAudioPath);
    
    audioStream.pipe(audioWriteStream);
    
    audioStream.on('progress', (chunkLength: number, downloaded: number, total: number) => {
      const percent = downloaded / total;
      audioSpinner.text = `Downloading audio stream... ${(percent * 100).toFixed(1)}%`;
    });

    await new Promise<void>((resolve, reject) => {
      audioWriteStream.on('finish', () => {
        audioSpinner.succeed(chalk.green('Audio stream downloaded'));
        resolve();
      });
      audioWriteStream.on('error', reject);
    });

    // Merge video and audio
    await mergeVideoAudio(tempVideoPath, tempAudioPath, filepath);
    
    // Clean up temp directory
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
      console.warn(chalk.yellow('Warning: Could not clean up temporary directory'));
    }

    console.log(chalk.blue(`📁 Saved to: ${filepath}`));

  } catch (error) {
    // Clean up on error
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
    throw error;
  }
}
