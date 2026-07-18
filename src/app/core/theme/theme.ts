import { DOCUMENT } from '@angular/common';
import { Injectable, Signal, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'system' | 'dark';

/** Also read by the inline script in index.html to apply the theme before the app boots. */
const THEME_STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  #document = inject(DOCUMENT);

  readonly availableThemes: Theme[] = ['light', 'system', 'dark'];

  readonly #theme = signal<Theme>(this.#restoreTheme());
  readonly theme: Signal<Theme> = this.#theme.asReadonly();

  constructor() {
    effect(() => {
      const theme = this.#theme();
      if (theme === 'system') {
        this.#document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        this.#document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
    });
  }

  setTheme(theme: Theme): void {
    this.#theme.set(theme);
  }

  #restoreTheme(): Theme {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  }
}
