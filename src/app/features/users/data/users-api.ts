import { Injectable, ResourceRef, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';

import { User, UserCreation } from '@core/api/angularStarterWebAPI.schemas';
import { UsersService } from '@core/api/users/users.service';

/**
 * Data layer of the users feature: single place for its inbound/outbound calls.
 * Wraps the generated client (core/api) and owns the data/error/loading state
 * (rxResource), so pages only consume ready-made resources.
 */
@Injectable({ providedIn: 'root' })
export class UsersApi {
  #usersService = inject(UsersService);

  // Resource factories must be called from an injection context (e.g. a field initializer).
  usersResource(): ResourceRef<User[]> {
    return rxResource({
      stream: () => this.#usersService.getUsers(),
      defaultValue: [],
    });
  }

  // Reloads automatically whenever userId changes.
  userResource(userId: () => number): ResourceRef<User | undefined> {
    return rxResource({
      params: userId,
      stream: ({ params }) => this.#usersService.getUser(params),
    });
  }

  createUser(user: UserCreation): Observable<User> {
    return this.#usersService.createUser(user);
  }
}
