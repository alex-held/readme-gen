import loadJsonFile from 'load-json-file';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import boxen, {BorderStyle, Options} from 'boxen';
import path from 'path';
import getReposName from 'git-repo-name';
import fetch from 'node-fetch';
import fs from 'fs';
import {execSync} from 'child_process';

import {JsonValue} from 'type-fest';


// @ts-ignore
import escapeMarkdown from "markdown-escape";
import {ReadmeContext} from "./clean-context";

const END_MSG = `README.md was successfully generated.
Thanks for using readme-md-generator!`

const GITHUB_API_URL = 'https://api.github.com'

const BOXEN_CONFIG: Options = {
  padding: 1,
  margin: {top: 2, bottom: 3, left: 0, right: 0},
  borderColor: 'cyan',
  align: 'center',
  borderStyle: BorderStyle.Double
}

/**
 * Display end message
 */
const showEndMessage = () => {
  return process.stdout.write(boxen(END_MSG, BOXEN_CONFIG))
}

/**
 * Get package json name property
 *
 * @param {Object} packageJson
 */
const getPackageJsonName = (packageJson: PkgJson) => packageJson.name;


/**
 * Get git repository name
 *
 * @param {String} cwd
 */
const getGitRepositoryName = (cwd: string) => {
  try {
    return getReposName.sync({cwd})
    // eslint-disable-next-line no-empty
  } catch (err) {
    return undefined
  }
}

/**
 * Get project name
 */
const getProjectName = (packageJson: PkgJson) => {
  const cwd = process.cwd()

  return (
    getPackageJsonName(packageJson) ||
    getGitRepositoryName(cwd) ||
    path.basename(cwd)
  )
}


export interface PkgJson extends Map<string, any> {
  author?: string | {
    url?: string
    name?: string
    email?: string
  },
  name?: string
  desc?: string,
  version?: string,
  description?: string,
  homepage?: string,
  repositoryUrl?: string,
  issuesUrl?: string,
  contributingUrl?: string,
  githubUsername?: string,
  engines?: any,
  license?: string,
  licenseUrl?: string,
  documentationUrl?: string,
  isGithubRepos?: boolean,
  hasStartCommand?: boolean,
  hasTestCommand?: boolean,
  isJSProject?: boolean,
  packageManager?: string
}

export class PackageJson implements PkgJson {

  static ForceCreateUnsafeFromInterface(any: any): PackageJson {
    const pkgJson = new PackageJson(JSON.stringify(any))
    return pkgJson
  }

  constructor(jsonValue: JsonValue) {
    let json = JSON.stringify(jsonValue)
    let jMap: Map<string, any> = JSON.parse(json)
    jMap.forEach((value: any, key: string, map: Map<string, any>) => {
      this.map.set(key, value)
    })
  }

  private map: Map<string, any> = new Map()

  get author(): string | {name?: string, url?: string, email?: string} {
    return this.get('author')
  }

  set author( author: string | {name?: string, url?: string, email?: string}) {
    this.set('author', author)
  }

  get name(): string {
    return this.get('name')
  }

  set name(name) {
    this.set('name', name)
  }


  clear(): void {
    this.map.clear()
  }

  delete(key: string): boolean {
    return this.map.delete(key);
  }

  forEach(callbackfn: (value: any, key: string, map: Map<string, any>) => void, thisArg?: any): void {
    return this.map.forEach(callbackfn, thisArg)
  }

  get(key: string) {
    return this.map.get(key)
  }

  has(key: string): boolean {
    return this.map.has(key)
  }

  set(key: string, value: any): this {
    this.map.set(key, value)
    return this
  }

  get size(): number {
    return this.map.size
  }

  [Symbol.iterator](): IterableIterator<[string, any]> {
    return this.map[Symbol.iterator]()
  }

  entries(): IterableIterator<[string, any]> {
    return this.map.entries()
  }

  keys(): IterableIterator<string> {
    return this.map.keys()
  }

  values(): IterableIterator<any> {
    return this.map.values()
  }

  get [Symbol.toStringTag](): string {
    return this.map[Symbol.toStringTag]
  }
}

