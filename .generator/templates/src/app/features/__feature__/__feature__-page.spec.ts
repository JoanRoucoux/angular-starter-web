import { provideZonelessChangeDetection } from '@angular/core';

import { provideTranslocoScope } from '@jsverse/transloco';
import { render, screen } from '@testing-library/angular';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { {{featurePascal}}Page } from './{{feature}}-page';

describe('{{featurePascal}}Page', () => {
  it('should render the page heading', async () => {
    await render({{featurePascal}}Page, {
      imports: [getTranslocoTestingModule()],
      providers: [
        provideZonelessChangeDetection(),
        provideTranslocoScope('{{feature}}'),
      ],
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('{{featureCamel}}.title');
  });
});
