import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { AppTitleStrategy } from '@core/i18n/title-strategy';
import { provideTranslocoGlobal } from '@core/i18n/transloco.provider';
import { errorHandlerInterceptor } from '@core/interceptors/error-handler-interceptor';
import { provideTheme } from '@core/theme/theme.provider';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideTranslocoGlobal(),
    provideTheme(),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
