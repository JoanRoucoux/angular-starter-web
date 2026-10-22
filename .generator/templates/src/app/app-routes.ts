import { type Routes } from '@angular/router';

import { NotFoundPage } from '@core/not-found-page/not-found-page';

import { {{featureConst}}_ROUTES } from '@features/{{feature}}/{{feature}}-routes';

export const routes: Routes = [
  {
    path: '',
    children: {{featureConst}}_ROUTES,
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'pageTitle.notFound',
  },
];
