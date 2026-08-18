import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';
import { render, screen } from '@testing-library/angular';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { HomePage } from './home-page';

describe('HomePage', () => {
  it('should link to the users feature', async () => {
    await render(HomePage, {
      imports: [getTranslocoTestingModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        // Provided by the route in the app, the test must mirror it.
        provideTranslocoScope('home'),
      ],
    });

    // Translations resolve to their key in tests.
    expect(screen.getByRole('link', { name: 'home.usersCta' })).toHaveAttribute('href', '/users');
  });
});
