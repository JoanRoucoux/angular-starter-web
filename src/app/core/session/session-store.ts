import { Injectable, inject } from '@angular/core';

import { type Observable, map, shareReplay } from 'rxjs';

import { SessionService } from '@core/api-client/session/session.service';

@Injectable({ providedIn: 'root' })
export class SessionStore {
  #sessionApiClient = inject(SessionService);

  #session = this.#sessionApiClient.getSession().pipe(shareReplay({ bufferSize: 1, refCount: false }));

  has(permission: string): Observable<boolean> {
    return this.#session.pipe(map((session) => session.permissions.includes(permission)));
  }
}
