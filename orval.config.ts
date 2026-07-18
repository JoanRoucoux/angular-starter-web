import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './openapi/openapi.yaml',
    output: {
      mode: 'tags-split',
      target: './src/app/core/api',
      client: 'angular',
      baseUrl: '/api',
      formatter: 'prettier',
    },
  },
});
