import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';

import { TranslocoService } from '@jsverse/transloco';
import { vi } from 'vitest';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { AppTitleStrategy } from './title-strategy';

describe('AppTitleStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        getTranslocoTestingModule({ langs: { en: { 'pageTitle.home': 'Home' }, fr: { 'pageTitle.home': 'Accueil' } } }),
      ],
      providers: [provideZonelessChangeDetection()],
    });
  });

  const mockSnapshotWithTitle = (strategy: AppTitleStrategy, title: string | undefined): RouterStateSnapshot => {
    vi.spyOn(strategy, 'buildTitle').mockReturnValue(title);
    return {} as RouterStateSnapshot;
  };

  it('should translate the route title and append the app name', () => {
    const strategy = TestBed.inject(AppTitleStrategy);
    const titleService = TestBed.inject(Title);

    strategy.updateTitle(mockSnapshotWithTitle(strategy, 'pageTitle.home'));

    expect(titleService.getTitle()).toBe('Home | Angular Starter Web');
  });

  it('should fall back to the app name when the route has no title', () => {
    const strategy = TestBed.inject(AppTitleStrategy);
    const titleService = TestBed.inject(Title);

    strategy.updateTitle(mockSnapshotWithTitle(strategy, undefined));

    expect(titleService.getTitle()).toBe('Angular Starter Web');
  });

  it('should re-translate the current title when the active language changes', () => {
    const strategy = TestBed.inject(AppTitleStrategy);
    const titleService = TestBed.inject(Title);
    const translocoService = TestBed.inject(TranslocoService);

    strategy.updateTitle(mockSnapshotWithTitle(strategy, 'pageTitle.home'));
    translocoService.setActiveLang('fr');
    TestBed.tick();

    expect(titleService.getTitle()).toBe('Accueil | Angular Starter Web');
  });

  it('should leave the title untouched when the language changes before any navigation', () => {
    TestBed.inject(AppTitleStrategy);
    const setTitleSpy = vi.spyOn(TestBed.inject(Title), 'setTitle');

    TestBed.inject(TranslocoService).setActiveLang('fr');
    TestBed.tick();

    expect(setTitleSpy).not.toHaveBeenCalled();
  });
});
