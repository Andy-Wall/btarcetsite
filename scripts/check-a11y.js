#!/usr/bin/env node

/**
 * Run automated accessibility checks using axe-core on all pages
 * 
 * Usage: node scripts/check-a11y.js
 * 
 * Environment variables:
 *   BASE_URL - Base URL for the site (default: http://localhost:3000)
 *              Example: BASE_URL=http://localhost:3001 node scripts/check-a11y.js
 */

const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const HTML_TRUNCATE_LENGTH = 100;

// Pages to test
const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/sessions', name: 'Sessions' },
  { path: '/sessions/2026-01-api-design-best-practices', name: 'Session Detail' },
  { path: '/about', name: 'About' },
  { path: '/faq', name: 'FAQ' }
];

async function runAccessibilityChecks() {
  console.log('Starting automated accessibility checks...\n');
  console.log(`Base URL: ${BASE_URL}\n`);
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let hasViolations = false;
  const results = [];

  for (const pageInfo of PAGES) {
    const url = `${BASE_URL}${pageInfo.path}`;
    console.log(`\nChecking: ${pageInfo.name} (${pageInfo.path})`);
    console.log('='.repeat(60));
    
    try {
      // Navigate to the page
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Run accessibility checks using AxeBuilder with WCAG 2.1 Level AA tags
      const axeResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      const violations = axeResults.violations;
      
      if (violations.length === 0) {
        console.log(`✓ ${pageInfo.name} - No accessibility violations found`);
        results.push({ page: pageInfo.name, path: pageInfo.path, passed: true, violations: [] });
      } else {
        console.log(`✗ ${pageInfo.name} - Found ${violations.length} accessibility violation(s)`);
        hasViolations = true;
        
        // Print violation details
        violations.forEach((violation, index) => {
          console.log(`\n  ${index + 1}. ${violation.id} (${violation.impact})`);
          console.log(`     ${violation.description}`);
          console.log(`     Help: ${violation.helpUrl}`);
          console.log(`     Affected elements: ${violation.nodes.length}`);
          
          // Print first few affected elements
          violation.nodes.slice(0, 3).forEach((node, nodeIndex) => {
            console.log(`       - ${node.html.substring(0, HTML_TRUNCATE_LENGTH)}${node.html.length > HTML_TRUNCATE_LENGTH ? '...' : ''}`);
          });
        });
        
        results.push({ 
          page: pageInfo.name, 
          path: pageInfo.path, 
          passed: false, 
          violations: violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length
          }))
        });
      }
    } catch (error) {
      console.log(`✗ ${pageInfo.name} - Error running checks: ${error.message}`);
      hasViolations = true;
      results.push({ 
        page: pageInfo.name, 
        path: pageInfo.path, 
        passed: false, 
        error: error.message 
      });
    }
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Accessibility Check Summary');
  console.log('='.repeat(60));

  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.length - passedCount;

  console.log(`Total pages checked: ${results.length}`);
  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failedCount}`);

  if (hasViolations) {
    console.log('\n✗ Accessibility checks failed - violations found');
    console.log('\nReview the violations above and fix them to meet WCAG 2.1 Level AA standards.');
    process.exit(1);
  } else {
    console.log('\n✓ All pages passed accessibility checks');
    process.exit(0);
  }
}

// Run the checks
runAccessibilityChecks().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
