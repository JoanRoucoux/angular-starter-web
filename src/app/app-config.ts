import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { TitleStrategy, provideRouter, withInMemoryScrolling, withNavigationErrorHandler } from '@angular/router';

import { AppTitleStrategy } from '@core/i18n/title-strategy';
import { provideTranslocoGlobal } from '@core/i18n/transloco-provider';
import { errorHandlerInterceptor } from '@core/interceptors/error-handler-interceptor';
import { navigationErrorHandler } from '@core/navigation-error-page/navigation-error-handler';

import { routes } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withNavigationErrorHandler(navigationErrorHandler),
    ),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideTranslocoGlobal(),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
