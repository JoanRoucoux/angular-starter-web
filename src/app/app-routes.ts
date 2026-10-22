import { type Routes } from '@angular/router';

import { NotFoundPage } from '@core/not-found-page/not-found-page';

import { HOME_ROUTES } from '@features/home/home-routes';

export const routes: Routes = [
  {
    path: '',
    children: HOME_ROUTES,
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users-routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'pageTitle.notFound',
  },
];
