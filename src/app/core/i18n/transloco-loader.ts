import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  #httpClient = inject(HttpClient);

  getTranslation(lang: string): Observable<Translation> {
    return this.#httpClient.get<Translation>(`/i18n/${lang}.json`);
  }
}
