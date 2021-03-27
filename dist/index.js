#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const lodash_1 = require("lodash");
const cli_1 = tslib_1.__importDefault(require("./cli"));
yargs_1.default
    .usage('Usage: $0 <command> [options]')
    .command('$0', 'Generate README.md', lodash_1.noop, args => {
    const { path: customTemplatePath, yes: useDefaultAnswers } = args;
    cli_1.default({ customTemplatePath, useDefaultAnswers });
})
    .boolean('c')
    .alias('c', 'config')
    .describe('config', 'generates a config file')
    .string('p')
    .alias('p', 'path')
    .describe('path', 'Path to your own template')
    .boolean('yes')
    .alias('y', 'yes')
    .describe('yes', 'Use default values for all fields')
    .help()
    .alias('v', 'version')
    .epilog('for more information, find our manual at https://github.com/kefranabg/readme-md-generator')
    .parse();
//# sourceMappingURL=index.js.map