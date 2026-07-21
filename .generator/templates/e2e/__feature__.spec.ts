import { expect, test } from '@playwright/test';

test('displays the {{feature}} page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('{{title}}');
});
