import { Injectable, inject } from '@angular/core';

import type { Observable } from 'rxjs';

import type { User, UserCreation } from '@core/api/angularStarterWebAPI.schemas';
import { UsersService } from '@core/api/users/users.service';

@Injectable({ providedIn: 'root' })
export class UserCreateService {
  #usersService = inject(UsersService);

  createUser(user: UserCreation): Observable<User> {
    return this.#usersService.createUser(user);
  }
}
