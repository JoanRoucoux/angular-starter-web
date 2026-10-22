import { Injectable, inject, signal } from '@angular/core';
import { form, submit } from '@angular/forms/signals';

import { firstValueFrom } from 'rxjs';

import type { User } from '@core/api-client/angularStarterWebAPI.schemas';
import { UsersService } from '@core/api-client/users/users.service';

import { initialUserCreation, userCreationSchema } from './user-create-form';

@Injectable()
export class UserCreateStore {
  #usersApiClient = inject(UsersService);

  readonly #model = signal(initialUserCreation());

  readonly form = form(this.#model, userCreationSchema);

  readonly submitError = signal(false);

  async save(): Promise<User | undefined> {
    this.submitError.set(false);
    let created: User | undefined;

    await submit(this.form, async () => {
      try {
        created = await firstValueFrom(this.#usersApiClient.createUser(this.#model()));
      } catch {
        this.submitError.set(true);
      }
    });

    return created;
  }
}
