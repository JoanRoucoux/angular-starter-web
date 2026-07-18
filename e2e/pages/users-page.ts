import { Locator, Page } from '@playwright/test';

/**
 * Page object for the users feature (browse + error states).
 * Centralizes selectors and navigation so tests read as behavior, not DOM queries.
 */
export class UsersPage {
  readonly #page: Page;
  readonly list: Locator;
  readonly userItems: Locator;
  readonly emptyState: Locator;
  readonly loadingState: Locator;
  readonly errorState: Locator;
  readonly retryButton: Locator;

  constructor(page: Page) {
    this.#page = page;
    this.list = page.getByTestId('users-list');
    this.userItems = page.getByTestId('user-item');
    this.emptyState = page.getByTestId('users-empty');
    this.loadingState = page.getByTestId('users-loading');
    this.errorState = page.getByTestId('users-error');
    this.retryButton = page.getByTestId('users-retry');
  }

  async goto(): Promise<void> {
    await this.#page.goto('/users');
  }
}
