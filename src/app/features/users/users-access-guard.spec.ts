import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  type GuardResult,
  type PartialMatchRouteSnapshot,
  RedirectCommand,
  type Route,
  provideRouter,
} from '@angular/router';

import { type Observable, firstValueFrom } from 'rxjs';

import { usersAccessGuard } from './users-access-guard';

describe('usersAccessGuard', () => {
  let httpTesting: HttpTestingController;

  const runGuard = (): Promise<GuardResult> =>
    firstValueFrom(
      TestBed.runInInjectionContext(() =>
        usersAccessGuard({} as Route, [], {} as PartialMatchRouteSnapshot),
      ) as Observable<GuardResult>,
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should let the feature match when the session grants the permission', async () => {
    const result = runGuard();

    httpTesting.expectOne('/api/session').flush({ permissions: ['users:read'] });

    expect(await result).toBe(true);
  });

  it('should redirect home when the session does not grant the permission', async () => {
    const result = runGuard();

    httpTesting.expectOne('/api/session').flush({ permissions: [] });

    const redirect = await result;
    expect(redirect).toBeInstanceOf(RedirectCommand);
    expect((redirect as RedirectCommand).redirectTo.toString()).toBe('/');
  });

  it('should redirect home when the session cannot be loaded', async () => {
    const result = runGuard();

    httpTesting.expectOne('/api/session').flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(await result).toBeInstanceOf(RedirectCommand);
  });
});
