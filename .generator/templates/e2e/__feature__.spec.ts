import { expect, test } from './fixtures/base-test';

import { expectNoAccessibilityViolations } from './fixtures/accessibility';

test('displays the {{feature}} page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('{{titleJs}}');
  await expectNoAccessibilityViolations(page);
});
