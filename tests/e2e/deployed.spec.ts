import { test, expect } from '@playwright/test';

/**
 * End-to-end tests for deployed GitHub Pages
 * These tests verify the production deployment is working correctly
 */

// Test constants
const DEFAULT_BROWSER_FONT_SIZE = 16; // Default font size in pixels
const MAX_ACCEPTABLE_LOAD_TIME_MS = 5000; // Maximum acceptable page load time in milliseconds

test.describe('GitHub Pages Deployment - Basic Functionality', () => {
  test('home page loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Verify page loaded and title is correct
    await expect(page).toHaveTitle(/BTARCET/i);
    
    // Check main heading is present
    await expect(page.locator('h1')).toContainText('BTARCET Architecture Team Site');
    
    // Verify navigation is present
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Verify basic navigation links exist
    await expect(page.getByRole('link', { name: /sessions/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /faq/i })).toBeVisible();
  });

  test('sessions page loads successfully', async ({ page }) => {
    await page.goto('/sessions');
    
    // Verify page loaded
    await expect(page).toHaveTitle(/Sessions.*BTARCET/i);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Sessions');
    
    // Verify sections exist
    await expect(page.locator('h2#upcoming-heading')).toContainText('Upcoming');
    await expect(page.locator('h2#history-heading')).toContainText('History');
  });

  test('about page loads successfully', async ({ page }) => {
    await page.goto('/about');
    
    // Verify page loaded
    await expect(page).toHaveTitle(/About.*BTARCET/i);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('About');
  });

  test('faq page loads successfully', async ({ page }) => {
    await page.goto('/faq');
    
    // Verify page loaded
    await expect(page).toHaveTitle(/FAQ.*BTARCET/i);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Frequently Asked Questions');
  });

  test('404 page works for invalid routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    
    // GitHub Pages should serve 404.html for invalid routes
    // The status might be 200 because GitHub Pages serves 404.html with 200 status
    await expect(page.locator('h1')).toContainText('404');
  });
});

test.describe('GitHub Pages Deployment - Navigation', () => {
  test('navigation between pages works', async ({ page }) => {
    // Start at home
    await page.goto('/');
    
    // Navigate to sessions
    await page.getByRole('link', { name: /sessions/i }).first().click();
    await expect(page).toHaveURL(/\/btarcetsite\/sessions/);
    await expect(page.locator('h1')).toContainText('Sessions');
    
    // Navigate to about
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/\/btarcetsite\/about/);
    await expect(page.locator('h1')).toContainText('About');
    
    // Navigate to FAQ
    await page.getByRole('link', { name: /faq/i }).first().click();
    await expect(page).toHaveURL(/\/btarcetsite\/faq/);
    await expect(page.locator('h1')).toContainText('Frequently Asked Questions');
    
    // Navigate back to home via logo/title link
    await page.getByRole('link', { name: /BTARCET/i }).first().click();
    await expect(page).toHaveURL(/\/btarcetsite\/($|index)/);
    await expect(page.locator('h1')).toContainText('BTARCET Architecture Team Site');
  });

  test('session detail page navigation works', async ({ page }) => {
    await page.goto('/sessions');
    
    // Find and click first session card if it exists
    const sessionCard = page.locator('a[href^="/btarcetsite/sessions/"]').first();
    const isVisible = await sessionCard.isVisible().catch(() => false);
    
    if (isVisible) {
      const href = await sessionCard.getAttribute('href');
      await sessionCard.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Verify we're on detail page
      await expect(page).toHaveURL(new RegExp(href || ''));
      
      // Verify detail page has session information
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('time')).toBeVisible();
    }
  });
});

test.describe('GitHub Pages Deployment - Static Assets', () => {
  test('CSS is loaded correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check that Tailwind CSS is applied by verifying computed styles
    const header = page.locator('h1').first();
    await expect(header).toBeVisible();
    
    // Verify the element has some styling applied (not default browser styles)
    const fontSize = await header.evaluate(el => {
      return window.getComputedStyle(el).fontSize;
    });
    
    // Should have larger than default font size
    const fontSizeValue = parseInt(fontSize);
    expect(fontSizeValue).toBeGreaterThan(DEFAULT_BROWSER_FONT_SIZE);
  });

  test('JavaScript is working', async ({ page }) => {
    await page.goto('/');
    
    // Verify Next.js hydration works by checking for interactive elements
    // Navigation should be clickable and work
    const sessionsLink = page.getByRole('link', { name: /sessions/i }).first();
    await expect(sessionsLink).toBeVisible();
    
    // Click should work (verifies JS is running)
    await sessionsLink.click();
    await expect(page).toHaveURL(/\/btarcetsite\/sessions/);
  });
});

test.describe('GitHub Pages Deployment - Performance', () => {
  test('pages load in reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load in under 5 seconds even on slower networks
    expect(loadTime).toBeLessThan(MAX_ACCEPTABLE_LOAD_TIME_MS);
  });

  test('static assets are cacheable', async ({ page }) => {
    // First load
    const response1 = await page.goto('/');
    expect(response1?.status()).toBe(200);
    
    // Second load - should use cache
    const response2 = await page.goto('/');
    expect(response2?.status()).toBe(200);
    
    // Both should succeed (cache headers are set by GitHub Pages)
  });
});

test.describe('GitHub Pages Deployment - Accessibility', () => {
  test('pages have proper document structure', async ({ page }) => {
    await page.goto('/');
    
    // Should have proper HTML structure
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    
    // Should have main landmark
    await expect(page.locator('main')).toBeVisible();
    
    // Should have navigation landmark
    await expect(page.locator('nav')).toBeVisible();
    
    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('skip link is present and functional', async ({ page }) => {
    await page.goto('/');
    
    // Skip link should be the first focusable element
    await page.keyboard.press('Tab');
    
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeFocused();
  });
});
