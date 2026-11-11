import { Location } from '@angular/common';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter, withNavigationErrorHandler } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { Logger } from '@core/logger/logger';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { navigationErrorHandler } from './navigation-error-handler';
import { NavigationErrorPage } from './navigation-error-page';
import { NAVIGATION_ERROR_PATH } from './navigation-error-path';

@Component({ template: '' })
class BrokenPage {}

describe('navigationErrorHandler', () => {
  const error = vi.fn();

  const configure = (errorPageRoute: object): void => {
    TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule()],
      providers: [
        provideZonelessChangeDetection(),
        { provide: Logger, useValue: { error } },
        provideRouter(
          [
            {
              path: 'broken',
              loadChildren: () => Promise.reject(new Error('chunk 404')),
            },
            { path: 'broken-page', component: BrokenPage },
            errorPageRoute,
          ],
          withNavigationErrorHandler(navigationErrorHandler),
        ),
      ],
    });
  };

  beforeEach(() => error.mockClear());

  it('should render the error page and keep the requested url', async () => {
    configure({ path: NAVIGATION_ERROR_PATH, component: NavigationErrorPage });
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/broken?a=1');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('navigationError.title');
    expect(TestBed.inject(Location).path()).toBe('/broken?a=1');
    expect(error).toHaveBeenCalledWith('NavigationErrorHandler', expect.objectContaining({ url: '/broken?a=1' }));
  });

  it('should not redirect when the error page itself fails', async () => {
    configure({
      path: NAVIGATION_ERROR_PATH,
      loadChildren: () => Promise.reject(new Error('chunk 404')),
    });
    const router = TestBed.inject(Router);

    await expect(router.navigateByUrl(`/${NAVIGATION_ERROR_PATH}?a=1`)).rejects.toThrow('chunk 404');

    expect(error).toHaveBeenCalledOnce();
    expect(router.url).toBe('/');
  });
});
