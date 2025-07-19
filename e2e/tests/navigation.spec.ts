import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between different pages', async ({ page }) => {
    await page.goto('/');
    
    // Start at homepage
    await expect(page.locator('h1')).toContainText('Track every F1 race you\'ve watched.');
    
    // Navigate to races page
    await page.locator('text=Races').click();
    await expect(page).toHaveURL('/races');
    await expect(page.locator('h1')).toContainText('Browse F1 Races');
    
    // Navigate to a season from races page
    await page.locator('.season-poster-card').filter({ hasText: '2024' }).click();
    await expect(page).toHaveURL(/\/seasons\/2024/);
    
    // Navigate back to home using header (F1 Letterboxd logo)
    await page.locator('text=F1 Letterboxd').click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Track every F1 race you\'ve watched.');
    
    // Test navigation to reviews page
    await page.locator('text=Reviews').click();
    await expect(page).toHaveURL('/reviews');
    await expect(page.locator('h1')).toContainText('Your Reviews');
  });

  test('should handle direct navigation to season page', async ({ page }) => {
    await page.goto('/seasons/2023');
    
    // Should load season page directly
    await expect(page.locator('h1')).toContainText('2023 Formula 1 Season');
    
    // Should have navigation available (breadcrumb link)
    await expect(page.locator('text=Home')).toBeVisible();
  });

  test('should navigate to races page and show decade grouping', async ({ page }) => {
    await page.goto('/races');
    
    // Should show races page with decade organization
    await expect(page.locator('h1')).toContainText('Browse F1 Races');
    
    // Should have decade sections
    await expect(page.locator('.decade-title')).toHaveCount.greaterThanOrEqual(1);
    
    // Should have 2020s section with recent seasons
    await expect(page.locator('.decade-title')).toContainText('2020s');
    
    // Should have season cards with champion information
    await expect(page.locator('.season-poster-card')).toHaveCount.greaterThanOrEqual(1);
    
    // Check for champion emojis
    await expect(page.locator('text=🏆')).toHaveCount.greaterThanOrEqual(1);
    await expect(page.locator('text=🏎️')).toHaveCount.greaterThanOrEqual(1);
  });
});