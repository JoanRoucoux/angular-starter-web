import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { tap } from 'rxjs';

import { Logger } from '@core/logger/logger';

import { environment } from '@environments/environment';

const TRACE_ID_HEADER = 'X-Trace-Id';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(Logger);

  return next(req).pipe(
    tap({
      error: (error: unknown) => {
        if (!req.url.startsWith(environment.apiBaseUrl)) {
          return;
        }
        if (error instanceof HttpErrorResponse) {
          const traceId = error.headers.get(TRACE_ID_HEADER);
          const trace = traceId ? ` (trace ${traceId})` : '';
          logger.error('HttpInterceptor', `API error on ${req.method} ${req.url}${trace}`, error);
        }
      },
    }),
  );
};
