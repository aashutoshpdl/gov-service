#!/usr/bin/env bash
# Build script for Digital Ward Sifaris & Citizen Verification Portal
set -euo pipefail

echo "=== Building Ward Sifaris Portal for Nepal Local Governments ==="
mkdir -p dist

# Copy core web assets
cp index.html dist/
cp styles.css dist/
cp app.js dist/

# Also create a 404 fallback for GitHub Pages SPA routing
cp index.html dist/404.html

echo "Artifacts copied to dist/ directory successfully."
echo "Application is ready for live hosting or GitHub Pages deployment."
