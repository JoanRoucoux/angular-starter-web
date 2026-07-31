import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UsersService } from '@features/users/services/users-service';

@Component({
  selector: 'app-user-list-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './user-list-page.html',
})
export class UserListPage {
  #usersService = inject(UsersService);

  // Exposes value(), error(), isLoading() and reload() to handle every state of the request.
  users = this.#usersService.usersResource();
}
