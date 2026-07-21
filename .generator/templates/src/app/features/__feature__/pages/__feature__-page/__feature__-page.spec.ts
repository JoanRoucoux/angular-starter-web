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
        // Provided by the route in the app, the test must mirror it.
        provideTranslocoScope('{{feature}}'),
      ],
    });

    // Translations resolve to their key in tests; scoped keys use the camel-cased scope name.
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('{{featureCamel}}.title');
  });
});
