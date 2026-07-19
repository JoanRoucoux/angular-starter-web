import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

import type { User } from '@core/api/angularStarterWebAPI.schemas';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { BrowseUsersPage } from './browse-users-page';

describe('BrowseUsersPage', () => {
  let httpTesting: HttpTestingController;

  const renderPage = async (): Promise<void> => {
    await render(BrowseUsersPage, {
      imports: [getTranslocoTestingModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        // Provided by the route in the app, the test must mirror it.
        provideTranslocoScope('users'),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
  };

  afterEach(() => {
    httpTesting.verify();
  });

  it('should display users once loaded', async () => {
    await renderPage();

    const users: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
      { id: 2, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', status: 'pending' },
    ];
    httpTesting.expectOne('/api/users').flush(users);

    expect(await screen.findAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'John Doe' })).toBeInTheDocument();
  });

  it('should display an error state with a retry button when loading fails', async () => {
    await renderPage();

    httpTesting.expectOne('/api/users').flush(null, { status: 500, statusText: 'Internal Server Error' });

    // Translations resolve to their key in tests.
    expect(await screen.findByText('users.browse.error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'users.browse.retry' })).toBeInTheDocument();
  });

  it('should reload the users when the retry button is clicked', async () => {
    await renderPage();

    httpTesting.expectOne('/api/users').flush(null, { status: 500, statusText: 'Internal Server Error' });
    await userEvent.click(await screen.findByRole('button', { name: 'users.browse.retry' }));

    // reload() re-subscribes through the effect scheduler, wait for the new request to be issued.
    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users'));
    request.flush([{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' }]);

    expect(await screen.findAllByRole('listitem')).toHaveLength(1);
  });

  it('should display an empty state when there are no users', async () => {
    await renderPage();

    httpTesting.expectOne('/api/users').flush([]);

    expect(await screen.findByText('users.browse.empty')).toBeInTheDocument();
  });
});
