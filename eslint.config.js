//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    ignores: ['src/paraglide/**', 'src/routeTree.gen.ts'],
  },
]
