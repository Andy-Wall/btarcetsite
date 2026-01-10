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

  // Fix _next paths first
  if (content.includes('/_next/')) {
    content = content.replace(/href="\/_next\//g, `href="${BASE_PATH}/_next/`);
    content = content.replace(/src="\/_next\//g, `src="${BASE_PATH}/_next/`);
    modified = true;
  }

  // Fix navigation links (href="/sessions", href="/about", etc.)
  content = content.replace(/href="\/([^"#][^"]*)"/g, (match, p1) => {
    // Skip if already has base path, is external URL, or is just a fragment
    if (p1.startsWith('btarcetsite') || p1.startsWith('http://') || p1.startsWith('https://')) {
      return match;
    }
    modified = true;
    return `href="${BASE_PATH}/${p1}"`;
  });

  // Fix empty href="/" to href="/btarcetsite/"
  content = content.replace(/href="\/"/g, `href="${BASE_PATH}/"`);

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
