import { SheriffConfig } from '@softarc/sheriff-core';

/**
 * Enforces the module boundaries documented in the README:
 * root → everything, features → core/shared, core → shared, shared → nothing.
 * Features are isolated from each other; cross-feature code belongs in core or shared.
 *
 * Modules are barrel-less: files are importable directly (no index.ts needed);
 * put files a module wants to keep private in an `internal/` subdirectory.
 */
export const config: SheriffConfig = {
  entryFile: 'src/main.ts',
  enableBarrelLess: true,
  modules: {
    'src/app/core': 'core',
    'src/app/features/<feature>': 'feature:<feature>',
    'src/app/shared': 'shared',
    'src/environments': 'env',
  },
  depRules: {
    root: ['core', 'feature:*', 'shared', 'env'],
    'feature:*': ['core', 'shared', 'env'],
    core: ['shared', 'env'],
    shared: ['env'],
    env: [],
  },
};
