import { inject } from '@angular/core';
import { type NavigationError, RedirectCommand, Router } from '@angular/router';

import { Logger } from '@core/logger/logger';

import { NAVIGATION_ERROR_PATH } from './navigation-error-path';

export const navigationErrorHandler = (error: NavigationError): RedirectCommand | void => {
  const logger = inject(Logger);
  const router = inject(Router);

  logger.error('NavigationErrorHandler', error);

  const errorPagePath = `/${NAVIGATION_ERROR_PATH}`;
  if (error.url.split(/[?#]/)[0] === errorPagePath) {
    return;
  }

  return new RedirectCommand(router.parseUrl(errorPagePath), { browserUrl: error.url });
};
