import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { UsersService } from '@core/api-client/users/users.service';

@Injectable()
export class UserListStore {
  #usersApiClient = inject(UsersService);

  readonly search = signal('');

  readonly users = rxResource({
    stream: () => this.#usersApiClient.getUsers(),
    defaultValue: [],
  });

  readonly filteredUsers = computed(() => {
    const users = this.users.hasValue() ? this.users.value() : [];
    const search = this.search().trim().toLowerCase();

    if (!search) {
      return users;
    }

    return users.filter((user) => `${user.firstName} ${user.lastName}`.toLowerCase().includes(search));
  });
}
