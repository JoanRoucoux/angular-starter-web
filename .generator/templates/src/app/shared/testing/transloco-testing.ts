import type { ModuleWithProviders } from '@angular/core';

import { TranslocoTestingModule, type TranslocoTestingOptions } from '@jsverse/transloco';

export const getTranslocoTestingModule = (
  options: TranslocoTestingOptions = {},
): ModuleWithProviders<TranslocoTestingModule> => {
  return TranslocoTestingModule.forRoot({
    langs: { en: {}, fr: {}, '{{feature}}/en': {}, '{{feature}}/fr': {} },
    translocoConfig: {
      availableLangs: ['en', 'fr'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
};
