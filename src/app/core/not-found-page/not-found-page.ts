import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './not-found-page.html',
})
export class NotFoundPage {}
