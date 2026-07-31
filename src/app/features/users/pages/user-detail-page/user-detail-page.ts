import { Component, inject, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UserDetailService } from '@features/users/services/user-detail-service';

@Component({
  selector: 'app-user-detail-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './user-detail-page.html',
})
export class UserDetailPage {
  #userDetailService = inject(UserDetailService);

  // Route parameter bound by the router, see withComponentInputBinding() in app-config.ts.
  readonly userId = input.required({ transform: numberAttribute });

  user = this.#userDetailService.userResource(this.userId);
}
