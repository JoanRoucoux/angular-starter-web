import AxeBuilder from '@axe-core/playwright';
import { type Page, expect } from '@playwright/test';

export const expectNoAccessibilityViolations = async (page: Page): Promise<void> => {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(violations.map(({ id, nodes }) => `${id} on ${nodes.map(({ target }) => target).join(', ')}`)).toEqual([]);
};
