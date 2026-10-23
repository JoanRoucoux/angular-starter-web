import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { USERS_PATHS } from '../contract/users-paths';
import { UserDetailStore } from './user-detail-store';

@Component({
  selector: 'app-user-detail-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './user-detail-page.html',
  providers: [UserDetailStore],
})
export class UserDetailPage {
  #store = inject(UserDetailStore);

  protected readonly user = this.#store.user;
  protected readonly usersPaths = USERS_PATHS;
}
