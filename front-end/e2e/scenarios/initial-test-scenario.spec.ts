import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

// This file is here to test the playwright integration.
test.describe('Initial test display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(testUrl);
    // Let's try with something you don't have in your page.
    const pageTitle = await page.getByRole('heading', { name: 'PolyQuiz' });
    // It should not be visible as you don't have it in your page.
    expect(pageTitle).toBeVisible();
    // Test case pass? Means the playwright setup is done! Congrats!
  });
});
