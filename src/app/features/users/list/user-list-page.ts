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
  #store = inject(UserListStore);

  protected readonly users = this.#store.users;
  protected readonly filteredUsers = this.#store.filteredUsers;
  protected readonly search = this.#store.search;

  protected onSearchInput(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }
}
