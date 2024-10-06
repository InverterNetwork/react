// @ts-check

import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import react from '@eslint-react/eslint-plugin'

export default tseslint.config({
  files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
  ignores: ['**/*.{config,test}.{mjs,cjs,js,jsx,ts,tsx}', '.*.mjs'],
  settings: {
    ...react.configs.recommended.settings,
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    prettier,
    ...react.configs.recommended.plugins,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
  },
  rules: {
    ...react.configs.recommended.rules,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'error',
    '@eslint-react/no-nested-components': 'off',
    '@eslint-react/no-children-map': 'off',
    '@eslint-react/no-clone-element': 'off',
    '@eslint-react/dom/no-missing-button-type': 'off',
    '@eslint-react/no-unstable-context-values': 'off',
  },
})
