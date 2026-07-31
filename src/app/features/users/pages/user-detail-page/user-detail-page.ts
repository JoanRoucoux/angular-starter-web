import { Component, inject, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UsersService } from '@features/users/services/users-service';

@Component({
  selector: 'app-user-detail-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './user-detail-page.html',
})
export class UserDetailPage {
  #usersService = inject(UsersService);

  // Route parameter bound by the router, see withComponentInputBinding() in app-config.ts.
  readonly userId = input.required({ transform: numberAttribute });

  user = this.#usersService.userResource(this.userId);
}
