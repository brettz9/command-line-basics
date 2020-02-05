# CHANGES for command-line-basics

## 0.7.0

- Update: Alter API per `update-notifier` breaking change

## 0.6.2

- Fix: Avoid need for `join` entirely

## 0.6.1

- Fix: Use path `resolve` instead of `join` for proper relative
   path resolution

## 0.6.0

- Enhancement: Auto-add `content` based on `pkg.description` and
  `Options` as `sections[1].header`.

## 0.5.3

- Fix: Avoid duplication, e.g., if `sections` is borrowing from `definitions`

## 0.5.2

- Fix: Ensure `cwd` gets passed on to `autoAdd` from `cliBasics`

## 0.5.1

- Fix: Ensure `cwd` gets passed on to `autoAdd` from `cliBasics`

## 0.5.0

- Enhancement (breaking): Add `autoAdd` method along with changing default
  export to `cliBasics` named export; move `packageJsonPath` to options for
  shorter API
- Enhancement: Add default-true option `autoAddHeader` to automatically add
    `header` to `sections[0]` if not present (based on the `name` in
    `package.json`).
- Fix: Ensure adding to `optionList` properly

## 0.4.1

- Fix: Avoid exiting upon update notification

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
