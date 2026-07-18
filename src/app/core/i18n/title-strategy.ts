import { Injectable, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TranslocoService } from '@jsverse/transloco';

import { LanguageService } from '@core/i18n/language';

const APP_TITLE = 'Angular Starter Web';

@Injectable({
  providedIn: 'root',
})
export class AppTitleStrategy extends TitleStrategy {
  #titleService = inject(Title);
  #translocoService = inject(TranslocoService);
  #languageService = inject(LanguageService);
  #lastSnapshot: RouterStateSnapshot | undefined;

  constructor() {
    super();
    // Re-translate the current page title whenever the active language changes.
    effect(() => {
      this.#languageService.activeLang();
      if (this.#lastSnapshot) {
        this.updateTitle(this.#lastSnapshot);
      }
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.#lastSnapshot = snapshot;

    const titleKey = this.buildTitle(snapshot);
    const pageTitle = titleKey ? this.#translocoService.translate(titleKey) : undefined;

    this.#titleService.setTitle(pageTitle ? `${pageTitle} | ${APP_TITLE}` : APP_TITLE);
  }
}
