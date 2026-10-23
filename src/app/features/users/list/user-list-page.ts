import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import type { User } from '@core/api-client/angularStarterWebAPI.schemas';

import { USER_CREATE_PATH, userPath } from '../contract/users-paths';
import { UserDeleteDialog } from './delete-dialog/user-delete-dialog';
import { UserListStore } from './user-list-store';

@Component({
  selector: 'app-user-list-page',
  imports: [RouterLink, TranslocoPipe, UserDeleteDialog],
  templateUrl: './user-list-page.html',
  providers: [UserListStore],
})
export class UserListPage {
  #store = inject(UserListStore);
  private readonly heading = viewChild.required<ElementRef<HTMLElement>>('heading');

  protected readonly users = this.#store.users;
  protected readonly filteredUsers = this.#store.filteredUsers;
  protected readonly search = this.#store.search;
  protected readonly userCreatePath = USER_CREATE_PATH;
  protected readonly userPath = userPath;

  protected readonly userToDelete = signal<User | undefined>(undefined);
  protected readonly deletedUserName = signal('');

  protected onSearchInput(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected onDelete(user: User): void {
    this.userToDelete.set(user);
  }

  protected onDismissed(): void {
    this.userToDelete.set(undefined);
  }

  protected onDeleted(user: User): void {
    this.deletedUserName.set(`${user.firstName} ${user.lastName}`);
    this.userToDelete.set(undefined);
    this.users.reload();
    this.heading().nativeElement.focus();
  }
}
