import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the dashboard homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check for main heading
    await expect(page.locator('h1')).toContainText('Track every F1 race you\'ve watched.');
    
    // Check for hero subtitle
    await expect(page.locator('.hero-subtitle')).toContainText('Save those you want to see. Tell your friends what\'s good.');
    
    // Check for dashboard sections
    await expect(page.locator('.section-title')).toContainText('Recent Races');
    await expect(page.locator('.section-title')).toContainText('Recent Reviews from Friends');
    await expect(page.locator('.section-title')).toContainText('Popular Races');
    
    // Check that race cards are loaded
    await expect(page.locator('.race-card-gallery')).toHaveCount.greaterThanOrEqual(1);
    
    // Check for view all links
    await expect(page.locator('text=View all races this season')).toBeVisible();
    await expect(page.locator('text=View all reviews')).toBeVisible();
  });

  test('should navigate to races page and show seasons', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to races page
    await page.locator('text=Races').click();
    await expect(page).toHaveURL('/races');
    
    // Should show races page with seasons grouped by decades
    await expect(page.locator('h1')).toContainText('Browse F1 Races');
    await expect(page.locator('.decade-title')).toHaveCount.greaterThanOrEqual(1);
    
    // Check for season poster cards
    await expect(page.locator('.season-poster-card')).toHaveCount.greaterThanOrEqual(1);
    
    // Check for specific recent seasons (should be in 2020s decade)
    await expect(page.locator('text=2024')).toBeVisible();
    await expect(page.locator('text=2025')).toBeVisible();
  });

  test('should navigate to season page when season is clicked', async ({ page }) => {
    await page.goto('/races');
    
    // Click on 2024 season
    await page.locator('.season-poster-card').filter({ hasText: '2024' }).click();
    
    // Should navigate to season page
    await expect(page).toHaveURL(/\/seasons\/2024/);
    
    // Should show season page content
    await expect(page.locator('h1')).toContainText('2024 Formula 1 Season');
  });
});