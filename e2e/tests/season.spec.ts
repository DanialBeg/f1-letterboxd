import { test, expect } from '@playwright/test';

test.describe('Season Page', () => {
  test('should display races for 2024 season', async ({ page }) => {
    await page.goto('/season/2024');
    
    // Check season title
    await expect(page.locator('h1')).toContainText('2024');
    
    // Check that races are loaded
    await expect(page.locator('[data-testid="race-item"]')).toHaveCount(24);
    
    // Check for first race
    await expect(page.locator('text=Bahrain Grand Prix')).toBeVisible();
    
    // Check for last race
    await expect(page.locator('text=Abu Dhabi Grand Prix')).toBeVisible();
  });

  test('should navigate to race page when race is clicked', async ({ page }) => {
    await page.goto('/season/2024');
    
    // Click on first race
    await page.locator('text=Bahrain Grand Prix').click();
    
    // Should navigate to race page
    await expect(page).toHaveURL(/\/race\/\d+/);
    
    // Should show race details
    await expect(page.locator('h1')).toContainText('Bahrain Grand Prix');
  });

  test('should display race information correctly', async ({ page }) => {
    await page.goto('/season/2024');
    
    // Check that race cards have required information
    const firstRace = page.locator('[data-testid="race-item"]').first();
    
    // Should have race name
    await expect(firstRace.locator('h3')).toBeVisible();
    
    // Should have location
    await expect(firstRace.locator('[data-testid="race-location"]')).toBeVisible();
    
    // Should have date
    await expect(firstRace.locator('[data-testid="race-date"]')).toBeVisible();
    
    // Should have round number
    await expect(firstRace.locator('[data-testid="race-round"]')).toBeVisible();
  });
});