import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { render, screen } from '@testing-library/angular';

import { App } from './app';

describe('App', () => {
  it('should render the main content area', async () => {
    await render(App, {
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
