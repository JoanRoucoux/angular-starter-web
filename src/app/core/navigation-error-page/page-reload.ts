import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageReload {
  readonly #document = inject(DOCUMENT);

  reload(): void {
    this.#document.defaultView?.location.reload();
  }
}
