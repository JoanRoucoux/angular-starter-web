import { type Routes } from '@angular/router';

import { NavigationErrorPage } from '@core/navigation-error-page/navigation-error-page';
import { NAVIGATION_ERROR_PATH } from '@core/navigation-error-page/navigation-error-path';
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
    path: NAVIGATION_ERROR_PATH,
    component: NavigationErrorPage,
    title: 'pageTitle.navigationError',
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'pageTitle.notFound',
  },
];
