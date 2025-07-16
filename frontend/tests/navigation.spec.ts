import { test, expect } from '@playwright/test';

test.describe('Navigation and UI', () => {
  test('should have F1 red theme colors', async ({ page }) => {
    await page.goto('/');
    
    // Check logo color (F1 red)
    const logo = page.locator('.logo');
    await expect(logo).toHaveCSS('color', 'rgb(255, 30, 0)');
    
    // Check that seasons have red hover effects
    await page.hover('.season-card:first-child');
    await expect(page.locator('.season-card:first-child')).toHaveCSS('border-color', 'rgb(255, 30, 0)');
  });

  test('should navigate through the app correctly', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveURL('/');
    
    // Go to 2024 season
    await page.click('.season-card:has-text("2024")');
    await expect(page).toHaveURL('/seasons/2024');
    
    // Go to first race
    await page.click('.race-card:first-child');
    await expect(page).toHaveURL(/\/races\/\d+/);
    
    // Use breadcrumb to go back to season
    await page.click('.breadcrumb a:has-text("2024 Season")');
    await expect(page).toHaveURL('/seasons/2024');
    
    // Use breadcrumb to go back to home
    await page.click('.breadcrumb a:has-text("Home")');
    await expect(page).toHaveURL('/');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that hero title is still visible and readable
    await expect(page.locator('.hero-title')).toBeVisible();
    
    // Check that seasons grid adapts to mobile
    await expect(page.locator('.seasons-grid')).toBeVisible();
    
    // Check that season cards are properly sized
    const seasonCard = page.locator('.season-card').first();
    await expect(seasonCard).toBeVisible();
  });

  test('should display F1 favicon', async ({ page }) => {
    await page.goto('/');
    
    // Check that the favicon link exists
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', '/f1-logo.svg');
  });

  test('should show loading states gracefully', async ({ page }) => {
    // Intercept API calls to add delay
    await page.route('**/api/seasons', async route => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
    
    await page.goto('/');
    
    // Should eventually load the content
    await expect(page.locator('.seasons-grid')).toBeVisible({ timeout: 5000 });
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept API and return error
    await page.route('**/api/seasons', route => route.abort('failed'));
    
    await page.goto('/');
    
    // Should still show some content (fallback data)
    await expect(page.locator('.hero-title')).toBeVisible();
    
    // Should have fallback seasons
    await expect(page.locator('.season-card')).toHaveCount(4);
  });
});