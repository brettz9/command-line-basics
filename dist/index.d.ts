export type JSONValue = any;
export type PackageJsonPathOptions = {
    packageJsonPath?: string;
};
export type AutoAddOptions = {
    pkg?: JSONValue;
    autoAddVersion?: boolean;
    autoAddHelp?: boolean;
    autoAddHeader?: boolean;
    autoAddContent?: boolean;
    autoAddOptionsHeader?: boolean;
} & PackageJsonPathOptions;
export type OptionsPath = {
    optionsPath: string;
    options?: AutoAddOptions;
    cwd?: string;
    pkg?: JSONValue;
};
export type NotifierCallback = (notifier: import("update-notifier").UpdateNotifier) => void;
export type CliBasicsOptions = AutoAddOptions & {
    commandLineArgsOptions?: import("command-line-args").ParseOptions;
    updateNotifierOptions?: import("update-notifier").Settings;
    updateNotifierNotifyOptions?: import("update-notifier").NotifyOptions | false;
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
export function autoAdd(optionsPath: string | OptionsPath, options?: AutoAddOptions): Promise<{
    definitions: import("command-line-usage").OptionDefinition[];
    sections: import("command-line-usage").Section[];
}>;
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
export function cliBasics(optionsPath: string | ({
    optionsPath: string;
    options?: CliBasicsOptions;
    cwd?: string;
    notifierCallback?: NotifierCallback;
}), options?: CliBasicsOptions, notifierCallback?: NotifierCallback): Promise<import("command-line-args").CommandLineOptions | null>;
//# sourceMappingURL=index.d.ts.map