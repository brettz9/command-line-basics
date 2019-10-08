'use strict';

const {join} = require('path');

const updateNotifier = require('update-notifier');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

module.exports = function (optionsPath, packageJsonPath, options) {
  if (optionsPath && typeof optionsPath === 'object') {
    ({optionsPath, packageJsonPath, options} = optionsPath);
  }
  if (!packageJsonPath) {
    packageJsonPath = join(process.cwd(), 'package.json');
  }
  options = options || {};

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const pkg = require(packageJsonPath);
  const {
    definitions: optionDefinitions, sections: cliSections
  // eslint-disable-next-line global-require, import/no-dynamic-require
  } = require(optionsPath);

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
    return null;
  }

  if (options.autoAddVersion !== false && optionDefinitions.every(
    (def) => def.name !== 'version' && def.alias !== 'v'
  )) {
    const versionInfo = {name: 'version', type: Boolean, alias: 'v'};
    optionDefinitions.push(versionInfo);
    cliSections.optionList.push(versionInfo);
  }
  if (options.autoAddHelp !== false && optionDefinitions.every(
    (def) => def.name !== 'help' && def.alias !== 'h'
  )) {
    const helpInfo = {name: 'help', type: Boolean, alias: 'h'};
    optionDefinitions.push(helpInfo);
    cliSections.optionList.push(helpInfo);
  }

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
