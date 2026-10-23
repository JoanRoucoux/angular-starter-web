import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

import { HOME_PATHS } from '@features/home/contract/home-paths';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './not-found-page.html',
})
export class NotFoundPage {
  protected readonly homePaths = HOME_PATHS;
}
