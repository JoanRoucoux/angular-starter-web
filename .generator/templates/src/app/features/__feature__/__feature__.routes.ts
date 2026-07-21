import { type Routes } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';

import { {{featurePascal}}Page } from './pages/{{feature}}-page/{{feature}}-page';

export const {{featureConst}}_ROUTES: Routes = [
  {
    path: '',
    // Load the feature translations (public/i18n/{{feature}}/) alongside the feature.
    providers: [provideTranslocoScope('{{feature}}')],
    children: [
      {
        path: '',
        component: {{featurePascal}}Page,
        title: 'pageTitle.{{featureCamel}}',
      },
    ],
  },
];
