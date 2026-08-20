import { Locator, Page } from '@playwright/test';

/**
 * Page object for the users feature (browse, search, delete, error states).
 * Centralizes selectors and navigation so tests read as behavior, not DOM queries.
 */
export class UsersPage {
  readonly #page: Page;
  readonly list: Locator;
  readonly searchInput: Locator;
  readonly userItems: Locator;
  readonly emptyState: Locator;
  readonly loadingState: Locator;
  readonly errorState: Locator;
  readonly retryButton: Locator;
  readonly deleteButtons: Locator;
  readonly deleteDialog: Locator;
  readonly confirmDeleteButton: Locator;
  readonly cancelDeleteButton: Locator;
  readonly statusMessage: Locator;

  constructor(page: Page) {
    this.#page = page;
    this.list = page.getByTestId('user-list');
    this.searchInput = page.getByTestId('user-list-search');
    this.userItems = page.getByTestId('user-item');
    this.emptyState = page.getByTestId('user-list-empty');
    this.loadingState = page.getByTestId('user-list-loading');
    this.errorState = page.getByTestId('user-list-error');
    this.retryButton = page.getByTestId('user-list-retry');
    this.deleteButtons = page.getByTestId('user-item-delete');
    this.deleteDialog = page.getByTestId('user-delete-dialog');
    this.confirmDeleteButton = page.getByTestId('user-delete-confirm');
    this.cancelDeleteButton = page.getByTestId('user-delete-cancel');
    this.statusMessage = page.getByTestId('user-list-status');
  }

  async goto(): Promise<void> {
    await this.#page.goto('/users');
  }
}
