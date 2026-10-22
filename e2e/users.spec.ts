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

test("opens a user's detail from the list", async ({ page, usersPage }) => {
  const john: User = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' };
  await page.route('**/api/users', (route) => route.fulfill({ json: [john] }));
  await page.route('**/api/users/1', (route) => route.fulfill({ json: john }));

  await usersPage.goto();
  await usersPage.userItems.first().click();

  await expect(page).toHaveURL('/users/1');
  await expect(usersPage.heading).toHaveText('John Doe');
});

test('shows a created user back on the list', async ({ page, usersPage }) => {
  const users: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
  ];
  await page.route('**/api/users', (route) => {
    if (route.request().method() === 'POST') {
      const created: User = { id: 2, ...route.request().postDataJSON(), status: 'pending' };
      users.push(created);
      return route.fulfill({ status: 201, json: created });
    }
    return route.fulfill({ json: users });
  });
  await page.route('**/api/users/2', (route) => route.fulfill({ json: users[1] }));

  await usersPage.goto();
  await expect(usersPage.userItems).toHaveText(['John Doe']);
  await usersPage.createLink.click();
  await expect(usersPage.heading).toHaveText('New user');
  await usersPage.firstNameInput.fill('Alice');
  await usersPage.lastNameInput.fill('Smith');
  await usersPage.emailInput.fill('alice.smith@example.com');
  await usersPage.submitButton.click();

  await expect(page).toHaveURL('/users/2');
  await usersPage.backToListLink.click();

  await expect(usersPage.userItems).toHaveText(['John Doe', 'Alice Smith']);
});
