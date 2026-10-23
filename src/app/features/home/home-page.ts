import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { USERS_PATH } from '@features/users/contract/users-paths';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly usersPath = USERS_PATH;
}
