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

  // Returns the created user, or undefined when the form is invalid or the call failed.
  async save(): Promise<User | undefined> {
    this.submitError.set(false);
    let created: User | undefined;

    // submit() marks every field as touched, skips the action while invalid and drives form().submitting().
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
