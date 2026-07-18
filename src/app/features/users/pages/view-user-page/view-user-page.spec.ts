import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { User } from '@core/api/angularStarterWebAPI.schemas';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { ViewUserPage } from './view-user-page';

describe('ViewUserPage', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserPage, getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should display the user once loaded', async () => {
    const fixture = TestBed.createComponent(ViewUserPage);
    fixture.componentRef.setInput('userId', 1);
    fixture.detectChanges();

    const user: User = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', status: 'active' };
    httpTesting.expectOne('/api/users/1').flush(user);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('john.doe@example.com');
  });

  it('should display an error message when loading fails', async () => {
    const fixture = TestBed.createComponent(ViewUserPage);
    fixture.componentRef.setInput('userId', 1);
    fixture.detectChanges();

    httpTesting.expectOne('/api/users/1').flush(null, { status: 500, statusText: 'Internal Server Error' });
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('userDetail.error');
  });
});
