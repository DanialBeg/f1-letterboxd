import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between different pages', async ({ page }) => {
    await page.goto('/');
    
    // Start at homepage
    await expect(page.locator('h1')).toContainText('F1 Letterboxd');
    
    // Navigate to a season
    await page.locator('text=2024').click();
    await expect(page).toHaveURL(/\/season\/2024/);
    
    // Navigate back to home using header
    await page.locator('[data-testid="home-link"]').click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('F1 Letterboxd');
  });

  test('should handle direct navigation to season page', async ({ page }) => {
    await page.goto('/season/2023');
    
    // Should load season page directly
    await expect(page.locator('h1')).toContainText('2023');
    
    // Should have navigation available
    await expect(page.locator('[data-testid="home-link"]')).toBeVisible();
  });
});