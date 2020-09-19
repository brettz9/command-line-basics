# command-line-basics

Wraps the basic command-line functionality to your package.

It is probably easiest to see it in an example:

1. [Binary file](https://github.com/brettz9/license-badger/blob/master/bin/index.js#LC1)
2. [The option definitions](https://github.com/brettz9/license-badger/blob/master/src/optionDefinitions.js) (this file defines the schema and format for the CLI arguments; note: it is not necessary to export the chalk templates assuming you even need to use them at all).
3. [The main app](https://github.com/brettz9/license-badger/blob/3799384c3e0ba5651b4b2031a32042c573e8db3f/src/index.js#L118) which receives the command line arguments ready for use.

Performs the following:

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
4. All of `sections` will be passed to `command-line-usage`.

## Install

```sh
npm i -P command-line-basics
```

## Simple usage

After adding your binary file to `package.json`, e.g.,

```json
{
  "bin": {
    "myCliApp": "./bin/index.js"
  }
}
```

...and optionally making the script executable, as with
`chmod 0755 ./bin/index.js`, then add the following to that file:

```js
#!/usr/bin/env node
'use strict';

const {cliBasics} = require('command-line-basics');

// Your main programmatic code
const mainScript = require('../src/index.js');

// Point to a file with a `definitions` and `sections` export (or
//   JSON properties)
const optionDefinitions = cliBasics(
  './src/optionDefinitions.js'
);
if (!optionDefinitions) { // cliBasics handled
  process.exit();
}
// Use `optionDefinitions` (which is just the result of running
//  `command-line-args` on the `definitions` from your
//  `optionDefinitions.js` file
mainScript(optionDefinitions);
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
  async notifierCallback (notifier) {
    // Do something with `notifier` instance: https://github.com/yeoman/update-notifier
    const {
      latest, current,
      name,
      type // `latest`, `major`, `minor`, `patch`, `prerelease`, `build`
    } = await notifier.fetchInfo();

    console.log('Versions', latest, current);
    console.log('Package name', name);
    console.log('Current update type', type);
  },
  options: {
    packageJsonPath: path.join(process.cwd(), 'package.json'),
    autoAddVersion: true,
    autoAddHelp: true,
    autoAddHeader: true,
    autoAddOptionsHeader: true,
    autoAddContent: true,
    commandLineArgsOptions: {
      // See https://github.com/75lb/command-line-args/blob/master/doc/API.md
    },
    updateNotifierOptions: {
      // Options besides `pkg`
      updateCheckInterval: 1000 * 60 * 60 * 24,
      shouldNotifyInNpmScript: false,
      distTag: 'latest' // https://docs.npmjs.com/adding-dist-tags-to-packages
    },
    // May also set this to `false` to avoid calling `notify` of
    //  `update-notifier`
    updateNotifierNotifyOptions: {
      defer: false, // Our default differs from that of `update-notifier` here
      message: '',
      isGlobal: defaultsToAutoDetectBoolean,
      boxenOptions: {
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

## See also

- [command-line-args](https://github.com/75lb/command-line-args)
- [command-line-usage](https://github.com/75lb/command-line-usage/)
- [command-line-publish](https://github.com/brettz9/command-line-publish)

## To-dos

1. Utility for main files to create a file retrieval/writing function (for
    conversions)
1. Auto-convert JSON Schema into option defintion structures with jsdoc (and
    the converted JSON Schema) enhanced to add CLI properties,
    e.g., any alias (`@cli-alias {file} f`) and possibly its `typeLabel`.
    Default should be deducible.
