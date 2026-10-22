import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import type { User } from '@core/api-client/angularStarterWebAPI.schemas';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { UserDetailPage } from './user-detail-page';

describe('UserDetailPage', () => {
  let httpTesting: HttpTestingController;

  const renderPage = async (): Promise<void> => {
    await render(UserDetailPage, {
      imports: [getTranslocoTestingModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslocoScope('users'),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: '1' })) } },
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

    expect(await screen.findByText('users.detail.error')).toBeInTheDocument();
  });
});
