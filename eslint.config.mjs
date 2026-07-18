// @ts-check
import eslint from '@eslint/js';
import sheriff from '@softarc/eslint-plugin-sheriff';
import angular from 'angular-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'coverage', '.angular', 'src/app/core/api']),
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      prettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // Angular
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/prefer-standalone': 'warn',
      // TypeScript
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      // General
      'max-lines': ['error', 400],
      complexity: ['error', 20],
      eqeqeq: 'error',
      'no-console': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
  {
    // Module boundaries (core/features/shared) defined in sheriff.config.ts.
    files: ['**/*.ts'],
    extends: [sheriff.configs.all],
  },
  {
    // Only the centralized logger and the bootstrap entry point (no DI available yet) may call the console directly.
    files: ['src/app/core/logger/logger.ts', 'src/main.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
    },
  },
]);
