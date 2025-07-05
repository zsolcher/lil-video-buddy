import ytdl from '@distube/ytdl-core';
import chalk from 'chalk';
import ora from 'ora';

export async function listFormats(url: string) {
  const spinner = ora('🎥 lil-video-buddy is fetching video formats...').start();

  try {
    // Validate URL
    if (!ytdl.validateURL(url)) {
      spinner.fail(chalk.red('Invalid YouTube URL'));
      return;
    }

    // Get video info
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    
    spinner.succeed(chalk.green(`✨ Formats for: ${title}`));
    
    console.log(chalk.blue('\nAvailable formats:'));
    console.log(chalk.gray('─'.repeat(90)));
    console.log(chalk.gray('itag   A/V  Quality      Container  Size      Audio'));
    console.log(chalk.gray('─'.repeat(90)));
    
    const formats = info.formats.filter((format: any) => format.hasVideo || format.hasAudio);
    
    formats.forEach((format: any) => {
      const quality = format.qualityLabel || (format.audioBitrate ? format.audioBitrate + 'kbps' : 'N/A');
      const container = format.container || 'N/A';
      const hasVideo = format.hasVideo ? '📹' : '  ';
      const hasAudio = format.hasAudio ? '🔊' : '  ';
      const hasAudioText = format.hasAudio ? 'Yes' : 'No';
      const size = format.contentLength ? `(${(parseInt(format.contentLength) / 1024 / 1024).toFixed(1)}MB)` : '';
      const videoAndAudio = (format.hasVideo && format.hasAudio) ? chalk.green('✓') : ' ';
      
      console.log(`${chalk.yellow(format.itag.toString().padEnd(6))} ${hasVideo}${hasAudio} ${quality?.padEnd(12)} ${container?.padEnd(8)} ${size.padEnd(9)} ${hasAudioText.padEnd(5)} ${videoAndAudio}`);
    });
    
    console.log(chalk.gray('─'.repeat(90)));
    console.log(chalk.blue('Use the itag number with --quality flag for specific format'));
    console.log(chalk.green('✓ = Video+Audio combined format (recommended for MP4)'));
    console.log(chalk.yellow('Note: Formats without audio will produce silent videos'));
    
  } catch (error) {
    spinner.fail(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
  }
}
