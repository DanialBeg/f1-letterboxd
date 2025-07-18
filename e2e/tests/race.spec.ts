import { test, expect } from '@playwright/test';

test.describe('Race Page', () => {
  test('should display race details', async ({ page }) => {
    await page.goto('/race/1');
    
    // Check race title
    await expect(page.locator('h1')).toContainText('Bahrain Grand Prix');
    
    // Check race details
    await expect(page.locator('[data-testid="race-location"]')).toContainText('Bahrain');
    await expect(page.locator('[data-testid="race-date"]')).toBeVisible();
    await expect(page.locator('[data-testid="race-winner"]')).toBeVisible();
    
    // Check average rating display
    await expect(page.locator('[data-testid="average-rating"]')).toBeVisible();
    
    // Check review count
    await expect(page.locator('[data-testid="review-count"]')).toBeVisible();
  });

  test('should display existing reviews', async ({ page }) => {
    await page.goto('/race/1');
    
    // Should have reviews section
    await expect(page.locator('[data-testid="reviews-section"]')).toBeVisible();
    
    // Should display existing reviews if any
    const reviews = page.locator('[data-testid="review-item"]');
    const reviewCount = await reviews.count();
    
    if (reviewCount > 0) {
      // Check first review has required elements
      const firstReview = reviews.first();
      await expect(firstReview.locator('[data-testid="review-rating"]')).toBeVisible();
      await expect(firstReview.locator('[data-testid="review-user"]')).toBeVisible();
      await expect(firstReview.locator('[data-testid="review-comment"]')).toBeVisible();
      await expect(firstReview.locator('[data-testid="review-date"]')).toBeVisible();
    }
  });

  test('should allow submitting a new review', async ({ page }) => {
    await page.goto('/race/1');
    
    // Fill out review form
    await page.locator('[data-testid="review-username"]').fill('Test User');
    await page.locator('[data-testid="review-rating"]').selectOption('4.5');
    await page.locator('[data-testid="review-comment"]').fill('Great race with exciting overtakes!');
    
    // Submit review
    await page.locator('[data-testid="submit-review"]').click();
    
    // Should show success message or refresh with new review
    await expect(page.locator('text=Test User')).toBeVisible();
    await expect(page.locator('text=Great race with exciting overtakes!')).toBeVisible();
  });

  test('should validate review form', async ({ page }) => {
    await page.goto('/race/1');
    
    // Try to submit empty form
    await page.locator('[data-testid="submit-review"]').click();
    
    // Should show validation errors
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    
    // Fill required fields
    await page.locator('[data-testid="review-username"]').fill('Test User');
    await page.locator('[data-testid="review-rating"]').selectOption('3.0');
    
    // Should be able to submit now
    await page.locator('[data-testid="submit-review"]').click();
    
    // Should not show error
    await expect(page.locator('[data-testid="error-message"]')).not.toBeVisible();
  });
});