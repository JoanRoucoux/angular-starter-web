import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

import type { User } from '@core/api/angularStarterWebAPI.schemas';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { CreateUserPage } from './create-user-page';

describe('CreateUserPage', () => {
  let httpTesting: HttpTestingController;

  const renderPage = async (): Promise<void> => {
    await render(CreateUserPage, {
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

  const fillForm = async (email: string): Promise<void> => {
    // Translations resolve to their key in tests.
    await userEvent.type(screen.getByLabelText('users.create.firstName'), 'John');
    await userEvent.type(screen.getByLabelText('users.create.lastName'), 'Doe');
    await userEvent.type(screen.getByLabelText('users.create.email'), email);
  };

  const submitButton = (): HTMLElement => screen.getByRole('button', { name: 'users.create.submit' });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should show validation errors and send no request when submitted empty', async () => {
    await renderPage();

    await userEvent.click(submitButton());

    expect(await screen.findAllByText('users.create.errors.required')).toHaveLength(3);
    httpTesting.expectNone('/api/users');
  });

  it('should show the format error message for a malformed email', async () => {
    await renderPage();

    await fillForm('not-an-email');
    await userEvent.click(submitButton());

    // The message distinguishes format from required errors.
    expect(await screen.findByText('users.create.errors.email')).toBeInTheDocument();
    httpTesting.expectNone('/api/users');
  });

  it('should create the user and navigate to its detail page', async () => {
    await renderPage();

    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    await fillForm('john.doe@example.com');
    await userEvent.click(submitButton());

    // submit() reaches the HTTP call through microtasks, wait for the request to be issued.
    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });

    const user: User = { id: 42, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'pending' };
    request.flush(user, { status: 201, statusText: 'Created' });

    await vi.waitFor(() => expect(navigateSpy).toHaveBeenCalledWith(['/users', 42]));
  });

  it('should display an error message when the creation fails', async () => {
    await renderPage();

    await fillForm('john.doe@example.com');
    await userEvent.click(submitButton());

    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users'));
    request.flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(submitButton()).toBeEnabled();
  });
});
