'use strict';

module.exports = {
  extends: ['ash-nazg/sauron-node-overrides'],
  env: {
    'shared-node-browser': true
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  settings: {
    polyfills: [
      'Object.entries',
      'Promise',
      'Promise.all',
      'URL'
    ]
  },
  overrides: [
    {
      files: ['*.md/*.js'],
      globals: {
        path: true,
        defaultsToAutoDetectBoolean: true
      },
      rules: {
        strict: 0,
        'node/shebang': 0,
        'unicorn/no-process-exit': 0
      }
    }
  ],
  rules: {
    'node/exports-style': 0,
    'no-console': 0
  }
};
