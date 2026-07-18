/** @type {import("prettier").Config} */
export default {
  bracketSameLine: true,
  printWidth: 120,
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '^@angular/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@core/(.*)$',
    '^@features/(.*)$',
    '^@shared/(.*)$',
    '^@environments/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular',
      },
    },
  ],
};
