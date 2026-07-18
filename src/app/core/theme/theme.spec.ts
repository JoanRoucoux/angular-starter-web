import { DOCUMENT } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('should default to the system theme', () => {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();

    expect(service.theme()).toBe('system');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('should apply and persist a forced theme', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('dark');
    TestBed.tick();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should clear the forced theme when going back to system', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('light');
    TestBed.tick();
    service.setTheme('system');
    TestBed.tick();

    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    expect(localStorage.getItem('theme')).toBeNull();
  });

  it('should restore the persisted theme on startup', () => {
    localStorage.setItem('theme', 'dark');

    const service = TestBed.inject(ThemeService);
    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(TestBed.inject(DOCUMENT).documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
