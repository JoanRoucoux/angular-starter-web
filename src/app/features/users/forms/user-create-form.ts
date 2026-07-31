import { type Schema, email, required, schema } from '@angular/forms/signals';

import type { UserCreation } from '@core/api/angularStarterWebAPI.schemas';

// A factory so each page instance gets its own model object.
export const initialUserCreation = (): UserCreation => ({
  firstName: '',
  lastName: '',
  email: '',
});

export const userCreationSchema: Schema<UserCreation> = schema((user) => {
  required(user.firstName);
  required(user.lastName);
  required(user.email);
  email(user.email);
});
