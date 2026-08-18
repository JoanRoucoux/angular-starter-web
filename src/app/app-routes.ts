import { type Routes } from '@angular/router';

import { NotFoundPage } from '@core/not-found-page/not-found-page';

import { HOME_ROUTES } from '@features/home/home-routes';

export const routes: Routes = [
  // Eagerly load the landing feature. Its translations still load lazily with the scope.
  {
    path: '',
    children: HOME_ROUTES,
  },
  // Lazy load non-essential features.
  {
    path: 'users',
    loadChildren: () => import('./features/users/users-routes').then((m) => m.USERS_ROUTES),
  },
  // Fallback route, keep it at the end.
  {
    path: '**',
    component: NotFoundPage,
    title: 'pageTitle.notFound',
  },
];
