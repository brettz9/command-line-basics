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
  rules: {
    "import/no-commonjs": 0,
    "node/exports-style": 0,
    "no-console": 0
  }
};
