import { User } from '../src/app/core/api/angularStarterWebAPI.schemas';
import { expect, test } from './fixtures/test';

test('displays users fetched from the API', async ({ page, usersPage }) => {
  // Mock the API, replace with your real backend or a dedicated mock server.
  const users: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
  ];
  await page.route('**/api/users', (route) => route.fulfill({ json: users }));

  await usersPage.goto();

  await expect(usersPage.userItems).toHaveText(['John Doe']);
});

test('displays an error state when the API is unavailable', async ({ page, usersPage }) => {
  await page.route('**/api/users', (route) => route.fulfill({ status: 500, json: {} }));

  await usersPage.goto();

  await expect(usersPage.errorState).toBeVisible();
  await expect(usersPage.retryButton).toBeVisible();
});
