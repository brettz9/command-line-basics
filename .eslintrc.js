module.exports = {
  extends: ["ash-nazg/sauron-node", "plugin:node/recommended-script"],
  env: {
    node: true,
    browser: true
  },
  settings: {
      polyfills: [
        "Object.entries",
        "Promise",
        "Promise.all"
      ]
  },
  overrides: [
    {
      files: ["*.md"],
      globals: {
        path: true,
        defaultsToAutoDetectBoolean: true
      },
      rules: {
        strict: 0,
        'node/shebang': 0,
        'node/no-missing-require': 0,
        'no-process-exit': 0,
        'unicorn/no-process-exit': 0
      }
    }
  ],
  rules: {
    "import/no-commonjs": 0,
    "node/exports-style": 0,
    "no-console": 0
  }
};
