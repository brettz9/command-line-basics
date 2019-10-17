'use strict';

const {join, isAbsolute} = require('path');

const updateNotifier = require('update-notifier');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const getPackageJson = (options, cwd) => {
  let {packageJsonPath} = options;
  if (!packageJsonPath) {
    // Don't use the user `cwd` by default for `package.json`
    packageJsonPath = join(process.cwd(), 'package.json');
  } else if (!isAbsolute(packageJsonPath)) {
    packageJsonPath = join(cwd, packageJsonPath);
  }
  // eslint-disable-next-line global-require, import/no-dynamic-require
  return require(packageJsonPath);
};

const autoAdd = exports.autoAdd = function (optionsPath, options) {
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
    pkg = getPackageJson(options, cwd)
  } = options;

  optionsPath = join(cwd, optionsPath);
  const {
    definitions: optionDefinitions, sections: cliSections
  // eslint-disable-next-line global-require, import/no-dynamic-require
  } = require(optionsPath);

  if (options.autoAddVersion !== false && optionDefinitions.every(
    (def) => def.name !== 'version' && def.alias !== 'v'
  )) {
    const versionInfo = {name: 'version', type: Boolean, alias: 'v'};
    optionDefinitions.push(versionInfo);
    if (cliSections[1] && cliSections[1].optionList &&
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
    if (cliSections[1] && cliSections[1].optionList &&
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
    if (!cliSections[0].content && options.autoAddContent !== false &&
      pkg.description
    ) {
      cliSections[0].content = pkg.description;
    }
  }

  if (cliSections[1] && !cliSections[1].header &&
    options.autoAddOptionsHeader !== false
  ) {
    cliSections[1].header = 'Options';
  }

  return {definitions: optionDefinitions, sections: cliSections};
};

exports.cliBasics = function (optionsPath, options) {
  if (!optionsPath) {
    throw new TypeError(`You must include an \`optionsPath\`.`);
  }
  let cwd;
  if (typeof optionsPath === 'object') {
    ({optionsPath, options, cwd} = optionsPath);
  }
  options = options || {};
  cwd = cwd || process.cwd();
  const pkg = getPackageJson(options, cwd);

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

  const {
    definitions: optionDefinitions, sections: cliSections
  } = autoAdd({optionsPath, cwd, ...options, pkg});

  const userOptions = commandLineArgs(optionDefinitions);
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
