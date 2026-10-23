import { inject } from '@angular/core';
import { type CanMatchFn, RedirectCommand, Router } from '@angular/router';

import { catchError, map, of } from 'rxjs';

import { SessionStore } from '@core/session/session-store';

import { HOME_PATH } from '@features/home/contract/home-paths';

export const usersAccessGuard: CanMatchFn = () => {
  const router = inject(Router);
  const home = (): RedirectCommand => new RedirectCommand(router.parseUrl(HOME_PATH));

  return inject(SessionStore)
    .has('users:read')
    .pipe(
      map((allowed) => allowed || home()),
      catchError(() => of(home())),
    );
};
