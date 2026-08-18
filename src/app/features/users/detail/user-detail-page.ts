import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UserDetailStore } from './user-detail-store';

@Component({
  selector: 'app-user-detail-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './user-detail-page.html',
})
export class UserDetailPage {
  #store = inject(UserDetailStore);

  protected readonly user = this.#store.user;
}
