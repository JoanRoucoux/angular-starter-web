import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { render, screen } from '@testing-library/angular';

import { AppTitleStrategy } from '@core/i18n/title-strategy';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { App } from './app';

describe('App', () => {
  const renderApp = (): Promise<unknown> =>
    render(App, {
      imports: [getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });

  it('should render the main content area', async () => {
    await renderApp();

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should announce the current page in a live region', async () => {
    await renderApp();

    TestBed.inject(AppTitleStrategy).pageTitle.set('Users');

    expect(await screen.findByTestId('route-announcer')).toHaveTextContent('Users');
  });
});
