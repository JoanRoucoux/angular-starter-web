import type { ModuleWithProviders } from '@angular/core';

import { TranslocoTestingModule, type TranslocoTestingOptions } from '@jsverse/transloco';

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
