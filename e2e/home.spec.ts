import { expectNoAccessibilityViolations } from './fixtures/accessibility';
import { expect, test } from './fixtures/base-test';

test('displays the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('angular-starter-web');
  await expectNoAccessibilityViolations(page);
});
