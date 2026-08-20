import { test as base } from '@playwright/test';

import { UsersPage } from '../pages/users-page';

type Fixtures = {
  usersPage: UsersPage;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    // Features sit behind an access guard: grant the permissions by default, a test can re-route to revoke them.
    await page.route('**/api/session', (route) => route.fulfill({ json: { permissions: ['users:read'] } }));
    await use(page);
  },
  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
});

export { expect } from '@playwright/test';
