import {readFile} from 'fs/promises';
import {resolve} from 'path';

import updateNotifier from 'update-notifier';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

/**
 * @typedef {any} JSONValue
 */

/**
 * @typedef {{
 *   packageJsonPath?: string
* }} PackageJsonPathOptions
 */

/**
 * @param {PackageJsonPathOptions} options
 * @param {string} cwd
 * @returns {Promise<JSONValue>}
 */
const getPackageJson = async (options, cwd) => {
  let {packageJsonPath} = options;
  packageJsonPath = packageJsonPath
    ? resolve(cwd, packageJsonPath)
    : resolve(process.cwd(), 'package.json');
  return JSON.parse(
    // @ts-expect-error It's ok
    await readFile(packageJsonPath)
  );
};

/**
 * @typedef {{
 *   pkg?: JSONValue,
 *   autoAddVersion?: boolean,
 *   autoAddHelp?: boolean,
 *   autoAddHeader?: boolean,
 *   autoAddContent?: boolean,
 *   autoAddOptionsHeader?: boolean
 * } & PackageJsonPathOptions} AutoAddOptions
 */

/**
 * @typedef {{
 *   optionsPath: string,
 *   options?: AutoAddOptions,
 *   cwd?: string,
 *   pkg?: JSONValue
 * }} OptionsPath
 */

/**
 * @param {string|OptionsPath} optionsPath
 * @param {AutoAddOptions} [options]
 * @throws {TypeError}
 * @returns {Promise<{
 *   definitions: import('command-line-usage').OptionDefinition[],
 *   sections: import('command-line-usage').Section[]
 * }>}
 */
const autoAdd = async (optionsPath, options) => {
  if (!optionsPath) {
    throw new TypeError(`You must include an \`optionsPath\`.`);
  }
  let cwd;
  if (typeof optionsPath === 'object') {
    ({optionsPath, options, cwd} = optionsPath);
  }
  options = options || {};
  cwd = cwd || process.cwd();
  const {
    pkg = await getPackageJson(options, cwd)
  } = options;

  optionsPath = resolve(cwd, optionsPath);
  const {
    definitions: optionDefinitions, sections: cliSections
  } =
  // /* eslint-disable no-unsanitized/method -- User prompted */
    /**
     * @type {{
     *   definitions: import('command-line-usage').OptionDefinition[],
     *   sections: import('command-line-usage').Section[]
     * }}
     */ (await import(optionsPath));
    // /* eslint-enable no-unsanitized/method -- User prompted */

  if (options.autoAddVersion !== false && optionDefinitions.every(
    (def) => def.name !== 'version' && def.alias !== 'v'
  )) {
    const versionInfo = {name: 'version', type: Boolean, alias: 'v'};
    optionDefinitions.push(versionInfo);
    if (cliSections[1] && 'optionList' in cliSections[1] &&
      cliSections[1].optionList &&
      cliSections[1].optionList.every(
        (def) => def.name !== 'version' && def.alias !== 'v'
      )
    ) {
      cliSections[1].optionList.push(versionInfo);
    }
  }
  if (options.autoAddHelp !== false && optionDefinitions.every(
    (def) => def.name !== 'help' && def.alias !== 'h'
  )) {
    const helpInfo = {name: 'help', type: Boolean, alias: 'h'};
    optionDefinitions.push(helpInfo);
    if (cliSections[1] && 'optionList' in cliSections[1] &&
      cliSections[1].optionList &&
      cliSections[1].optionList.every(
        (def) => def.name !== 'help' && def.alias !== 'h'
      )
    ) {
      cliSections[1].optionList.push(helpInfo);
    }
  }
  if (cliSections[0]) {
    if (!cliSections[0].header && options.autoAddHeader !== false) {
      cliSections[0].header = pkg.name;
    }
    if (
      (!('content' in cliSections[0]) || !cliSections[0].content) &&
      options.autoAddContent !== false &&
      pkg.description
    ) {
      /** @type {import('command-line-usage').Content} */ (
        cliSections[0]
      ).content = pkg.description;
    }
  }

  if (cliSections[1] && !cliSections[1].header &&
    options.autoAddOptionsHeader !== false
  ) {
    cliSections[1].header = 'Options';
  }

  return {definitions: optionDefinitions, sections: cliSections};
};

/**
 * @callback NotifierCallback
 * @param {import('update-notifier').UpdateNotifier} notifier
 * @returns {void}
 */

/**
 * @typedef {AutoAddOptions & {
 *   commandLineArgsOptions?: import('command-line-args').ParseOptions
 *   updateNotifierOptions?: import('update-notifier').Settings,
 *   updateNotifierNotifyOptions?: import('update-notifier').NotifyOptions|false
 * }} CliBasicsOptions
 */

/**
 * @param {string|({
 *   optionsPath: string,
 *   options?: CliBasicsOptions,
 *   cwd?: string
 *   notifierCallback?: NotifierCallback
 * })} optionsPath
 * @param {CliBasicsOptions} [options]
 * @param {NotifierCallback} [notifierCallback]
 * @throws {TypeError}
 * @returns {Promise<import('command-line-args').CommandLineOptions|null>}
 */
const cliBasics = async (optionsPath, options, notifierCallback) => {
  if (!optionsPath) {
    throw new TypeError(`You must include an \`optionsPath\`.`);
  }
  let cwd;
  if (typeof optionsPath === 'object') {
    ({optionsPath, options, cwd, notifierCallback} = optionsPath);
  }
  options = options || {};
  cwd = cwd || process.cwd();
  const pkg = await getPackageJson(options, cwd);

  // check if a new version is available and print an update notification
  const notifier = updateNotifier({
    pkg, ...options.updateNotifierOptions
  });
  if (options.updateNotifierNotifyOptions !== false &&
    notifier.update && notifier.update.latest !== pkg.version
  ) {
    notifier.notify({
      defer: false, ...options.updateNotifierNotifyOptions
    });
  }
  if (notifierCallback) {
    notifierCallback(notifier);
  }

  const {
    definitions: optionDefinitions, sections: cliSections
  } = await autoAdd({optionsPath, cwd, options, pkg});

  const userOptions = commandLineArgs(
    optionDefinitions, options.commandLineArgsOptions
  );
  const {help, version} = userOptions;

  if (help) {
    const usage = commandLineUsage(cliSections);
    console.log(usage);
    return null;
  }
  if (version) {
    console.log(pkg.version);
    return null;
  }

  return userOptions;
};

export {autoAdd, cliBasics};
