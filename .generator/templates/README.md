# {{projectName}}

{{title}} — Angular application generated from [angular-starter-web](https://github.com/JoanRoucoux/angular-starter-web) v{{starterVersion}}.

## Getting started

```bash
pnpm install    # installs dependencies and generates the API clients (postinstall)
pnpm start      # dev server on http://localhost:4200
```

Calls to `/api` are proxied to `http://localhost:8080` by the dev proxy ([proxy.conf.json](proxy.conf.json)): adjust the target to your backend.

## Scripts

| Script                   | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `pnpm start`             | Dev server (with API proxy)                          |
| `pnpm run build`         | Production build into `dist/`                        |
| `pnpm test`              | Unit tests (Vitest)                                  |
| `pnpm run test:coverage` | Unit tests with coverage report and thresholds       |
| `pnpm run e2e`           | End-to-end tests (Playwright)                        |
| `pnpm run lint`          | Lint (ESLint, includes Sheriff module boundaries)    |
| `pnpm run format`        | Format the whole project (Prettier)                  |
| `pnpm run generate:api`  | Regenerates clients and models from the OpenAPI spec |

## Next steps

- Make sure `openapi/openapi.yaml` is your real backend contract (replace the placeholder if needed), then run `pnpm run generate:api`.
- Build your pages in `src/app/features/{{feature}}/`: one folder per page under `pages/`, data services wrapping the generated client under `data/`, forms under `forms/`.
- Adjust the dev proxy target in [proxy.conf.json](proxy.conf.json).

See [AGENTS.md](AGENTS.md) for the architecture, conventions and testing guidelines inherited from the starter.
