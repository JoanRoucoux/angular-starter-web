import { Injectable, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { UsersService } from '@core/api-client/users/users.service';

@Injectable()
export class UserDetailStore {
  #usersApiClient = inject(UsersService);
  #route = inject(ActivatedRoute);

  readonly userId = toSignal(this.#route.paramMap.pipe(map((params) => Number(params.get('userId')))));

  readonly user = rxResource({
    params: this.userId,
    stream: ({ params }) => this.#usersApiClient.getUser(params),
  });
}
