import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, type TestRequest, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import type { User } from '@core/api-client/angularStarterWebAPI.schemas';

import { UserListStore } from './user-list-store';

describe('UserListStore', () => {
  let store: UserListStore;
  let httpTesting: HttpTestingController;

  const users: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
    { id: 2, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', status: 'pending' },
  ];

  // tick() fires the request; the response reaches the resource through microtasks, hence whenStable().
  const respondWith = async (respond: (request: TestRequest) => void): Promise<void> => {
    TestBed.tick();
    respond(httpTesting.expectOne('/api/users'));
    await TestBed.inject(ApplicationRef).whenStable();
  };

  const loadUsers = (): Promise<void> => respondWith((request) => request.flush(users));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        // Provided by the route in the app, the test must mirror it.
        UserListStore,
      ],
    });
    store = TestBed.inject(UserListStore);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should expose the users returned by the API', async () => {
    await loadUsers();

    expect(store.users.value()).toEqual(users);
    expect(store.filteredUsers()).toEqual(users);
  });

  it('should filter the users on first name, last name and case', async () => {
    await loadUsers();

    store.search.set('ALICE');
    expect(store.filteredUsers()).toEqual([users[1]]);

    store.search.set('doe');
    expect(store.filteredUsers()).toEqual([users[0]]);
  });

  it('should return every user when the search term is blank', async () => {
    await loadUsers();

    store.search.set('   ');

    expect(store.filteredUsers()).toEqual(users);
  });

  it('should return no user when nothing matches', async () => {
    await loadUsers();

    store.search.set('unknown');

    expect(store.filteredUsers()).toEqual([]);
  });

  it('should expose the error when the request fails', async () => {
    await respondWith((request) => request.flush(null, { status: 500, statusText: 'Internal Server Error' }));

    expect(store.users.error()).toBeDefined();
    expect(store.filteredUsers()).toEqual([]);
  });
});
