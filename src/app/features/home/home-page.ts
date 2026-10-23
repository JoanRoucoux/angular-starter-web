import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { USERS_PATHS } from '@features/users/contract/users-paths';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly usersPaths = USERS_PATHS;
}
