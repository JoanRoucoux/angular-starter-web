import { type Routes } from '@angular/router';

import { provideTranslocoScope } from '@jsverse/transloco';

import { BrowseUsersPage } from './pages/browse-users-page/browse-users-page';
import { CreateUserPage } from './pages/create-user-page/create-user-page';
import { ViewUserPage } from './pages/view-user-page/view-user-page';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    // Load the feature translations (public/i18n/users/) alongside the feature.
    providers: [provideTranslocoScope('users')],
    children: [
      {
        path: '',
        component: BrowseUsersPage,
        title: 'pageTitle.users',
      },
      {
        // Declared before :userId so 'new' is not matched as an identifier.
        path: 'new',
        component: CreateUserPage,
        title: 'pageTitle.createUser',
      },
      {
        path: ':userId',
        component: ViewUserPage,
        title: 'pageTitle.userDetail',
      },
    ],
  },
];
