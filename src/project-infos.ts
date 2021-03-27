import isNil from 'lodash/isNil';
import get from 'lodash/get';
import has from 'lodash/has';
import ora from 'ora';
import {execSync} from 'child_process';


import utils, {PackageJson, PkgJson} from "./utils";


const GITHUB_URL = 'https://github.com/'

/**
 * Clean repository url by removing '.git' and 'git+'
 *
 * @param {string} reposUrl
 */
const cleanReposUrl = (reposUrl: string) =>
  reposUrl
    .replace('\n', '')
    .replace('git+', '')
    .replace('.git', '')

/**
 * Get repository url from pakage json
 *
 * @param {Object} reposUrl
 */
const getReposUrlFromPackageJson = async (packageJson: PkgJson) => {
  const reposUrl = get(packageJson, 'repository.url', undefined)
  return isNil(reposUrl) ? undefined : cleanReposUrl(reposUrl)
}

/**
 * Get repository url from git
 */
const getReposUrlFromGit = () => {
  try {
    const stdoutBuffer = execSync('git config --get remote.origin.url')
    const stdoutString = stdoutBuffer.toString()
    return cleanReposUrl(stdoutString)
  } catch (err) {
    return undefined
  }
}

/**
 * Get repository url from package.json or git
 *
 * @param {Object} packageJson
 */
const getReposUrl = async (packageJson: PkgJson) =>
  (await getReposUrlFromPackageJson(packageJson)) || getReposUrlFromGit()

/**
 * Get repository issues url from package.json or git
 *
 * @param {Object} packageJson
 */
const getReposIssuesUrl = async (packageJson: PkgJson) => {
  let reposIssuesUrl = get(packageJson, 'bugs.url', undefined)

  if (isNil(reposIssuesUrl)) {
    const reposUrl = await getReposUrl(packageJson)

    if (!isNil(reposUrl)) {
      reposIssuesUrl = `${reposUrl}/issues`
    }
  }

  return reposIssuesUrl
}

/**
 * Check if repository is a Github repository
 *
 * @param {string} repositoryUrl
 */
const isGithubRepository = (repositoryUrl: string) =>
  !isNil(repositoryUrl) && repositoryUrl.includes(GITHUB_URL)

/**
 * Get github username from repository url
 *
 * @param {string} repositoryUrl
 */
const getGithubUsernameFromRepositoryUrl = (repositoryUrl: string) =>
  repositoryUrl.replace(GITHUB_URL, '').split('/')[0]

/**
 * Get license url from github repository url
 *
 * @param {string} repositoryUrl
 */
const getLicenseUrlFromGithubRepositoryUrl = (repositoryUrl: string) =>
  `${repositoryUrl}/blob/master/LICENSE`

const getReadmeUrlFromGithubRepositoryUrl = (repositoryUrl: string) =>
  `${repositoryUrl}#readme`

const getContributingUrlFromRepositoryUrl = (repositoryUrl: string) =>
  `${repositoryUrl}/blob/master/CONTRIBUTING.md`

/**
 * Get project author name from package.json
 *
 * @param packageJson
 * @returns {string} authorName
 */
const getAuthorName = (packageJson: PkgJson) => {
  if (has(packageJson, 'author.name')) {
    return get(packageJson, 'author.name', undefined)
  }

  if (has(packageJson, 'author') && typeof packageJson.author === 'string') {
    return get(packageJson, 'author', undefined)
  }

  return undefined
}

/**
 * Get project informations from git and package.json
 */
const getProjectInfos = async () => {
  const spinner = ora('Gathering project infos').start()

  const packageJson = await utils.getPackageJson()

  const isJSProject = !!packageJson
  const packageManager = isJSProject
    ? utils.getPackageManagerFromLockFile()
    : undefined
  const name = utils.getProjectName(packageJson)
  const description = get(packageJson, 'description', undefined)
  const engines = get(packageJson, 'engines', undefined)
  const author = getAuthorName(packageJson)
  const version = get(packageJson, 'version', undefined)
  const licenseName = get(packageJson, 'license', undefined)
  const homepage = get(packageJson, 'homepage', undefined)
  const hasStartCommand = has(packageJson, 'scripts.start')
  const hasTestCommand = has(packageJson, 'scripts.test')
  const repositoryUrl = await getReposUrl(packageJson)
  const issuesUrl = await getReposIssuesUrl(packageJson)
  const isGithubRepos = isGithubRepository(repositoryUrl)
  const contributingUrl = repositoryUrl
    ? getContributingUrlFromRepositoryUrl(repositoryUrl)
    : undefined
  const documentationUrl = isGithubRepos
    ? getReadmeUrlFromGithubRepositoryUrl(repositoryUrl)
    : undefined
  const githubUsername = isGithubRepos
    ? getGithubUsernameFromRepositoryUrl(repositoryUrl)
    : undefined
  const authorWebsite = githubUsername
    ? await utils.getAuthorWebsiteFromGithubAPI(githubUsername)
    : undefined
  const licenseUrl = isGithubRepos
    ? getLicenseUrlFromGithubRepositoryUrl(repositoryUrl)
    : undefined

  spinner.succeed('Project infos gathered')

  const info: PkgJson = PackageJson.ForceCreateUnsafeFromInterface( {
    name,
    description,
    version,
    author: {
      name: author,
      url: authorWebsite
    },
    homepage,
    repositoryUrl,
    issuesUrl,
    contributingUrl,
    githubUsername,
    engines,
    license: licenseName,
    licenseUrl,
    documentationUrl,
    isGithubRepos,
    hasStartCommand,
    hasTestCommand,
    isJSProject,
    packageManager
  })
  return info
}


const infos = {
  cleanReposUrl,
  getReposUrlFromPackageJson,
  getReposUrlFromGit,
  getReposUrl,
  getReposIssuesUrl,
  isGithubRepository,
  getGithubUsernameFromRepositoryUrl,
  getLicenseUrlFromGithubRepositoryUrl,
  getReadmeUrlFromGithubRepositoryUrl,
  getContributingUrlFromRepositoryUrl,
  getProjectInfos
}

export default infos

