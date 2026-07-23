import { provideZonelessChangeDetection, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { type FieldTree, form } from '@angular/forms/signals';

import type { UserCreation } from '@core/api/angularStarterWebAPI.schemas';

import { hasRequiredError } from '@shared/forms/form-helpers';

import { initialUserCreation, userCreationSchema } from './create-user-form';

describe('create-user-form', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
  });

  // form() must be called from an injection context, like in a component.
  const createForm = (model: UserCreation = initialUserCreation()): FieldTree<UserCreation> => {
    return TestBed.runInInjectionContext(() => form(signal(model), userCreationSchema));
  };

  it('should require every field', () => {
    const userForm = createForm();

    expect(userForm().invalid()).toBe(true);
    expect(hasRequiredError(userForm.firstName)).toBe(true);
    expect(hasRequiredError(userForm.lastName)).toBe(true);
    expect(hasRequiredError(userForm.email)).toBe(true);
  });

  it('should reject a malformed email', () => {
    const userForm = createForm({ firstName: 'John', lastName: 'Doe', email: 'not-an-email' });

    expect(userForm().invalid()).toBe(true);
    expect(hasRequiredError(userForm.email)).toBe(false);
    expect(userForm.email().invalid()).toBe(true);
  });

  it('should be valid with a complete model', () => {
    const userForm = createForm({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });

    expect(userForm().valid()).toBe(true);
  });
});
