import { type Routes } from '@angular/router';

import { NotFoundPage } from '@core/not-found-page/not-found-page';

import { HOME_SEGMENT } from '@features/home/contract/home-paths';
import { HOME_ROUTES } from '@features/home/home-routes';
import { USERS_SEGMENT } from '@features/users/contract/users-paths';

export const routes: Routes = [
  {
    path: HOME_SEGMENT,
    children: HOME_ROUTES,
  },
  {
    path: USERS_SEGMENT,
    loadChildren: () => import('./features/users/users-routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'pageTitle.notFound',
  },
];
