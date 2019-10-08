# command-line-basics

Wraps the following basic command-line functionality to your package:

1. Utilizes `update-notifier` to notify the user of any updates of your
    package.
2. By default, will automatically add `--version`/`-v` and `--help`/`-h`
    flags to the options defined in your targeted file's `definitions`
    (processed by `command-line-args`) and `sections[1].optionList` (processed
    by `command-line-usage`). When your users call `--help`, these two flags
    will be shown there. When your users call `--version`, it will output
    the current `version` of your `package.json`).
3. By default, will automatically add `header` to `sections[0]` if not
    present (based on the `name` in `package.json`).

## Install

```sh
npm i -P command-line-basics
```

## Simple usage

```js
const {cliBasics} = require('command-line-basics');

// Point to a file with a `definitions` and `sections` export (or
//   JSON properties)
const optionDefinitions = cliBasics(
  path.join(__dirname, '../src/optionDefinitions.js')
);
if (!optionDefinitions) { // cliBasics handled
  process.exit();
}
// Use `definitions` (which is just the result of running `command-line-args`
//  on the `definitions` from your `optionDefinitions.js` file
```

## Advanced usage

Except for `optionsPath`, the example indicates the **defaults**:

```js
const {cliBasics} = require('command-line-basics');

const options = cliBasics({
  // Point to a file with a `definitions` and `sections` export (or
  //   JSON properties)
  optionsPath: path.join(process.cwd(), './src/optionDefinitions.js'),
  // `cwd` is an alternative to joining (for `optionsPath` and for an
  //  explicit `packageJsonPath`; has no effect on `package.json` if
  //  relying on the default)
  cwd: __dirname,
  options: {
    packageJsonPath: path.join(process.cwd(), 'package.json'),
    autoAddVersion: true,
    autoAddHelp: true,
    autoAddHeader: true,
    updateNotifierOptions: {
      // Options besides `pkg`
      updateCheckInterval: 1000 * 60 * 60 * 24,
      callback (/* error, update */) {
        // Non-cached, synchronous handling (not recommended)
      },
      shouldNotifyInNpmScript: false,
      distTag: 'latest' // https://docs.npmjs.com/adding-dist-tags-to-packages
    },
    // May also set this to `false` to avoid calling `notify` of
    //  `update-notifier`
    updateNotifierNotifyOptions: {
      defer: false, // Our default differs from that of `update-notifier` here
      message: '',
      isGlobal: defaultsToAutoDetectBoolean,
      boxenOpts: {
        // Also `dimBorder`, `float`, and `backgroundColor`
        // See https://github.com/sindresorhus/boxen
        padding: 1, margin: 1, align: 'center',
        borderColor: 'yellow', borderStyle: 'round'
      }
    }
  }
});
if (!options) { // cliBasics handled
  process.exit();
}
// Use `definitions` (which is just the result of running `command-line-args`
//  on the `definitions` from your `optionDefinitions.js` file
```

There is also exported an `autoAdd` method which takes the same arguments
and returns the (potentially `help`/`version` and `header` enhanced)
`definitions` and `sections`. It is also used internally by `cliBasics`.
