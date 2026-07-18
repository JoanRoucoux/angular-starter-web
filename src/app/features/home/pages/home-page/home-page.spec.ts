import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { getTranslocoTestingModule } from '@shared/testing/transloco-testing';

import { HomePage } from './home-page';

describe('HomePage', () => {
  it('should link to the users feature', async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, getTranslocoTestingModule()],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();

    const link = (fixture.nativeElement as HTMLElement).querySelector('[data-testid="home-users-link"]');
    expect(link?.getAttribute('href')).toBe('/users');
  });
});
