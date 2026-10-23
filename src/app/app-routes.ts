import { type Routes } from '@angular/router';

import { NotFoundPage } from '@core/not-found-page/not-found-page';

import { HOME_PATHS } from '@features/home/contract/home-paths';
import { HOME_ROUTES } from '@features/home/home-routes';
import { USERS_PATHS } from '@features/users/contract/users-paths';

export const routes: Routes = [
  {
    path: HOME_PATHS.segment,
    children: HOME_ROUTES,
  },
  {
    path: USERS_PATHS.segment,
    loadChildren: () => import('./features/users/users-routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'pageTitle.notFound',
  },
];
