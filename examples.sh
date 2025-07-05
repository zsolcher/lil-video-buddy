#!/bin/bash

# Example usage of video-buddy CLI

echo "Video Buddy CLI Examples"
echo "======================="

echo ""
echo "1. Show help:"
echo "   node dist/index.js --help"

echo ""
echo "2. Download a video (you'll need to provide a real YouTube URL):"
echo "   node dist/index.js download 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'"

echo ""
echo "3. Download as MP3:"
echo "   node dist/index.js download 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID' --format mp3"

echo ""
echo "4. List available formats:"
echo "   node dist/index.js formats 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'"

echo ""
echo "5. Download to specific directory:"
echo "   node dist/index.js download 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID' --output ./my-videos"

echo ""
echo "Note: Replace 'YOUR_VIDEO_ID' with an actual YouTube video ID"
