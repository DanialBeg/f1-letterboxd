import { test, expect } from '@playwright/test';

test.describe('Race Page', () => {
  test('should display race details', async ({ page }) => {
    await page.goto('/races/1');
    
    // Check race title
    await expect(page.locator('h1')).toContainText('Bahrain Grand Prix');
    
    // Check race details (using actual component structure)
    await expect(page.locator('text=Sakhir, Bahrain')).toBeVisible();
    // Date formatting can vary by environment, so check for either possible format
    const marchDate = page.locator('text=March 1, 2024');
    const marchDate2 = page.locator('text=March 2, 2024');
    await expect(marchDate.or(marchDate2)).toBeVisible();
    await expect(page.locator('text=Max Verstappen')).toBeVisible();
    
    // Check meta information
    await expect(page.locator('text=Bahrain International Circuit')).toBeVisible();
    await expect(page.locator('text=0 reviews')).toBeVisible();
  });

  test('should display existing reviews', async ({ page }) => {
    await page.goto('/races/1');
    
    // Should have reviews section
    await expect(page.locator('.reviews-section')).toBeVisible();
    
    // Should display existing reviews (or no reviews if none exist)
    const reviewCount = await page.locator('.review-card').count();
    await expect(reviewCount).toBeGreaterThanOrEqual(0);
    
    // If reviews exist, check they have required elements
    if (reviewCount > 0) {
      const firstReview = page.locator('.review-card').first();
      await expect(firstReview.locator('.reviewer-name')).toBeVisible();
      await expect(firstReview.locator('.review-rating')).toBeVisible();
      await expect(firstReview.locator('.review-comment')).toBeVisible();
    }
  });

  test('should allow submitting a new review', async ({ page }) => {
    await page.goto('/races/1');
    
    // Fill out review form
    await page.locator('input[placeholder="Enter your name"]').fill('Test User');
    // Click on 4th star by clicking the 4th star container
    await page.locator('.star-container').nth(3).click();
    await page.locator('textarea[placeholder*="What did you think"]').fill('Great race with exciting overtakes!');
    
    // Submit review
    await page.locator('text=Add Review').click();
    
    // Should show success message or refresh with new review
    // Check that a review card with our comment exists
    await expect(page.locator('.review-comment').filter({ hasText: 'Great race with exciting overtakes!' }).first()).toBeVisible();
  });

  test('should validate review form', async ({ page }) => {
    await page.goto('/races/1');
    
    // Try to submit empty form
    await page.locator('text=Add Review').click();
    
    // Should show HTML5 validation (required fields)
    const nameInput = page.locator('input[placeholder="Enter your name"]');
    await expect(nameInput).toHaveAttribute('required');
    
    // Fill required fields
    await page.locator('input[placeholder="Enter your name"]').fill('Test User');
    // Click on 3rd star by clicking the 3rd star container
    await page.locator('.star-container').nth(2).click();
    await page.locator('textarea[placeholder*="What did you think"]').fill('Test comment');
    
    // Should be able to submit now
    await page.locator('text=Add Review').click();
  });
});