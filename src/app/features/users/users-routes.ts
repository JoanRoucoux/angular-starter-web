import { type Routes } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';

import { preloadScope } from '@core/i18n/preload-scope';

import { UserCreatePage } from './create/user-create-page';
import { UserDetailPage } from './detail/user-detail-page';
import { UserListPage } from './list/user-list-page';
import { usersAccessGuard } from './users-access-guard';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    canMatch: [usersAccessGuard],
    // Load the feature translations (public/i18n/users/) alongside the feature.
    providers: [provideTranslocoScope('users')],
    resolve: { translations: preloadScope('users') },
    children: [
      {
        path: '',
        component: UserListPage,
        title: 'pageTitle.users',
      },
      {
        // Declared before :userId so 'new' is not matched as an identifier.
        path: 'new',
        component: UserCreatePage,
        title: 'pageTitle.userCreate',
      },
      {
        path: ':userId',
        component: UserDetailPage,
        title: 'pageTitle.userDetail',
      },
    ],
  },
];
