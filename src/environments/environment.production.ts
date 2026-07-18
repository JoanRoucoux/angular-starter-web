/**
 * Production environment.
 * '/api' assumes the API is exposed on the same origin as the application,
 * e.g. behind a reverse proxy. Use an absolute URL otherwise.
 */
export const environment = {
  production: true,
  apiBaseUrl: '/api',
};
