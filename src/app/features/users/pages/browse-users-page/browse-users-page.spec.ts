import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { User } from '@core/api/angularStarterWebAPI.schemas';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { BrowseUsersPage } from './browse-users-page';

describe('BrowseUsersPage', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseUsersPage, getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should display users once loaded', async () => {
    const fixture = TestBed.createComponent(BrowseUsersPage);
    // Trigger the initial rendering so the resource sends its HTTP request.
    fixture.detectChanges();

    const users: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' },
      { id: 2, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', status: 'pending' },
    ];
    httpTesting.expectOne('/api/users').flush(users);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li')).toHaveLength(2);
    expect(compiled.textContent).toContain('John Doe');
  });

  it('should display an error state with a retry button when loading fails', async () => {
    const fixture = TestBed.createComponent(BrowseUsersPage);
    fixture.detectChanges();

    httpTesting.expectOne('/api/users').flush(null, { status: 500, statusText: 'Internal Server Error' });
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="users-error"]')).toBeTruthy();
    expect(compiled.querySelector('button')).toBeTruthy();
  });

  it('should reload the users when the retry button is clicked', async () => {
    const fixture = TestBed.createComponent(BrowseUsersPage);
    fixture.detectChanges();

    httpTesting.expectOne('/api/users').flush(null, { status: 500, statusText: 'Internal Server Error' });
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector<HTMLButtonElement>('[data-testid="users-retry"]')!.click();

    // reload() re-subscribes through the effect scheduler, wait for the new request to be issued.
    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users'));
    request.flush([{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' }]);
    await fixture.whenStable();

    expect(compiled.querySelectorAll('li')).toHaveLength(1);
  });

  it('should display an empty state when there are no users', async () => {
    const fixture = TestBed.createComponent(BrowseUsersPage);
    fixture.detectChanges();

    httpTesting.expectOne('/api/users').flush([]);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="users-empty"]')).toBeTruthy();
  });
});
