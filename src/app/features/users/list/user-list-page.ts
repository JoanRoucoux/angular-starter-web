import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { UserListStore } from './user-list-store';

@Component({
  selector: 'app-user-list-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './user-list-page.html',
})
export class UserListPage {
  protected readonly store = inject(UserListStore);

  protected onSearchInput(event: Event): void {
    this.store.search.set((event.target as HTMLInputElement).value);
  }
}
