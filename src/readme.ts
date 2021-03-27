import ejs from "ejs";
import ora from "ora";
import {promisify} from "util";

import {getYear} from "date-fns";

import fs from "fs";
import {isNil, unescape} from "lodash";


import chooseTemplate from "./choose-template";
import askOverwriteReadme from "./ask-overwrite";
import {ReadmeContext} from "./clean-context";

const README_PATH = 'README.md'

/**
 * Create readme file from the given readmeContent
 *
 * @param {string} readmeContent
 */
const writeReadme = async (readmeContent: string) => {
  const spinner = ora('Creating README').start()

  try {
    await promisify(fs.writeFile)(README_PATH, unescape(readmeContent))
    spinner.succeed('README created')
  } catch (err) {
    spinner.fail('README creation fail')
    throw err
  }
}

/**
 * Get README template content from the given templatePath
 *
 * @param {string} templatePath
 */
const getReadmeTemplate = async (templatePath: string) => {
  const spinner = ora('Loading README template').start()

  try {
    const template = await promisify(fs.readFile)(templatePath, 'utf8')
    spinner.succeed('README template loaded')
    return template
  } catch (err) {
    spinner.fail('README template loading fail')
    throw err
  }
}

/**
 * Build README content with the given context and templatePath
 *
 * @param {Object} context
 * @param {string} templatePath
 */
const buildReadmeContent = async (context: ReadmeContext, templatePath: string) => {
  const currentYear = getYear(new Date())
  const template = await getReadmeTemplate(templatePath)

  return ejs.render(template, {
    filename: templatePath,
    currentYear,
    ...context
  })
}

/**
 * Validate template path
 *
 * @param {string} templatePath
 */
const validateReadmeTemplatePath = (templatePath: string) => {
  const spinner = ora('Resolving README template path').start()

  try {
    fs.lstatSync(templatePath).isFile()
  } catch (err) {
    spinner.fail(`The template path '${templatePath}' is not valid.`)
    throw err
  }

  spinner.succeed('README template path resolved')
}

/**
 * Get readme template path
 * (either a custom template, or a template that user will choose from prompt)
 *
 * @param {String} customTemplate
 */
const getReadmeTemplatePath = async (customTemplate: string, useDefaultAnswers: boolean) => {
  const templatePath = isNil(customTemplate)
    ? await chooseTemplate(useDefaultAnswers)
    : customTemplate

  validateReadmeTemplatePath(templatePath)

  return templatePath
}

/**
 * Check if readme generator can overwrite the existed readme
 */
const checkOverwriteReadme: () => Promise<boolean> = () => {
  if (!fs.existsSync(README_PATH) || askOverwriteReadme.askOverwriteFn())
    return Promise.resolve(true)
  else
    return Promise.resolve(false)
}


const readme = {
  README_PATH,
  writeReadme,
  buildReadmeContent,
  getReadmeTemplatePath,
  checkOverwriteReadme,
}

export default readme



