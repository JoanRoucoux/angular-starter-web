import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { of } from 'rxjs';

import type { User } from '@core/api-client/angularStarterWebAPI.schemas';

import { UserDetailStore } from './user-detail-store';

describe('UserDetailStore', () => {
  let store: UserDetailStore;
  let httpTesting: HttpTestingController;

  const user: User = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' };

  const createStore = (userId: string): void => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId })) } },
        UserDetailStore,
      ],
    });
    store = TestBed.inject(UserDetailStore);
    httpTesting = TestBed.inject(HttpTestingController);
  };

  afterEach(() => {
    httpTesting.verify();
  });

  it('should read the user identifier from the route', () => {
    createStore('42');

    expect(store.userId()).toBe(42);
  });

  it('should load the user of the current route', async () => {
    createStore('1');

    // tick() fires the request; the response reaches the resource through microtasks, hence whenStable().
    TestBed.tick();
    httpTesting.expectOne('/api/users/1').flush(user);
    await TestBed.inject(ApplicationRef).whenStable();

    expect(store.user.value()).toEqual(user);
  });

  it('should expose the error when the request fails', async () => {
    createStore('1');

    TestBed.tick();
    httpTesting.expectOne('/api/users/1').flush(null, { status: 404, statusText: 'Not Found' });
    await TestBed.inject(ApplicationRef).whenStable();

    expect(store.user.error()).toBeDefined();
  });
});
