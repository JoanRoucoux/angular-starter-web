import {
  type EnvironmentProviders,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';

import { TranslocoService, provideTransloco } from '@jsverse/transloco';
import { cookiesStorage, provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { firstValueFrom } from 'rxjs';

import { AVAILABLE_LANGS, getInitialLang } from '@core/i18n/initial-lang';
import { TranslocoHttpLoader } from '@core/i18n/transloco-loader';

export const provideTranslocoGlobal = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideTransloco({
      config: {
        availableLangs: [...AVAILABLE_LANGS],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoPersistLang({
      getLangFn: getInitialLang,
      storage: {
        useValue: cookiesStorage(),
      },
    }),
    // Wait for the active language to load before the app renders, otherwise the first paint
    // (including the page title) briefly shows missing-translation warnings.
    provideAppInitializer(() => {
      const translocoService = inject(TranslocoService);
      return firstValueFrom(translocoService.load(translocoService.getActiveLang()));
    }),
  ]);
};
