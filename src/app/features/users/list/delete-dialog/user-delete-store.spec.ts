import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { UserDeleteStore } from './user-delete-store';

describe('UserDeleteStore', () => {
  let store: UserDeleteStore;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        // Provided by the dialog component in the app, the test must mirror it.
        UserDeleteStore,
      ],
    });
    store = TestBed.inject(UserDeleteStore);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should delete the user and report a success', async () => {
    const removed = store.remove(1);

    const request = httpTesting.expectOne('/api/users/1');
    expect(request.request.method).toBe('DELETE');
    expect(store.deleting()).toBe(true);
    request.flush(null, { status: 204, statusText: 'No Content' });

    expect(await removed).toBe(true);
    expect(store.deleting()).toBe(false);
    expect(store.error()).toBe(false);
  });

  it('should report a failure and expose the error when the request fails', async () => {
    const removed = store.remove(1);

    httpTesting.expectOne('/api/users/1').flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(await removed).toBe(false);
    expect(store.deleting()).toBe(false);
    expect(store.error()).toBe(true);
  });

  it('should clear a previous error when deleting again', async () => {
    const failed = store.remove(1);
    httpTesting.expectOne('/api/users/1').flush(null, { status: 500, statusText: 'Internal Server Error' });
    await failed;

    const removed = store.remove(1);
    expect(store.error()).toBe(false);
    httpTesting.expectOne('/api/users/1').flush(null, { status: 204, statusText: 'No Content' });

    expect(await removed).toBe(true);
  });
});
