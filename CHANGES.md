# CHANGES for command-line-basics

## 0.4.0

- Fix: Ensure `cwd` is accessible (from object options)
- Enhancement: Apply `cwd` to an explicit relative
  `packageJsonPath` (but not otherwise)

## 0.3.0

- Enhancement (breaking): Avoid applying `cwd` to `package.json`.

## 0.2.0

- Enhancement (breaking): Apply `cwd` option (defaulting to `process.cwd()`) to
  `package.json` and `optionsPath`.
- Enhancement: Throw specific error if no `optionsPath` provided.

## 0.1.0

- Initial version
