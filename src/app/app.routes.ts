import { Routes } from '@angular/router';

import { NotFoundPage } from '@core/not-found-page/not-found-page';

import { HomePage } from '@features/home/pages/home-page/home-page';

export const routes: Routes = [
  // Eagerly load the landing page.
  {
    path: '',
    component: HomePage,
    title: 'pageTitle.home',
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
