import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for end-to-end tests on deployed GitHub Pages
 * This config runs tests against the production deployment
 * See https://playwright.dev/docs/test-configuration
 */

// Timeout constants for deployed site (accounting for network latency)
const NAVIGATION_TIMEOUT_MS = 30000; // 30 seconds for navigation
const ACTION_TIMEOUT_MS = 10000; // 10 seconds for actions
const TEST_TIMEOUT_MS = 60000; // 60 seconds per test

export default defineConfig({
  testDir: './tests/e2e',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI to handle intermittent network issues
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: 'html',
  
  // Shared settings for all the projects below
  use: {
    // Base URL for the deployed GitHub Pages site
    // Can be overridden with DEPLOYED_URL environment variable
    baseURL: process.env.DEPLOYED_URL || 'https://silver-adventure-qm6273j.pages.github.io',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Set a reasonable timeout for deployed site (network latency)
    navigationTimeout: NAVIGATION_TIMEOUT_MS,
    actionTimeout: ACTION_TIMEOUT_MS,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Test timeout for network requests to deployed site
  timeout: TEST_TIMEOUT_MS,
});
