import { Component, inject } from '@angular/core';

import { TranslocoPipe } from '@jsverse/transloco';

import { PageReload } from './page-reload';

@Component({
  selector: 'app-navigation-error-page',
  imports: [TranslocoPipe],
  templateUrl: './navigation-error-page.html',
})
export class NavigationErrorPage {
  readonly #pageReload = inject(PageReload);

  protected reload(): void {
    this.#pageReload.reload();
  }
}
