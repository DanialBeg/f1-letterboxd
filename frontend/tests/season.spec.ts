import { test, expect } from '@playwright/test';

test.describe('Season Page', () => {
  test('should load 2024 season page with races', async ({ page }) => {
    await page.goto('/seasons/2024');
    
    // Check page title
    await expect(page.locator('.page-title')).toContainText('2024 Season');
    
    // Check breadcrumb navigation
    await expect(page.locator('.breadcrumb')).toContainText('Home');
    await expect(page.locator('.breadcrumb')).toContainText('2024 Season');
    
    // Wait for races to load
    await page.waitForSelector('.races-grid');
    
    // Check that races are displayed
    const raceCards = page.locator('.race-card');
    await expect(raceCards).toHaveCount(24); // Should have 24 races in 2024
  });

  test('should display race information correctly', async ({ page }) => {
    await page.goto('/seasons/2024');
    
    // Wait for races to load
    await page.waitForSelector('.races-grid');
    
    // Check first race (Bahrain GP)
    const firstRace = page.locator('.race-card').first();
    await expect(firstRace.locator('.race-name')).toContainText('Bahrain Grand Prix');
    await expect(firstRace.locator('.race-location')).toContainText('Sakhir, Bahrain');
    
    // Check that race has poster background
    const racePoster = firstRace.locator('.race-poster');
    await expect(racePoster).toBeVisible();
  });

  test('should navigate to race details when clicking on a race', async ({ page }) => {
    await page.goto('/seasons/2024');
    
    // Wait for races to load
    await page.waitForSelector('.races-grid');
    
    // Click on first race
    await page.locator('.race-card').first().click();
    
    // Check URL changed to race page
    await expect(page).toHaveURL(/\/races\/\d+/);
    
    // Check race detail page loaded
    await expect(page.locator('.race-detail-title')).toContainText('Bahrain Grand Prix');
  });

  test('should navigate back to home from breadcrumb', async ({ page }) => {
    await page.goto('/seasons/2024');
    
    // Click home in breadcrumb
    await page.locator('.breadcrumb a').filter({ hasText: 'Home' }).click();
    
    // Check we're back on homepage
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Track every F1 race you\'ve watched');
  });
});