// @ts-check

import react from '@eslint-react/eslint-plugin'
import importX from 'eslint-plugin-import-x'
import prettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
  ignores: [
    '**/*.{config,test}.{mjs,cjs,js,jsx,ts,tsx}',
    '.*.mjs',
    'happydom.ts',
  ],
  settings: {
    ...react.configs.recommended.settings,
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    ...react.configs.recommended.plugins,
    prettier,
    'import-x': importX,
  },

  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
  },
  rules: {
    // ImportX rules
    ...importX.configs.recommended.rules,
    'import-x/no-unresolved': 'off',
    'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],

    // Prettier rules
    'prettier/prettier': 'error',

    // React rules
    ...react.configs.recommended.rules,
    '@eslint-react/no-nested-components': 'off',
    '@eslint-react/no-children-map': 'off',
    '@eslint-react/no-clone-element': 'off',
    '@eslint-react/dom/no-missing-button-type': 'off',
    '@eslint-react/no-unstable-context-values': 'off',

    // TypeScript rules
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
})
