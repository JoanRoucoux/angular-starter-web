import { type Routes } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';

import { UserCreatePage } from './create/user-create-page';
import { UserDetailPage } from './detail/user-detail-page';
import { UserListPage } from './list/user-list-page';
import { UserListStore } from './list/user-list-store';

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
        // Scoped to this route: created and destroyed with the page.
        providers: [UserListStore],
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
