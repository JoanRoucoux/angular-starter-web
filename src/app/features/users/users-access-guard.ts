import { inject } from '@angular/core';
import { type CanMatchFn, RedirectCommand, Router } from '@angular/router';

import { catchError, map, of } from 'rxjs';

import { SessionStore } from '@core/session/session-store';

export const usersAccessGuard: CanMatchFn = () => {
  const router = inject(Router);
  const home = (): RedirectCommand => new RedirectCommand(router.parseUrl('/'));

  return inject(SessionStore)
    .has('users:read')
    .pipe(
      map((allowed) => allowed || home()),
      // Fail closed and visibly: a cancelled navigation would leave the user on a dead link.
      catchError(() => of(home())),
    );
};