/**
 * Get package.json content
 */
const getPackageJson = async () => {
  try {
    const json = await loadJsonFile('package.json')
    const packageJson : PkgJson= new PackageJson(json)
    return packageJson
  } catch (err) {
    return Promise.reject(err)
  }
}

export declare type Quest = {
  type?: string,
  message?: string,
  name?: string,
  choices?: any[],
  default?: any,
  when?: (answersContext?: ReadmeContext) => boolean
}


/**
 * Get the default answer depending on the question type
 *
 * @param {Object} question
 */
const getDefaultAnswer = async (question: Quest, answersContext?: ReadmeContext) => {
  if (question.when && !question.when(answersContext)) return undefined

  switch (question.type) {
    case 'input':
      return typeof question.default === 'function'
        ? question.default(answersContext)
        : question.default || ''
    case 'checkbox':
      return question.choices
        .filter((choice) => !choice.checked)
        .map((choice) => choice.value)
    default:
      return undefined
  }
}

/**
 * Return true if the project is available on NPM, return false otherwise.
 *
 * @param projectName
 * @returns boolean
 */
const isProjectAvailableOnNpm = (projectName: string) => {
  try {
    execSync(`npm view ${projectName}`, {stdio: 'ignore'})
    return true
  } catch (err) {
    return false
  }
}

/**
 * Get default question's answers
 *
 * @param {Array} questions
 */
const getDefaultAnswers = (questions:  Quest[]) =>
  questions.reduce(async (answersContextProm: Promise<ReadmeContext>, question: Quest) => {
    const answersContext = await answersContextProm

    return {
      ...answersContext,
      [question.name]: await getDefaultAnswer(question, answersContext)
    }
  }, Promise.resolve({}))

/**
 * Clean social network username by removing the @ prefix and
 * escaping markdown characters
 *
 * @param input social network username input
 * @returns {*} escaped input without the prefix
 */
const cleanSocialNetworkUsername = (input: string) => {
  return escapeMarkdown(input.replace(/^@/, ''))
}

/**
 * Get author's website from Github API
 *
 * @param {string} githubUsername
 * @returns {string} authorWebsite
 */
const getAuthorWebsiteFromGithubAPI = async (githubUsername: string) => {
  try {
    const userData = await fetch(
      `${GITHUB_API_URL}/users/${githubUsername}`
    ).then(res => res.json())
    const authorWebsite = userData.blog
    return isNil(authorWebsite) || isEmpty(authorWebsite)
      ? undefined
      : authorWebsite
  } catch (err) {
    return undefined
  }
}

/**
 * Returns a boolean whether a file exists or not
 *
 * @param {String} filepath
 * @returns {Boolean}
 */
const doesFileExist = (filepath: string) => {
  try {
    return fs.existsSync(filepath)
  } catch (err) {
    return false
  }
}

/**
 * Returns the package manager from the lock file
 *
 * @returns {String} packageManger or undefined
 */
const getPackageManagerFromLockFile = () => {
  const packageLockExists = doesFileExist('package-lock.json')
  const yarnLockExists = doesFileExist('yarn.lock')

  if (packageLockExists && yarnLockExists) return undefined
  if (packageLockExists) return 'npm'
  if (yarnLockExists) return 'yarn'
  return undefined
}

const utils = {
  getPackageJson,
  showEndMessage,
  getProjectName,
  END_MSG,
  BOXEN_CONFIG,
  getDefaultAnswers,
  getDefaultAnswer,
  cleanSocialNetworkUsername,
  isProjectAvailableOnNpm,
  getAuthorWebsiteFromGithubAPI,
  getPackageManagerFromLockFile,
  doesFileExist
}

export default utils

module.exports = {
  utils,
  getPackageJson,
  showEndMessage,
  getProjectName,
  END_MSG,
  BOXEN_CONFIG,
  getDefaultAnswers,
  getDefaultAnswer,
  cleanSocialNetworkUsername,
  isProjectAvailableOnNpm,
  getAuthorWebsiteFromGithubAPI,
  getPackageManagerFromLockFile,
  doesFileExist
}
