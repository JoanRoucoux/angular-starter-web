import { EnvironmentProviders, isDevMode, makeEnvironmentProviders } from '@angular/core';

import { provideTransloco } from '@jsverse/transloco';
import { cookiesStorage, provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';

import { TranslocoHttpLoader } from '@core/i18n/transloco-loader';

export function provideTranslocoGlobal(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoPersistLang({
      storage: {
        useValue: cookiesStorage(),
      },
    }),
  ]);
}
