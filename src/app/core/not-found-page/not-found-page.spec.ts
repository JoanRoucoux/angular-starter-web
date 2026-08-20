import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { render, screen } from '@testing-library/angular';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  const renderPage = (): Promise<unknown> =>
    render(NotFoundPage, {
      imports: [getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });

  it('should display the not found message', async () => {
    await renderPage();

    // Translations resolve to their key in tests.
    expect(screen.getByRole('heading', { name: 'notFound.title' })).toBeInTheDocument();
    expect(screen.getByText('notFound.description')).toBeInTheDocument();
  });

  it('should link back to the home page', async () => {
    await renderPage();

    expect(screen.getByRole('link', { name: 'notFound.home' })).toHaveAttribute('href', '/');
  });
});
