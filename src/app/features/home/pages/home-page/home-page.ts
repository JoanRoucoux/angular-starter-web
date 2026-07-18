import { Component } from '@angular/core';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-home-page',
  imports: [TranslocoPipe],
  templateUrl: './home-page.html',
})
export class HomePage {}
