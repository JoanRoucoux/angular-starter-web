import { test as base, expect } from '@playwright/test';

const POLICY_VIOLATION = /Content Security Policy|TrustedHTML|TrustedScript|Trusted Type/i;

export const test = base.extend<{ policyViolations: void }>({
  policyViolations: [
    async ({ page }, use) => {
      const violations: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error' && POLICY_VIOLATION.test(message.text())) {
          violations.push(message.text());
        }
      });
      page.on('pageerror', (error) => {
        if (POLICY_VIOLATION.test(error.message)) {
          violations.push(error.message);
        }
      });
      await use();
      expect(violations).toEqual([]);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
