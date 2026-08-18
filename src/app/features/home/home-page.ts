import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './home-page.html',
})
export class HomePage {}
