import ashNazg from 'eslint-config-ash-nazg';

export default [
  ...ashNazg(['sauron', 'node']),
  {
    files: ['*.md/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        path: true,
        defaultsToAutoDetectBoolean: true
      }
    },
    rules: {
      'n/hashbang': 0,
      'unicorn/no-process-exit': 0,
      'import/default': 0
      // 'import/no-unresolved': ['error', {
      //   ignore: ['command-line-basics', '../src/index.js']
      // }]
    }
  },
  {
    rules: {
      'node/exports-style': 0,
      'no-console': 0
    }
  }
];
