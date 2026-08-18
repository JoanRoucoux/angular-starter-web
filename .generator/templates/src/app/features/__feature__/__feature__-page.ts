import { Component } from '@angular/core';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-{{feature}}-page',
  imports: [TranslocoPipe],
  templateUrl: './{{feature}}-page.html',
})
export class {{featurePascal}}Page {}
