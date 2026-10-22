import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type ActivatedRouteSnapshot, type RouterStateSnapshot } from '@angular/router';

import { TranslocoService } from '@jsverse/transloco';
import { EMPTY, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Logger } from '@core/logger/logger';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { preloadScope } from './preload-scope';

describe('preloadScope', () => {
  let translocoService: TranslocoService;

  const run = (scope: string): Promise<boolean> =>
    TestBed.runInInjectionContext(() =>
      preloadScope(scope)({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    ) as Promise<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection()],
    });
    translocoService = TestBed.inject(TranslocoService);
  });

  it('should wait for the scope of the active language before resolving', async () => {
    const translation = new Subject<object>();
    const loadSpy = vi.spyOn(translocoService, 'load').mockReturnValue(translation);
    const settled = vi.fn();

    const pending = run('sample').then(settled);
    await Promise.resolve();

    expect(loadSpy).toHaveBeenCalledWith('sample/en');
    expect(settled).not.toHaveBeenCalled();

    translation.next({});
    await pending;

    expect(settled).toHaveBeenCalledWith(true);
  });

  it('should load the scope of the language active at resolution time', async () => {
    const loadSpy = vi.spyOn(translocoService, 'load');
    translocoService.setActiveLang('fr');

    await expect(run('other')).resolves.toBe(true);

    expect(loadSpy).toHaveBeenCalledWith('other/fr');
  });

  it('should resolve when the load completes without emitting', async () => {
    vi.spyOn(translocoService, 'load').mockReturnValue(EMPTY);

    await expect(run('sample')).resolves.toBe(true);
  });

  it('should log a failed load and still resolve', async () => {
    const error = new Error('boom');
    vi.spyOn(translocoService, 'load').mockReturnValue(throwError(() => error));
    const errorSpy = vi.spyOn(TestBed.inject(Logger), 'error').mockImplementation(() => undefined);

    await expect(run('sample')).resolves.toBe(true);

    expect(errorSpy).toHaveBeenCalledWith('preloadScope', 'Failed to load translation scope "sample/en"', error);
  });
});
