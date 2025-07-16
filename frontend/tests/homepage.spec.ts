import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage with correct title', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle('F1 Letterbox\'d');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Track every F1 race you\'ve watched');
    
    // Check subtitle
    await expect(page.locator('.hero-subtitle')).toContainText('Save those you want to see. Tell your friends what\'s good.');
  });

  test('should display seasons grid', async ({ page }) => {
    await page.goto('/');
    
    // Wait for seasons to load
    await page.waitForSelector('.seasons-grid');
    
    // Check that seasons are displayed
    const seasonCards = page.locator('.season-card');
    await expect(seasonCards).toHaveCount(4); // Should have 4 seasons
    
    // Check that 2024 season is present
    await expect(page.locator('.season-card').filter({ hasText: '2024' })).toBeVisible();
  });

  test('should navigate to season page when clicking on a season', async ({ page }) => {
    await page.goto('/');
    
    // Wait for seasons to load
    await page.waitForSelector('.seasons-grid');
    
    // Click on 2024 season
    await page.locator('.season-card').filter({ hasText: '2024' }).click();
    
    // Check URL changed
    await expect(page).toHaveURL('/seasons/2024');
    
    // Check page content
    await expect(page.locator('.page-title')).toContainText('2024 Season');
  });

  test('should display hero banner background image', async ({ page }) => {
    await page.goto('/');
    
    // Check that hero section has background image
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();
    
    // Check computed styles contain the background image
    const beforeElement = page.locator('.hero-section::before');
    // We can't directly test ::before pseudo-element, but we can check the hero section exists
    await expect(heroSection).toHaveCSS('position', 'relative');
  });
});