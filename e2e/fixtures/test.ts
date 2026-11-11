import { UsersPage } from '../pages/users-page';
import { test as base } from './base-test';

type Fixtures = {
  usersPage: UsersPage;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.route('**/api/session', (route) => route.fulfill({ json: { permissions: ['users:read'] } }));
    await use(page);
  },
  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
});

export { expect } from './base-test';
