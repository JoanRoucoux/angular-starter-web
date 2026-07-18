import { ModuleWithProviders } from '@angular/core';

import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';

/**
 * Provides Transloco in unit tests. Translation pipes and directives resolve
 * to the translation key itself unless translations are provided via `langs`.
 */
export function getTranslocoTestingModule(
  options: TranslocoTestingOptions = {},
): ModuleWithProviders<TranslocoTestingModule> {
  return TranslocoTestingModule.forRoot({
    langs: { en: {}, fr: {} },
    translocoConfig: {
      availableLangs: ['en', 'fr'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
