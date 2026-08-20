import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppTitleStrategy } from '@core/i18n/title-strategy';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  #titleStrategy = inject(AppTitleStrategy);

  protected readonly pageTitle = this.#titleStrategy.pageTitle;
}
