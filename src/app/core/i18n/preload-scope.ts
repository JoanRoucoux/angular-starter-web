import { inject } from '@angular/core';
import { type ResolveFn } from '@angular/router';

import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

import { Logger } from '@core/logger/logger';

export const preloadScope =
  (scope: string): ResolveFn<boolean> =>
  async () => {
    const translocoService = inject(TranslocoService);
    const logger = inject(Logger);
    const path = `${scope}/${translocoService.getActiveLang()}`;

    try {
      await firstValueFrom(translocoService.load(path), { defaultValue: undefined });
    } catch (error) {
      logger.error('preloadScope', `Failed to load translation scope "${path}"`, error);
    }

    return true;
  };
