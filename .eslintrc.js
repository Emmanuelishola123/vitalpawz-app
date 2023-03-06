/* eslint-disable no-process-env */
module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'unused-imports'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      excludedFiles: ['*.test.js'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-restricted-imports': 'off'
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '[^_]',
            argsIgnorePattern: '[^_]',
          },
        ],
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
  rules: {
    // I suggest you add those two rules:
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-async-promise-executor': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '.*',
          '@mui/*/*/*/*',
          '!@mui/material/test-utils/*',
          '!@mui/material/theme/*',
          '!@mui/material/styles/*',
        ],
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          'String': {
            message: 'Use string instead',
            fixWith: 'string',
          },
          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '[^_]',
        argsIgnorePattern: '^_',
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'no-console': (process.env.NODE_ENV || 'development') === 'development' ? 'warn' : 'error',
    'no-debugger': (process.env.NODE_ENV || 'development') === 'development' ? 'warn' : 'error',
    'no-process-env': 'error',
  },
  ignorePatterns: ['*.js', 'next.config.js', 'public/', 'assets/', 'stylesheets/', 'node_modules/'],
};
