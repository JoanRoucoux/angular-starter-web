import type { ModuleWithProviders } from '@angular/core';

import { TranslocoTestingModule, type TranslocoTestingOptions } from '@jsverse/transloco';

/**
 * Provides Transloco in unit tests. Translation pipes and directives resolve
 * to the translation key itself unless translations are provided via `langs`.
 * Feature scopes are registered empty so specs can mirror the route-level
 * `provideTranslocoScope(...)` wiring without loading real translation files.
 */
export const getTranslocoTestingModule = (
  options: TranslocoTestingOptions = {},
): ModuleWithProviders<TranslocoTestingModule> => {
  return TranslocoTestingModule.forRoot({
    langs: { en: {}, fr: {}, 'home/en': {}, 'home/fr': {}, 'users/en': {}, 'users/fr': {} },
    translocoConfig: {
      availableLangs: ['en', 'fr'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
};
