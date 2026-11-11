import { provideZonelessChangeDetection } from '@angular/core';

import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { NavigationErrorPage } from './navigation-error-page';
import { PageReload } from './page-reload';

describe('NavigationErrorPage', () => {
  const reload = vi.fn();

  const renderPage = (): Promise<unknown> =>
    render(NavigationErrorPage, {
      imports: [getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection(), { provide: PageReload, useValue: { reload } }],
    });

  beforeEach(() => reload.mockClear());

  it('should display the navigation error message', async () => {
    await renderPage();

    expect(screen.getByRole('heading', { name: 'navigationError.title' })).toBeInTheDocument();
    expect(screen.getByText('navigationError.description')).toBeInTheDocument();
  });

  it('should reload the page when the button is clicked', async () => {
    await renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'navigationError.reload' }));

    expect(reload).toHaveBeenCalledOnce();
  });
});
