'use strict';

module.exports = {
  extends: ['ash-nazg/sauron-node-script-overrides'],
  env: {
    'shared-node-browser': true
  },
  settings: {
    polyfills: [
      'Object.entries',
      'Promise',
      'Promise.all'
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
