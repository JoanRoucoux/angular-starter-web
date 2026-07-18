import { Component, inject, signal } from '@angular/core';
import { FormField, form, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

import { UsersApi } from '@features/users/data/users-api';
import { initialUserCreation, userCreationSchema } from '@features/users/forms/create-user-form';

import { hasRequiredError, showError } from '@shared/forms/form-helpers';

@Component({
  selector: 'app-create-user-page',
  imports: [FormField, RouterLink, TranslocoPipe],
  templateUrl: './create-user-page.html',
})
export class CreateUserPage {
  #usersApi = inject(UsersApi);
  #router = inject(Router);

  readonly #model = signal(initialUserCreation());

  readonly form = form(this.#model, userCreationSchema);

  readonly submitError = signal(false);

  // Templates can only reach component members, so the form helpers are re-exposed here.
  readonly showError = showError;
  readonly hasRequiredError = hasRequiredError;

  // submit() marks every field as touched, skips the action while invalid and drives form().submitting().
  async submit(): Promise<void> {
    this.submitError.set(false);
    await submit(this.form, async () => {
      try {
        const user = await firstValueFrom(this.#usersApi.createUser(this.#model()));
        await this.#router.navigate(['/users', user.id]);
      } catch {
        this.submitError.set(true);
      }
    });
  }
}
