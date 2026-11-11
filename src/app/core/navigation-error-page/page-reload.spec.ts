import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { PageReload } from './page-reload';

describe('PageReload', () => {
  it('should reload the current page', () => {
    const reload = vi.fn();
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: { defaultView: { location: { reload } } } }],
    });

    TestBed.inject(PageReload).reload();

    expect(reload).toHaveBeenCalledOnce();
  });

  it('should do nothing without a window', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: { defaultView: null } }],
    });

    expect(() => TestBed.inject(PageReload).reload()).not.toThrow();
  });
});
