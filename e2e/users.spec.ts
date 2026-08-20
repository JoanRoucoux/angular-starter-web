import { User } from '../src/app/core/api-client/angularStarterWebAPI.schemas';
import { expectNoAccessibilityViolations } from './fixtures/accessibility';
import { expect, test } from './fixtures/test';

test('displays users fetched from the API', async ({ page, usersPage }) => {
  // Mock the API, replace with your real backend or a dedicated mock server.
  const users: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
  ];
  await page.route('**/api/users', (route) => route.fulfill({ json: users }));

  await usersPage.goto();

  await expect(usersPage.userItems).toHaveText(['John Doe']);
  await expectNoAccessibilityViolations(page);
});

test('filters the users with the search field', async ({ page, usersPage }) => {
  const users: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
    { id: 2, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', status: 'pending' },
  ];
  await page.route('**/api/users', (route) => route.fulfill({ json: users }));

  await usersPage.goto();
  await usersPage.searchInput.fill('alice');

  await expect(usersPage.userItems).toHaveText(['Alice Smith']);
});

test('displays an error state when the API is unavailable', async ({ page, usersPage }) => {
  await page.route('**/api/users', (route) => route.fulfill({ status: 500, json: {} }));

  await usersPage.goto();

  await expect(usersPage.errorState).toBeVisible();
  await expect(usersPage.retryButton).toBeVisible();
});

test('deletes a user through the confirmation dialog', async ({ page, usersPage }) => {
  let users: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
    { id: 2, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', status: 'pending' },
  ];
  await page.route('**/api/users', (route) => route.fulfill({ json: users }));
  await page.route('**/api/users/1', (route) => {
    users = users.filter((user) => user.id !== 1);
    return route.fulfill({ status: 204 });
  });

  await usersPage.goto();
  await usersPage.deleteButtons.first().click();

  await expect(usersPage.deleteDialog).toBeVisible();
  await expectNoAccessibilityViolations(page);

  await usersPage.confirmDeleteButton.click();

  await expect(usersPage.userItems).toHaveText(['Alice Smith']);
  await expect(usersPage.deleteDialog).toBeHidden();
  await expect(usersPage.statusMessage).toHaveText('John Doe has been deleted.');
});

test('closes the confirmation dialog with the Escape key without deleting', async ({ page, usersPage }) => {
  const users: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
  ];
  await page.route('**/api/users', (route) => route.fulfill({ json: users }));

  await usersPage.goto();
  await usersPage.deleteButtons.first().click();

  await expect(usersPage.deleteDialog).toBeVisible();
  await expect(usersPage.cancelDeleteButton).toBeFocused();

  await page.keyboard.press('Escape');

  await expect(usersPage.deleteDialog).toBeHidden();
  await expect(usersPage.userItems).toHaveText(['John Doe']);
});

test('redirects home when the session does not grant access to the feature', async ({ page, usersPage }) => {
  await page.route('**/api/session', (route) => route.fulfill({ json: { permissions: [] } }));

  await usersPage.goto();

  await expect(page).toHaveURL('/');
});
