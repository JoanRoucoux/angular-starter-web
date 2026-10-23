import { SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  entryFile: 'src/main.ts',
  enableBarrelLess: true,
  modules: {
    'src/app/core': 'core',
    'src/app/features/<feature>': 'feature:<feature>',
    'src/app/features/<feature>/contract': 'contract:<feature>',
    'src/app/shared': 'shared',
    'src/environments': 'env',
  },
  depRules: {
    root: ['core', 'feature:*', 'contract:*', 'shared', 'env'],
    'feature:*': ['core', 'contract:*', 'shared', 'env'],
    'contract:*': [],
    core: ['contract:*', 'shared', 'env'],
    shared: ['env'],
    env: [],
  },
};
