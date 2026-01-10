#!/usr/bin/env node

/**
 * Post-build script to fix absolute paths for GitHub Pages deployment
 * 
 * Next.js static export has issues with basePath, so we manually rewrite
 * all absolute paths to include the /btarcetsite prefix.
 */

const fs = require('fs');
const path = require('path');

const BASE_PATH = '/btarcetsite';
const OUT_DIR = path.join(__dirname, '..', 'out');

function fixPathsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix href and src attributes with absolute paths
  const patterns = [
    { regex: /href="\/_next\//g, replacement: `href="${BASE_PATH}/_next/` },
    { regex: /src="\/_next\//g, replacement: `src="${BASE_PATH}/_next/` },
    { regex: /href="\/([^"]*?)"/g, replacement: (match, p1) => {
      // Don't replace already prefixed paths, external URLs, or anchors
      if (p1.startsWith('http') || p1.startsWith('#') || p1.startsWith(BASE_PATH.slice(1))) {
        return match;
      }
      modified = true;
      return `href="${BASE_PATH}/${p1}"`;
    }},
  ];

  patterns.forEach(({ regex, replacement }) => {
    if (content.match(regex)) {
      content = content.replace(regex, replacement);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed paths in ${path.relative(OUT_DIR, filePath)}`);
  }
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      fixPathsInFile(fullPath);
    }
  }
}

console.log(`Fixing paths in ${OUT_DIR} for GitHub Pages deployment...`);
processDirectory(OUT_DIR);
console.log('✓ All paths fixed!');
