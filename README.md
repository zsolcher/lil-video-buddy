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

## Legal Disclaimer and Terms of Use

### YouTube Terms of Service Compliance

⚠️ **Important Legal Notice**: This tool is provided for educational and personal use only. Users are responsible for ensuring their usage complies with applicable laws and platform terms of service.

#### YouTube's Terms of Service
- YouTube's Terms of Service generally prohibit downloading content unless explicitly permitted by YouTube or the content owner
- Users should only download content they have legal rights to download (e.g., their own content, public domain content, or content with explicit permission)
- Commercial use of downloaded content may violate copyright laws and platform terms

#### Responsible Usage Guidelines
✅ **Recommended Uses**:
- Downloading your own uploaded content
- Educational purposes with proper fair use considerations
- Content explicitly marked as downloadable by the creator
- Public domain or Creative Commons licensed content
- Backup of content you have legal rights to

❌ **Not Recommended**:
- Downloading copyrighted content without permission
- Commercial redistribution of downloaded content
- Violating content creators' intellectual property rights
- Circumventing platform monetization systems

### Copyright and Intellectual Property

- All downloaded content remains subject to original copyright and licensing terms
- Users must respect intellectual property rights of content creators
- This tool does not grant any rights to copyrighted material
- Content creators' rights supersede any functionality provided by this tool

### Geographic and Legal Considerations

- Laws regarding content downloading vary by jurisdiction
- Users in certain regions may face additional legal restrictions
- Some countries have specific copyright laws that may apply
- Users should consult local legal requirements before using this tool

### Disclaimer of Liability

- This software is provided "as is" without warranty of any kind
- The developers are not responsible for users' compliance with terms of service or applicable laws
- Users assume all risks and legal responsibilities for their usage
- The tool's existence does not constitute legal advice or permission to download content

### Platform Policy Changes

- Platform terms of service may change without notice
- Users should regularly review YouTube's Terms of Service
- This tool may cease to function if platforms implement technical or legal restrictions
- The developers may modify or discontinue this tool to ensure compliance

### Ethical Considerations

🤝 **Support Content Creators**:
- Consider supporting creators through official channels (subscriptions, donations, merchandise)
- Respect creators' wishes regarding content distribution
- Use official platform features when available (offline viewing, playlists)
- Understand that creators rely on platform engagement and monetization

### Contact and Compliance

If you believe this tool is being used in violation of your rights or if you have questions about compliance:
- Content creators should contact users directly regarding their content
- Platform policy questions should be directed to the respective platforms
- Legal concerns should be addressed through appropriate legal channels

**Remember**: Technology should be used responsibly and ethically. Always prioritize respect for content creators and compliance with applicable laws and terms of service.

