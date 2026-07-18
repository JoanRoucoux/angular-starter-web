import { test as base } from '@playwright/test';

import { UsersPage } from '../pages/users-page';

interface Fixtures {
  usersPage: UsersPage;
}

export const test = base.extend<Fixtures>({
  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
});

export { expect } from '@playwright/test';
