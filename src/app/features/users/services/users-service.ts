import { Injectable, type ResourceRef, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import type { Observable } from 'rxjs';

import type { User, UserCreation } from '@core/api/angularStarterWebAPI.schemas';
// Aliased to avoid clashing with this feature's own UsersService below.
import { UsersService as UsersApiClient } from '@core/api/users/users.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  #usersApiClient = inject(UsersApiClient);

  // Resource factories must be called from an injection context (e.g. a field initializer).
  usersResource(): ResourceRef<User[]> {
    return rxResource({
      stream: () => this.#usersApiClient.getUsers(),
      defaultValue: [],
    });
  }

  // Reloads automatically whenever userId changes.
  userResource(userId: () => number): ResourceRef<User | undefined> {
    return rxResource({
      params: userId,
      stream: ({ params }) => this.#usersApiClient.getUser(params),
    });
  }

  createUser(user: UserCreation): Observable<User> {
    return this.#usersApiClient.createUser(user);
  }
}
