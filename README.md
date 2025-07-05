# 🎥 Lil Video Buddy CLI

## Overview
A lil CLI tool to download videos from web sources like YouTube 🎬✨

## Features

✨ **High-Quality Downloads**: Automatically downloads the best video and audio streams and merges them using FFmpeg  
🎵 **Audio Extraction**: Convert videos to MP3 format  
🎯 **Quality Selection**: Choose from highest, lowest, or specific format (itag)  
📁 **Custom Output**: Specify output directory  
🔍 **Format Inspector**: List all available formats with quality and audio information  
⚡ **Smart Fallback**: Works with or without FFmpeg (with quality differences)  

## Global Installation

### Prerequisites
- **FFmpeg** (recommended for high-quality video+audio downloads)
  ```bash
  # Install FFmpeg on macOS
  brew install ffmpeg
  
  # Install FFmpeg on Ubuntu/Debian
  sudo apt update && sudo apt install ffmpeg
  
  # Install FFmpeg on Windows
  # Download from https://ffmpeg.org/download.html
  ```

### Install globally
```bash
npm install -g .
```

### Or for development (symlink)
```bash
npm run link
```

## Usage

### Download a video
```bash
# Download with default settings (highest quality MP4)
video-buddy download "https://www.youtube.com/watch?v=VIDEO_ID"

# Download to specific directory
video-buddy download "https://www.youtube.com/watch?v=VIDEO_ID" --output ./my-videos

# Download as MP3 (audio only)
video-buddy download "https://www.youtube.com/watch?v=VIDEO_ID" --format mp3

# Download specific quality
video-buddy download "https://www.youtube.com/watch?v=VIDEO_ID" --quality lowest

# Short alias
video-buddy dl "https://www.youtube.com/watch?v=VIDEO_ID" --format mp4
```

### List available formats
```bash
video-buddy formats "https://www.youtube.com/watch?v=VIDEO_ID"
# Or using alias
video-buddy fmt "https://www.youtube.com/watch?v=VIDEO_ID"
```

## Audio Quality Notes

🔊 **With FFmpeg installed**: Downloads best quality video and audio separately, then merges them for optimal quality  
⚠️ **Without FFmpeg**: Uses lower-quality combined video+audio formats or falls back to video-only  
✅ **Formats with ✓**: Combined video+audio formats that work without FFmpeg  
🎵 **MP3 downloads**: Always include audio regardless of FFmpeg availability  

## Commands

- `download <url>` (alias: `dl`) - Download a video from URL
  - `-o, --output <path>` - Output directory (default: ./downloads)
  - `-q, --quality <quality>` - Video quality: highest, lowest, or specific itag (default: highest)
  - `-f, --format <format>` - Output format: mp4 or mp3 (default: mp4)

- `formats <url>` (alias: `fmt`) - List available formats for a video

## Global Commands
Once installed globally, you can use these commands from anywhere:
```bash
video-buddy --help
video-buddy download <URL> --format mp4
video-buddy formats <URL>
```

## About Lil Video Buddy
Lil Video Buddy is a lightweight, user-friendly CLI tool designed to make video downloading simple and efficient. Despite being "lil", it packs powerful features like FFmpeg integration for high-quality downloads! 🚀

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Install globally for development
npm run install-global

# Uninstall global version
npm run uninstall-global

# Run in development mode (local)
npm run dev <command>

# Link for development (creates symlink)
npm run link

# Unlink development version
npm run unlink
```

