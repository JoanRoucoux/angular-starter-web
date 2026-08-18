import { Component, inject, input, numberAttribute } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UsersService } from '@core/api-client/users/users.service';

@Component({
  selector: 'app-user-detail-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './user-detail-page.html',
})
export class UserDetailPage {
  #usersApiClient = inject(UsersService);

  // Route parameter bound by the router, see withComponentInputBinding() in app-config.ts.
  readonly userId = input.required({ transform: numberAttribute });

  // Reloads automatically whenever userId changes.
  user = rxResource({
    params: this.userId,
    stream: ({ params }) => this.#usersApiClient.getUser(params),
  });
}
