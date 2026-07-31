import { Injectable, type ResourceRef, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import type { User } from '@core/api/angularStarterWebAPI.schemas';
import { UsersService } from '@core/api/users/users.service';

@Injectable({ providedIn: 'root' })
export class UserListService {
  #usersService = inject(UsersService);

  // Resource factories must be called from an injection context (e.g. a field initializer).
  usersResource(): ResourceRef<User[]> {
    return rxResource({
      stream: () => this.#usersService.getUsers(),
      defaultValue: [],
    });
  }
}
