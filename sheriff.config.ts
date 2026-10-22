import { SheriffConfig } from '@softarc/sheriff-core';

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
