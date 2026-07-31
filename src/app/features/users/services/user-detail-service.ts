import { Injectable, type ResourceRef, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import type { User } from '@core/api/angularStarterWebAPI.schemas';
import { UsersService } from '@core/api/users/users.service';

@Injectable({ providedIn: 'root' })
export class UserDetailService {
  #usersService = inject(UsersService);

  // Reloads automatically whenever userId changes.
  userResource(userId: () => number): ResourceRef<User | undefined> {
    return rxResource({
      params: userId,
      stream: ({ params }) => this.#usersService.getUser(params),
    });
  }
}
