import { type Routes } from '@angular/router';

import { NotFoundPage } from '@core/not-found-page/not-found-page';

import { {{featureConst}}_ROUTES } from '@features/{{feature}}/{{feature}}.routes';

export const routes: Routes = [
  // Eagerly load the landing feature. Its translations still load lazily with the scope.
  {
    path: '',
    children: {{featureConst}}_ROUTES,
  },
  // Fallback route, keep it at the end.
  {
    path: '**',
    component: NotFoundPage,
    title: 'pageTitle.notFound',
  },
];
