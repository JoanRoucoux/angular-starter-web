import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { provideTranslocoScope } from '@jsverse/transloco';
import { fireEvent, render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

import type { User } from '@core/api-client/angularStarterWebAPI.schemas';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { UserDeleteDialog } from './user-delete-dialog';

describe('UserDeleteDialog', () => {
  let httpTesting: HttpTestingController;

  const user: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'active',
  };

  const deleted = vi.fn();
  const dismissed = vi.fn();

  const renderDialog = async (): Promise<void> => {
    await render(UserDeleteDialog, {
      imports: [getTranslocoTestingModule()],
      // UserDeleteStore is provided by the component itself, the test does not wire it.
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslocoScope('users'),
      ],
      inputs: { user },
      on: { deleted, dismissed },
    });
    httpTesting = TestBed.inject(HttpTestingController);
  };

  afterEach(() => {
    httpTesting.verify();
    vi.clearAllMocks();
  });

  it('should open as a modal dialog labelled and described for screen readers', async () => {
    await renderDialog();

    const dialog = await screen.findByRole('dialog', { name: 'users.delete.title' });
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveAccessibleDescription('users.delete.description');
  });

  it('should emit dismissed without calling the API when cancelling', async () => {
    await renderDialog();

    await userEvent.click(await screen.findByRole('button', { name: 'users.delete.cancel' }));

    expect(dismissed).toHaveBeenCalledTimes(1);
    expect(deleted).not.toHaveBeenCalled();
  });

  it('should emit dismissed when the dialog is cancelled with the Escape key', async () => {
    await renderDialog();

    // jsdom implements neither the Esc handling of <dialog> nor the cancel event it fires, dispatch it by hand.
    fireEvent(await screen.findByRole('dialog'), new Event('cancel'));

    await vi.waitFor(() => expect(dismissed).toHaveBeenCalledTimes(1));
    expect(deleted).not.toHaveBeenCalled();
  });

  it('should delete the user and emit deleted when confirming', async () => {
    await renderDialog();

    await userEvent.click(await screen.findByRole('button', { name: 'users.delete.submit' }));
    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users/1'));
    request.flush(null, { status: 204, statusText: 'No Content' });

    await vi.waitFor(() => expect(deleted).toHaveBeenCalledTimes(1));
    expect(dismissed).not.toHaveBeenCalled();
  });

  it('should stay open and announce the error when the deletion fails', async () => {
    await renderDialog();

    await userEvent.click(await screen.findByRole('button', { name: 'users.delete.submit' }));
    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users/1'));
    request.flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(await screen.findByRole('alert')).toHaveTextContent('users.delete.error');
    expect(screen.getByRole('dialog')).toHaveAttribute('open');
    expect(deleted).not.toHaveBeenCalled();
  });
});
