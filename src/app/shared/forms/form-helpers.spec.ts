import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FieldTree, email, form, required } from '@angular/forms/signals';

import { hasRequiredError, showError } from './form-helpers';

describe('form-helpers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
  });

  // form() must be called from an injection context, like in a component.
  function createForm(value: string): FieldTree<{ name: string }> {
    return TestBed.runInInjectionContext(() =>
      form(signal({ name: value }), (model) => {
        required(model.name);
        email(model.name);
      }),
    );
  }

  it('should only show errors once the field has been touched', () => {
    const testForm = createForm('');

    expect(showError(testForm.name)).toBe(false);

    testForm.name().markAsTouched();

    expect(showError(testForm.name)).toBe(true);
  });

  it('should not show errors on a touched valid field', () => {
    const testForm = createForm('john.doe@example.com');

    testForm.name().markAsTouched();

    expect(showError(testForm.name)).toBe(false);
  });

  it('should tell required errors apart from other errors', () => {
    expect(hasRequiredError(createForm('').name)).toBe(true);
    expect(hasRequiredError(createForm('not-an-email').name)).toBe(false);
  });
});
