import { type Routes } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';

import { preloadScope } from '@core/i18n/preload-scope';

import { {{featurePascal}}Page } from './{{feature}}-page';

export const {{featureConst}}_ROUTES: Routes = [
  {
    path: '',
    // Load the feature translations (public/i18n/{{feature}}/) alongside the feature.
    providers: [provideTranslocoScope('{{feature}}')],
    resolve: { translations: preloadScope('{{feature}}') },
    children: [
      {
        path: '',
        component: {{featurePascal}}Page,
        title: 'pageTitle.{{featureCamel}}',
      },
    ],
  },
];
