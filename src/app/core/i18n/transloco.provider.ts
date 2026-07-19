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
    // Wait for the active language to load before the app renders, otherwise the first paint
    // (including the page title) briefly shows missing-translation warnings.
    provideAppInitializer(() => {
      const translocoService = inject(TranslocoService);
      return firstValueFrom(translocoService.load(translocoService.getActiveLang()));
    }),
  ]);
}
