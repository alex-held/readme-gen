#!/usr/bin/env node

import yargs from "yargs";
import {noop} from "lodash";


import mainProcess from "./cli";

yargs
  .usage('Usage: $0 <command> [options]')
  .command('$0', 'Generate README.md', noop, args => {
    const { path: customTemplatePath, yes: useDefaultAnswers } = args
    mainProcess({ customTemplatePath, useDefaultAnswers })
  })
  .boolean('c')
  .alias('c','config')
  .describe('config', 'generates a config file')
  .string('p')
  .alias('p', 'path')
  .describe('path', 'Path to your own template')
  .boolean('yes')
  .alias('y', 'yes')
  .describe('yes', 'Use default values for all fields')
  .help()
  .alias('v', 'version')
  .epilog(
    'for more information, find our manual at https://github.com/kefranabg/readme-md-generator'
  )
  .parse()
