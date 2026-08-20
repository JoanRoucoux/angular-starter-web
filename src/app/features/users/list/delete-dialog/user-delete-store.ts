import { Injectable, inject, signal } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { UsersService } from '@core/api-client/users/users.service';

@Injectable()
export class UserDeleteStore {
  #usersApiClient = inject(UsersService);

  readonly deleting = signal(false);
  readonly error = signal(false);

  async remove(userId: number): Promise<boolean> {
    this.deleting.set(true);
    this.error.set(false);

    try {
      await firstValueFrom(this.#usersApiClient.deleteUser(userId));
      return true;
    } catch {
      this.error.set(true);
      return false;
    } finally {
      this.deleting.set(false);
    }
  }
}
