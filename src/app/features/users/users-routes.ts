import { type Routes } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';

import { UserCreatePage } from './pages/user-create-page/user-create-page';
import { UserDetailPage } from './pages/user-detail-page/user-detail-page';
import { UserListPage } from './pages/user-list-page/user-list-page';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    // Load the feature translations (public/i18n/users/) alongside the feature.
    providers: [provideTranslocoScope('users')],
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
        title: 'pageTitle.createUser',
      },
      {
        path: ':userId',
        component: UserDetailPage,
        title: 'pageTitle.userDetail',
      },
    ],
  },
];
