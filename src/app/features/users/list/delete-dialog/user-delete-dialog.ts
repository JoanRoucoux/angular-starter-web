import { type AfterViewInit, Component, ElementRef, computed, inject, input, output, viewChild } from '@angular/core';

import { TranslocoPipe } from '@jsverse/transloco';

import type { User } from '@core/api-client/angularStarterWebAPI.schemas';

import { UserDeleteStore } from './user-delete-store';

@Component({
  selector: 'app-user-delete-dialog',
  imports: [TranslocoPipe],
  templateUrl: './user-delete-dialog.html',
  providers: [UserDeleteStore],
})
export class UserDeleteDialog implements AfterViewInit {
  #store = inject(UserDeleteStore);
  private readonly dialogElement = viewChild.required<ElementRef<HTMLDialogElement>>('dialogElement');

  readonly user = input.required<User>();
  readonly deleted = output<void>();
  readonly dismissed = output<void>();

  protected readonly deleting = this.#store.deleting;
  protected readonly error = this.#store.error;
  protected readonly userName = computed(() => `${this.user().firstName} ${this.user().lastName}`);

  ngAfterViewInit(): void {
    this.dialogElement().nativeElement.showModal();
  }

  protected dismiss(): void {
    this.#close();
    this.dismissed.emit();
  }

  protected async confirm(): Promise<void> {
    if (await this.#store.remove(this.user().id)) {
      this.#close();
      this.deleted.emit();
    }
  }

  // close() hands focus back to the element that opened the dialog; dropping the element from the DOM does not.
  #close(): void {
    this.dialogElement().nativeElement.close();
  }
}
