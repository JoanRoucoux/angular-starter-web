import { Component, inject, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UsersApi } from '@features/users/data/users-api';

@Component({
  selector: 'app-view-user-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './view-user-page.html',
})
export class ViewUserPage {
  #usersApi = inject(UsersApi);

  // Route parameter bound by the router, see withComponentInputBinding() in app.config.ts.
  readonly userId = input.required({ transform: numberAttribute });

  user = this.#usersApi.userResource(this.userId);
}
