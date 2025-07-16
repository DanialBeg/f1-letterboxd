import { test, expect } from '@playwright/test';

test.describe('Race Detail Page', () => {
  test('should load race details correctly', async ({ page }) => {
    await page.goto('/races/1');
    
    // Check race title
    await expect(page.locator('.race-detail-title')).toContainText('Bahrain Grand Prix');
    
    // Check breadcrumb navigation
    await expect(page.locator('.breadcrumb')).toContainText('Home');
    await expect(page.locator('.breadcrumb')).toContainText('2024 Season');
    await expect(page.locator('.breadcrumb')).toContainText('Bahrain Grand Prix');
    
    // Check race metadata
    await expect(page.locator('.meta-label').filter({ hasText: 'Circuit' })).toBeVisible();
    await expect(page.locator('.meta-label').filter({ hasText: 'Winner' })).toBeVisible();
    await expect(page.locator('.meta-value').filter({ hasText: 'Max Verstappen' })).toBeVisible();
  });

  test('should display race poster and information', async ({ page }) => {
    await page.goto('/races/1');
    
    // Check race poster is visible
    await expect(page.locator('.race-detail-poster')).toBeVisible();
    
    // Check race round number
    await expect(page.locator('.race-round')).toContainText('Round 1');
    
    // Check location and date
    await expect(page.locator('p').filter({ hasText: 'Sakhir, Bahrain' })).toBeVisible();
  });

  test('should show constructor and podium information when available', async ({ page }) => {
    await page.goto('/races/1');
    
    // Check for winning constructor (Red Bull Racing for race 1)
    await expect(page.locator('.meta-label').filter({ hasText: 'Winning Constructor' })).toBeVisible();
    await expect(page.locator('.meta-value').filter({ hasText: 'Red Bull Racing' })).toBeVisible();
    
    // Check for podium places
    await expect(page.locator('.meta-label').filter({ hasText: 'Remaining Podium Places' })).toBeVisible();
    await expect(page.locator('.meta-value').filter({ hasText: '2nd: Sergio Perez' })).toBeVisible();
    await expect(page.locator('.meta-value').filter({ hasText: '3rd: Carlos Sainz' })).toBeVisible();
  });

  test('should display and allow submitting reviews', async ({ page }) => {
    await page.goto('/races/1');
    
    // Check review form is visible
    await expect(page.locator('.review-form')).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Your Name' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Rating' })).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Review' })).toBeVisible();
    
    // Fill out review form
    await page.fill('input[placeholder="Enter your name"]', 'Test User');
    await page.click('.star-container .star-right'); // Click first full star
    await page.fill('textarea[placeholder*="What did you think"]', 'Great race with exciting wheel-to-wheel action!');
    
    // Submit review
    await page.click('.submit-btn');
    
    // Check that review appears in the list
    await expect(page.locator('.review-card').filter({ hasText: 'Test User' })).toBeVisible();
    await expect(page.locator('.review-comment').filter({ hasText: 'Great race with exciting wheel-to-wheel action!' })).toBeVisible();
  });

  test('should display existing reviews with profile pictures', async ({ page }) => {
    await page.goto('/races/1');
    
    // Wait for any existing reviews to load
    await page.waitForTimeout(1000);
    
    // If reviews exist, check they have proper structure
    const reviewCards = page.locator('.review-card');
    const reviewCount = await reviewCards.count();
    
    if (reviewCount > 0) {
      // Check first review has proper structure
      const firstReview = reviewCards.first();
      await expect(firstReview.locator('.reviewer-avatar')).toBeVisible();
      await expect(firstReview.locator('.reviewer-name')).toBeVisible();
      await expect(firstReview.locator('.review-rating')).toBeVisible();
      await expect(firstReview.locator('.review-comment')).toBeVisible();
    }
  });

  test('should handle half-star ratings', async ({ page }) => {
    await page.goto('/races/1');
    
    // Click on half-star (left side of second star)
    await page.click('.star-container:nth-child(2) .star-left');
    
    // Fill out rest of form
    await page.fill('input[placeholder="Enter your name"]', 'Half Star User');
    await page.fill('textarea[placeholder*="What did you think"]', 'Decent race, could have been better.');
    
    // Submit review
    await page.click('.submit-btn');
    
    // The review should be submitted successfully
    await expect(page.locator('.review-card').filter({ hasText: 'Half Star User' })).toBeVisible();
  });
});