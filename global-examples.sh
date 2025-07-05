#!/bin/bash

echo "🎥 Lil Video Buddy - Global Usage Examples"
echo "=========================================="
echo ""

echo "📋 Show help:"
echo "video-buddy --help"
echo ""

echo "📋 Show version:"
echo "video-buddy --version"
echo ""

echo "⬇️  Download a video (MP4, highest quality):"
echo "video-buddy download \"https://www.youtube.com/watch?v=VIDEO_ID\""
echo ""

echo "🎵 Download as MP3:"
echo "video-buddy dl \"https://www.youtube.com/watch?v=VIDEO_ID\" --format mp3"
echo ""

echo "📁 Download to custom directory:"
echo "video-buddy download \"https://www.youtube.com/watch?v=VIDEO_ID\" --output ~/Downloads/videos"
echo ""

echo "📊 List available formats:"
echo "video-buddy formats \"https://www.youtube.com/watch?v=VIDEO_ID\""
echo ""

echo "🔧 Install/Uninstall globally:"
echo "npm run install-global    # Install globally"
echo "npm run uninstall-global  # Uninstall globally"
echo ""

echo "✅ lil-video-buddy is now available globally!"
echo "You can run 'video-buddy' from any directory."
