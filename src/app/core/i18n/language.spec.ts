import { DOCUMENT } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TranslocoService } from '@jsverse/transloco';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { LanguageService } from './language';

describe('LanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('should expose the available languages', () => {
    const service = TestBed.inject(LanguageService);
    expect(service.availableLangs).toEqual(['en', 'fr']);
  });

  it('should switch the active language and update <html lang>', () => {
    const service = TestBed.inject(LanguageService);
    const translocoService = TestBed.inject(TranslocoService);
    const document = TestBed.inject(DOCUMENT);

    service.setActiveLang('fr');
    translocoService.langChanges$.subscribe();
    TestBed.tick();

    expect(service.activeLang()).toBe('fr');
    expect(document.documentElement.lang).toBe('fr');
  });

  it('should normalize languages declared as objects', () => {
    // Transloco also accepts `{ id, label }` language definitions: the service must expose plain ids.
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        getTranslocoTestingModule({
          translocoConfig: { availableLangs: [{ id: 'en', label: 'English' }], defaultLang: 'en' },
        }),
      ],
      providers: [provideZonelessChangeDetection()],
    });

    const service = TestBed.inject(LanguageService);

    expect(service.availableLangs).toEqual(['en']);
  });
});
