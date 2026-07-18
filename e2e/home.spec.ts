import { expect, test } from '@playwright/test';

test('displays the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('angular-starter-web');
});
