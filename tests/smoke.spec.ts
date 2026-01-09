import { test, expect } from '@playwright/test';

/**
 * Smoke tests for the BTARCET site
 * Testing: Home next session, Sessions partition/sort, and detail navigation
 */

test.describe('Home Page', () => {
  test('displays next upcoming session', async ({ page }) => {
    await page.goto('/');
    
    // Check page title is present
    await expect(page.locator('h1')).toContainText('BTARCET Architecture Team Site');
    
    // Check for next session section
    const nextSessionHeading = page.locator('h2').filter({ hasText: 'Next Upcoming Session' });
    const noSessionsMessage = page.getByText('No upcoming sessions scheduled at this time');
    
    // Either next session should be displayed OR no sessions message
    const hasNextSession = await nextSessionHeading.isVisible().catch(() => false);
    const hasNoSessions = await noSessionsMessage.isVisible().catch(() => false);
    
    expect(hasNextSession || hasNoSessions).toBeTruthy();
    
    // If there's a next session, verify it has essential elements
    if (hasNextSession) {
      // Check that a session card is displayed
      const sessionCard = page.locator('a[href^="/sessions/"]').first();
      await expect(sessionCard).toBeVisible();
      
      // Verify session card has a title
      await expect(sessionCard.locator('h3')).toBeVisible();
      
      // Verify session card has date/time text (displayed in a paragraph)
      await expect(sessionCard.locator('p').first()).toBeVisible();
    }
  });
});

test.describe('Sessions Page', () => {
  test('partitions sessions into upcoming and history', async ({ page }) => {
    await page.goto('/sessions');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Sessions');
    
    // Check for upcoming section
    const upcomingHeading = page.locator('h2#upcoming-heading');
    await expect(upcomingHeading).toBeVisible();
    await expect(upcomingHeading).toHaveText('Upcoming');
    
    // Check for history section
    const historyHeading = page.locator('h2#history-heading');
    await expect(historyHeading).toBeVisible();
    await expect(historyHeading).toHaveText('History');
    
    // Verify sections exist (they may be empty, but structure should be there)
    const upcomingSection = page.locator('section[aria-labelledby="upcoming-heading"]');
    await expect(upcomingSection).toBeVisible();
    
    const historySection = page.locator('section[aria-labelledby="history-heading"]');
    await expect(historySection).toBeVisible();
  });
  
  test('sorts upcoming sessions in ascending order (earliest first)', async ({ page }) => {
    await page.goto('/sessions');
    
    // Get all upcoming session cards
    const upcomingSection = page.locator('section[aria-labelledby="upcoming-heading"]');
    const sessionCards = upcomingSection.locator('a[href^="/sessions/"]');
    
    const count = await sessionCards.count();
    
    // If there are multiple upcoming sessions, verify they're sorted by checking the href order
    // The session IDs contain dates in the format YYYY-MM-*
    if (count > 1) {
      const hrefs: string[] = [];
      
      for (let i = 0; i < count; i++) {
        const href = await sessionCards.nth(i).getAttribute('href');
        if (href) {
          hrefs.push(href);
        }
      }
      
      // Extract dates from session IDs and verify they're in ascending order
      const dates = hrefs.map(href => {
        // Extract YYYY-MM from the session ID path like /sessions/2026-01-api-design
        const match = href.match(/\/sessions\/(\d{4}-\d{2})/);
        return match ? match[1] : '';
      });
      
      // Verify dates are in ascending order (lexicographic comparison works for YYYY-MM format)
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i] <= dates[i + 1]).toBeTruthy();
      }
    }
  });
  
  test('sorts history sessions in descending order (most recent first)', async ({ page }) => {
    await page.goto('/sessions');
    
    // Get all history session cards
    const historySection = page.locator('section[aria-labelledby="history-heading"]');
    const sessionCards = historySection.locator('a[href^="/sessions/"]');
    
    const count = await sessionCards.count();
    
    // If there are multiple history sessions, verify they're sorted by checking the href order
    if (count > 1) {
      const hrefs: string[] = [];
      
      for (let i = 0; i < count; i++) {
        const href = await sessionCards.nth(i).getAttribute('href');
        if (href) {
          hrefs.push(href);
        }
      }
      
      // Extract dates from session IDs and verify they're in descending order
      const dates = hrefs.map(href => {
        // Extract YYYY-MM from the session ID path like /sessions/2025-12-cloud-edge
        const match = href.match(/\/sessions\/(\d{4}-\d{2})/);
        return match ? match[1] : '';
      });
      
      // Verify dates are in descending order (lexicographic comparison works for YYYY-MM format)
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i] >= dates[i + 1]).toBeTruthy();
      }
    }
  });
});

test.describe('Session Detail Navigation', () => {
  test('navigates from home page session card to detail page', async ({ page }) => {
    await page.goto('/');
    
    // Find and click the first session card if it exists
    const sessionCard = page.locator('a[href^="/sessions/"]').first();
    const isVisible = await sessionCard.isVisible().catch(() => false);
    
    if (isVisible) {
      const sessionTitle = await sessionCard.locator('h3').textContent();
      const href = await sessionCard.getAttribute('href');
      
      await sessionCard.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Verify we're on the detail page
      expect(page.url()).toContain(href || '');
      
      // Verify the detail page shows the session title
      const detailTitle = page.locator('h1');
      await expect(detailTitle).toBeVisible();
      await expect(detailTitle).toContainText(sessionTitle || '');
    }
  });
  
  test('navigates from sessions page to detail page', async ({ page }) => {
    await page.goto('/sessions');
    
    // Find and click the first session card
    const sessionCard = page.locator('a[href^="/sessions/"]').first();
    const isVisible = await sessionCard.isVisible().catch(() => false);
    
    if (isVisible) {
      const sessionTitle = await sessionCard.locator('h3').textContent();
      const href = await sessionCard.getAttribute('href');
      
      await sessionCard.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Verify we're on the detail page
      expect(page.url()).toContain(href || '');
      
      // Verify the detail page shows the session title
      const detailTitle = page.locator('h1');
      await expect(detailTitle).toBeVisible();
      await expect(detailTitle).toContainText(sessionTitle || '');
      
      // Verify detail page has time element (detail pages do use <time> elements)
      await expect(page.locator('time')).toBeVisible();
    }
  });
  
  test('session detail page displays complete information', async ({ page }) => {
    // Navigate to a known session detail page
    await page.goto('/sessions/2026-01-api-design-best-practices');
    
    // Verify page loaded successfully
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('RESTful API Design Best Practices');
    
    // Verify essential information is displayed
    await expect(page.locator('time')).toBeVisible();
    
    // Check for description section
    const descriptionHeading = page.locator('h2').filter({ hasText: 'Description' });
    await expect(descriptionHeading).toBeVisible();
    
    // Check for speakers section
    const speakersHeading = page.locator('h2').filter({ hasText: /Speaker/ });
    await expect(speakersHeading).toBeVisible();
  });
});
