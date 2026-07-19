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
});
