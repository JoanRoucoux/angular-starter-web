import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { User } from '@core/api/angularStarterWebAPI.schemas';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { CreateUserPage } from './create-user-page';

describe('CreateUserPage', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserPage, getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should show validation errors and send no request when submitted empty', async () => {
    const fixture = TestBed.createComponent(CreateUserPage);
    fixture.detectChanges();

    (fixture.nativeElement as HTMLElement).querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#firstName-error')).toBeTruthy();
    expect(compiled.querySelector('#lastName-error')).toBeTruthy();
    expect(compiled.querySelector('#email-error')).toBeTruthy();
    httpTesting.expectNone('/api/users');
  });

  it('should show the format error message for a malformed email', async () => {
    const fixture = TestBed.createComponent(CreateUserPage);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    component.form.firstName().value.set('John');
    component.form.lastName().value.set('Doe');
    component.form.email().value.set('not-an-email');

    (fixture.nativeElement as HTMLElement).querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    // Translations resolve to their key in tests: the message distinguishes format from required errors.
    const emailError = (fixture.nativeElement as HTMLElement).querySelector('#email-error');
    expect(emailError!.textContent).toContain('createUser.errors.email');
    httpTesting.expectNone('/api/users');
  });

  it('should create the user and navigate to its detail page', async () => {
    const fixture = TestBed.createComponent(CreateUserPage);
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    const component = fixture.componentInstance;
    component.form.firstName().value.set('John');
    component.form.lastName().value.set('Doe');
    component.form.email().value.set('john.doe@example.com');
    const submitted = component.submit();

    // submit() reaches the HTTP call through microtasks, wait for the request to be issued.
    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });

    const user: User = { id: 42, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'pending' };
    request.flush(user, { status: 201, statusText: 'Created' });
    await submitted;

    expect(navigateSpy).toHaveBeenCalledWith(['/users', 42]);
  });

  it('should display an error message when the creation fails', async () => {
    const fixture = TestBed.createComponent(CreateUserPage);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    component.form.firstName().value.set('John');
    component.form.lastName().value.set('Doe');
    component.form.email().value.set('john.doe@example.com');
    const submitted = component.submit();

    const request = await vi.waitFor(() => httpTesting.expectOne('/api/users'));
    request.flush(null, { status: 500, statusText: 'Internal Server Error' });
    await submitted;
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="create-user-error"]')).toBeTruthy();
    expect(compiled.querySelector<HTMLButtonElement>('[data-testid="create-user-submit"]')!.disabled).toBe(false);
  });
});
