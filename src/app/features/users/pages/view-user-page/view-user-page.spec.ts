import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';
import { render, screen } from '@testing-library/angular';

import type { User } from '@core/api/angularStarterWebAPI.schemas';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { ViewUserPage } from './view-user-page';

describe('ViewUserPage', () => {
  let httpTesting: HttpTestingController;

  const renderPage = async (): Promise<void> => {
    await render(ViewUserPage, {
      inputs: { userId: 1 },
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

  it('should display the user once loaded', async () => {
    await renderPage();

    const user: User = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' };
    httpTesting.expectOne('/api/users/1').flush(user);

    expect(await screen.findByRole('heading', { name: 'John Doe' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'john.doe@example.com' })).toBeInTheDocument();
  });

  it('should display an error message when loading fails', async () => {
    await renderPage();

    httpTesting.expectOne('/api/users/1').flush(null, { status: 500, statusText: 'Internal Server Error' });

    // Translations resolve to their key in tests.
    expect(await screen.findByText('users.detail.error')).toBeInTheDocument();
  });
});
