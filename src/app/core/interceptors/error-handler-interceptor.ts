import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { tap } from 'rxjs';

import { LoggerService } from '@core/logger/logger';

import { environment } from '@environments/environment';

/**
 * Catches error responses from the API in a single place.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);

  return next(req).pipe(
    tap({
      error: (error: unknown) => {
        // Only handle errors coming from our API, not third-party resources.
        if (!req.url.startsWith(environment.apiBaseUrl)) {
          return;
        }
        if (error instanceof HttpErrorResponse) {
          // TODO: display the error with the toaster of your component library.
          logger.error('HttpInterceptor', `API error on ${req.method} ${req.url}`, error);
        }
      },
    }),
  );
};
