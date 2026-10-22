# Generator notes

Starter-only maintainer notes. The generator deletes `.generator/`, so none of this ships in a generated app.

New applications are scaffolded from this starter by [starter-generator](https://github.com/JoanRoucoux/starter-generator), a generic engine: everything starter-specific lives **here**, in [generator.config.json](../generator.config.json) (files removed from generated apps, renames, install commands; full spec in the generator's README) and `.generator/templates/` (scaffold files rendered with `{{token}}` content placeholders and `__feature__` path placeholders).

Keep them in sync with the starter:

- `.generator/templates/src/app/shared/testing/transloco-testing.ts` mirrors [src/app/shared/testing/transloco-testing.ts](../src/app/shared/testing/transloco-testing.ts) with the demo scopes swapped for `{{feature}}`: when one changes, change the other.
- `.generator/templates/e2e/fixtures/accessibility.ts` is a verbatim copy of [e2e/fixtures/accessibility.ts](../e2e/fixtures/accessibility.ts): same rule.
- The scaffold templates (feature page, routes, i18n files, e2e spec) follow the conventions of AGENTS.md: when a convention changes, re-check the templates.
- Template-only content (demo features, community files, release tooling) must be listed in the manifest's `remove`; new root-level files that should not ship in generated apps must be added there.
- Templates contain tokens and are not valid syntax: `.generator/templates/` stays excluded in [.prettierignore](../.prettierignore) and the ESLint `globalIgnores`.
- [generator-check.yml](../.github/workflows/generator-check.yml) generates an app from the working tree and runs its quality gates: it fails when the manifest or templates drift. It is starter-only: listed in the manifest's `remove` so generated apps don't inherit a self-check that fails outside the starter (no `generator.config.json` left to generate from).
- The app title lives in `src/index.html` and in `APP_TITLE` (`core/i18n/title-strategy.ts`, with its spec): the manifest replaces both, so a new place that spells "Angular Starter Web" must be covered by a `replace` or `replaceAll` entry.
- The `.dockerignore`, `.prettierignore` and ESLint `globalIgnores` entries naming `.generator` are stripped by optional `replace` entries: keep their text in sync with the manifest.
- `{{title}}` is raw: code, JSON and HTML contexts use the escaped tokens (`{{titleJs}}`, `{{titleJson}}`, `{{titleHtml}}`). The `jsonPatch` values are serialized by the engine, so they take the raw `{{title}}`.
