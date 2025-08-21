# CHANGES for command-line-basics

## 3.0.0

BREAKING CHANGE:

Requires Node >= 20.11.0

- fix: supply of `options` to `autoAdd` in `cliOptions`
- chore: update deps, devDeps. and lint

## 2.0.1

- chore: update tsc `moduleResolution`
- chore: update devDeps.

## 2.0.0

- feat: TS typings
- chore: update `command-line-usage` and devDeps.

## 1.1.0

- chore: update from vulnerable `update-notifier`; update
    `command-line-args`/`command-line-usage`
- chore: update devDeps.

## 1.0.2

- npm: Ignore `pnpm-lock.yaml`
- npm: Update devDeps. and `command-line-args` (patch)

## 1.0.1

- Fix: Add missing devDep. `@babel/core`

## 1.0.0

- Breaking change: Switch to native ESM; require Node 14
- Breaking change: Switch `autoAdd` and `cliBasics` to async functions

## 0.8.0

- Enhancement: Add `commandLineArgsOptions` to options
- Maintenance: Add `.editorconfig`
- npm: Update devDeps. and `update-notifier` dep.

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
