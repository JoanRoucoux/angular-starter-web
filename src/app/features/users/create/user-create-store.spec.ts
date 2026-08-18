import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { User } from '@core/api-client/angularStarterWebAPI.schemas';

import { UserCreateStore } from './user-create-store';

describe('UserCreateStore', () => {
  let store: UserCreateStore;
  let httpTesting: HttpTestingController;

  const user: User = { id: 42, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'pending' };

  const fillForm = (): void => {
    store.form.firstName().value.set('John');
    store.form.lastName().value.set('Doe');
    store.form.email().value.set('john.doe@example.com');
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting(), UserCreateStore],
    });
    store = TestBed.inject(UserCreateStore);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should send no request and return nothing while the form is invalid', async () => {
    const created = await store.save();

    expect(created).toBeUndefined();
    expect(store.submitError()).toBe(false);
    httpTesting.expectNone('/api/users');
  });

  it('should post the form and return the created user', async () => {
    fillForm();

    const saved = store.save();
    // save() reaches the HTTP call through microtasks, wait for the request to be issued.
    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users'));

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
    request.flush(user, { status: 201, statusText: 'Created' });

    expect(await saved).toEqual(user);
    expect(store.submitError()).toBe(false);
  });

  it('should flag the error and return nothing when the call fails', async () => {
    fillForm();

    const saved = store.save();
    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users'));
    request.flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(await saved).toBeUndefined();
    expect(store.submitError()).toBe(true);
  });
});
