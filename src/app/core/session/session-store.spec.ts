import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { firstValueFrom } from 'rxjs';

import { SessionStore } from './session-store';

describe('SessionStore', () => {
  let store: SessionStore;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(SessionStore);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should report a permission the session grants', async () => {
    const granted = firstValueFrom(store.has('users:read'));

    httpTesting.expectOne('/api/session').flush({ permissions: ['users:read'] });

    expect(await granted).toBe(true);
  });

  it('should report a permission the session does not grant', async () => {
    const granted = firstValueFrom(store.has('users:read'));

    httpTesting.expectOne('/api/session').flush({ permissions: [] });

    expect(await granted).toBe(false);
  });

  it('should call the API once however many permissions are checked', async () => {
    const first = firstValueFrom(store.has('users:read'));
    const second = firstValueFrom(store.has('users:write'));

    httpTesting.expectOne('/api/session').flush({ permissions: ['users:read'] });

    expect(await first).toBe(true);
    expect(await second).toBe(false);
  });
});
