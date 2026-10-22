import { type Routes } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';

import { preloadScope } from '@core/i18n/preload-scope';

import { HomePage } from './home-page';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'pageTitle.home',
    // Load the feature translations (public/i18n/home/) alongside the feature.
    providers: [provideTranslocoScope('home')],
    resolve: { translations: preloadScope('home') },
  },
];
