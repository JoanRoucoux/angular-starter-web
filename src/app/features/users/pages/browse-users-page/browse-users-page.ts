import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UsersApi } from '@features/users/data/users-api';

@Component({
  selector: 'app-browse-users-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './browse-users-page.html',
})
export class BrowseUsersPage {
  #usersApi = inject(UsersApi);

  // Exposes value(), error(), isLoading() and reload() to handle every state of the request.
  users = this.#usersApi.usersResource();
}
