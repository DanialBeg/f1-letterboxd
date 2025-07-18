import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between different pages', async ({ page }) => {
    await page.goto('/');
    
    // Start at homepage
    await expect(page.locator('h1')).toContainText('Track every F1 race you\'ve watched.');
    
    // Navigate to a season
    await page.locator('text=2024').click();
    await expect(page).toHaveURL(/\/seasons\/2024/);
    
    // Navigate back to home using header (F1 Letterboxd logo)
    await page.locator('text=F1 Letterboxd').click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Track every F1 race you\'ve watched.');
  });

  test('should handle direct navigation to season page', async ({ page }) => {
    await page.goto('/seasons/2023');
    
    // Should load season page directly
    await expect(page.locator('h1')).toContainText('2023 Formula 1 Season');
    
    // Should have navigation available (breadcrumb link)
    await expect(page.locator('text=Home')).toBeVisible();
  });
});