import { Locator, Page } from '@playwright/test';

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
  readonly createLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly heading: Locator;
  readonly backToListLink: Locator;

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
    this.createLink = page.getByTestId('user-list-create');
    this.firstNameInput = page.getByTestId('user-create-first-name');
    this.lastNameInput = page.getByTestId('user-create-last-name');
    this.emailInput = page.getByTestId('user-create-email');
    this.submitButton = page.getByTestId('user-create-submit');
    this.heading = page.getByRole('heading', { level: 1 });
    this.backToListLink = page.getByRole('link', { name: 'Back to the list' });
  }

  async goto(): Promise<void> {
    await this.#page.goto('/users');
  }
}
