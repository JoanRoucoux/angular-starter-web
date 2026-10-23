import { Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { hasRequiredError, showError } from '@shared/forms/form-helpers';

import { USERS_PATH, userPath } from '../contract/users-paths';
import { UserCreateStore } from './user-create-store';

@Component({
  selector: 'app-user-create-page',
  imports: [FormField, RouterLink, TranslocoPipe],
  templateUrl: './user-create-page.html',
  providers: [UserCreateStore],
})
export class UserCreatePage {
  #store = inject(UserCreateStore);
  #router = inject(Router);

  protected readonly form = this.#store.form;
  protected readonly submitError = this.#store.submitError;

  protected readonly usersPath = USERS_PATH;

  readonly showError = showError;
  readonly hasRequiredError = hasRequiredError;

  async submit(): Promise<void> {
    const user = await this.#store.save();

    if (user) {
      await this.#router.navigate(userPath(user.id));
    }
  }
}
