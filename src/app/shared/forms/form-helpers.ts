import type { FieldTree } from '@angular/forms/signals';

export const showError = (field: FieldTree<string>): boolean => field().touched() && field().invalid();

export const hasRequiredError = (field: FieldTree<string>): boolean =>
  field()
    .errors()
    .some((error) => error.kind === 'required');
