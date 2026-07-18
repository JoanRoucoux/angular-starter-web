import { HttpClient, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { throwError } from 'rxjs';
import { vi } from 'vitest';

import { LoggerService } from '@core/logger/logger';

import { errorHandlerInterceptor } from './error-handler-interceptor';

describe('errorHandlerInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([errorHandlerInterceptor])), provideHttpClientTesting()],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
    logger = TestBed.inject(LoggerService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should log an error for a failed API request', () => {
    const errorSpy = vi.spyOn(logger, 'error');

    httpClient.get('/api/users').subscribe({ error: () => undefined });
    httpTesting.expectOne('/api/users').flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(errorSpy).toHaveBeenCalledWith('HttpInterceptor', 'API error on GET /api/users', expect.anything());
  });

  it('should not log errors for requests outside the API base URL', () => {
    const errorSpy = vi.spyOn(logger, 'error');

    httpClient.get('https://external.example.com/data').subscribe({ error: () => undefined });
    httpTesting.expectOne('https://external.example.com/data').flush(null, { status: 500, statusText: 'Server Error' });

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should ignore errors that are not HTTP error responses', () => {
    const errorSpy = vi.spyOn(logger, 'error');
    const request = new HttpRequest('GET', '/api/users');
    const next = (): ReturnType<typeof errorHandlerInterceptor> => throwError(() => new Error('network down'));

    TestBed.runInInjectionContext(() => errorHandlerInterceptor(request, next)).subscribe({ error: () => undefined });

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
