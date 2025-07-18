import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage with seasons', async ({ page }) => {
    await page.goto('/');
    
    // Check for main heading
    await expect(page.locator('h1')).toContainText('Track every F1 race you\'ve watched.');
    
    // Check for hero subtitle
    await expect(page.locator('.hero-subtitle')).toContainText('Save those you want to see. Tell your friends what\'s good.');
    
    // Check that seasons are loaded (no data-testid needed, just check they exist)
    await expect(page.locator('.season-card')).toHaveCount(4);
    
    // Check for specific seasons
    await expect(page.locator('text=2024')).toBeVisible();
    await expect(page.locator('text=2023')).toBeVisible();
    await expect(page.locator('text=2022')).toBeVisible();
    await expect(page.locator('text=2021')).toBeVisible();
  });

  test('should navigate to season page when season is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click on 2024 season
    await page.locator('text=2024').click();
    
    // Should navigate to season page (note: /seasons/ not /season/)
    await expect(page).toHaveURL(/\/seasons\/2024/);
    
    // Should show season page content
    await expect(page.locator('h1')).toContainText('2024 Formula 1 Season');
  });
});