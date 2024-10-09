// @ts-check

import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import react from '@eslint-react/eslint-plugin'
import tailwindcss from 'eslint-plugin-tailwindcss'
import checkCnClasses from './tools/eslint-rules/check-cn-classes.js'
import importX from 'eslint-plugin-import-x'

export default tseslint.config({
  files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
  ignores: ['**/*.{config,test}.{mjs,cjs,js,jsx,ts,tsx}', '.*.mjs'],
  settings: {
    ...react.configs.recommended.settings,
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    ...react.configs.recommended.plugins,
    prettier,
    tailwindcss,
    'check-cn-classes': checkCnClasses,
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

    // TailwindCSS rules
    'tailwindcss/no-custom-classname': [
      'error',
      {
        config: './tailwind.config.mjs',
        prependCustomPrefix: 'in--', // Enforces a prefix for custom classnames
      },
    ],
    'check-cn-classes/check-cn-classes': [
      'error',
      {
        prependCustomPrefix: 'in--', // Enforces the required prefix for custom class names
      },
    ],
  },
})
