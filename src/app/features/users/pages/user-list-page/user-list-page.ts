import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UserListService } from '@features/users/services/user-list-service';

@Component({
  selector: 'app-user-list-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './user-list-page.html',
})
export class UserListPage {
  #userListService = inject(UserListService);

  // Exposes value(), error(), isLoading() and reload() to handle every state of the request.
  users = this.#userListService.usersResource();
}
