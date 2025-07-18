import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage with seasons', async ({ page }) => {
    await page.goto('/');
    
    // Check for main heading
    await expect(page.locator('h1')).toContainText('F1 Letterboxd');
    
    // Check that seasons are loaded
    await expect(page.locator('[data-testid="season-item"]')).toHaveCount(4);
    
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
    
    // Should navigate to season page
    await expect(page).toHaveURL(/\/season\/2024/);
    
    // Should show season page content
    await expect(page.locator('h1')).toContainText('2024');
  });
});