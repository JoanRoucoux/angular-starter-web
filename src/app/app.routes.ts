import { type Routes } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';

import { NotFoundPage } from '@core/not-found-page/not-found-page';

import { HomePage } from '@features/home/pages/home-page/home-page';

export const routes: Routes = [
  // Eagerly load the landing page. Its translations still load lazily with the scope.
  {
    path: '',
    component: HomePage,
    title: 'pageTitle.home',
    providers: [provideTranslocoScope('home')],
  },
  // Lazy load non-essential features.
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  // Fallback route, keep it at the end.
  {
    path: '**',
    component: NotFoundPage,
    title: 'pageTitle.notFound',
  },
];
