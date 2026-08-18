import { Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { hasRequiredError, showError } from '@shared/forms/form-helpers';

import { UserCreateStore } from './user-create-store';

@Component({
  selector: 'app-user-create-page',
  imports: [FormField, RouterLink, TranslocoPipe],
  templateUrl: './user-create-page.html',
})
export class UserCreatePage {
  #store = inject(UserCreateStore);
  #router = inject(Router);

  protected readonly form = this.#store.form;
  protected readonly submitError = this.#store.submitError;

  // Templates can only reach component members, so the form helpers are re-exposed here.
  readonly showError = showError;
  readonly hasRequiredError = hasRequiredError;

  async submit(): Promise<void> {
    const user = await this.#store.save();

    if (user) {
      await this.#router.navigate(['/users', user.id]);
    }
  }
}
