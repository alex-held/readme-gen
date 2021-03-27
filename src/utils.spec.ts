import path from 'path';
import {isNil} from 'lodash';

import utils, {PackageJson, PkgJson, Quest} from './utils'
import {ReadmeContext} from './clean-context';

var fetch = require('node-fetch');
var boxen = require('boxen');
var loadJsonFile = require('load-json-file');
var getReposName = require('git-repo-name');
var fs = require('fs');
const realPathBasename = path.basename
const realGetReposNameSync = getReposName.sync

jest.mock('load-json-file')
jest.mock('git-repo-name')
jest.mock('boxen')
jest.mock('node-fetch')
jest.mock('fs')

describe('utils', () => {
  describe('getPackageJson', () => {
    const packageJsonContent = {
      name: 'readme-md-cli'
    }

    it('should return package.json content', async () => {
      loadJsonFile.mockReturnValueOnce(Promise.resolve(packageJsonContent))

      const result = await utils.getPackageJson()

      expect(result).toEqual(packageJsonContent)
    })

    it('should return undefined', async () => {
      loadJsonFile.mockImplementationOnce(() => {
        throw new Error('ERROR')
      })

      const result = await utils.getPackageJson()

      expect(result).toBeUndefined()
    })
  })

  describe('showEndMessage', () => {
    boxen.mockReturnValue(utils.END_MSG)

    it('should call boxen with correct parameters', () => {
      utils.showEndMessage()

      expect(boxen).toHaveBeenCalledTimes(1)
      expect(boxen).toHaveBeenCalledWith(utils.END_MSG, utils.BOXEN_CONFIG)
    })

    it('should call process.stdout.write with correct parameters', () => {
      process.stdout.write = jest.fn()

      utils.showEndMessage()

      expect(process.stdout.write).toHaveBeenCalledTimes(1)
      expect(process.stdout.write).toHaveBeenCalledWith(utils.END_MSG)
    })
  })

  describe('getProjectName', () => {
    const projectName = 'readme-md-generator'

    beforeEach(() => {
      path.basename = jest.fn(() => projectName)
      getReposName.sync = jest.fn()
    })

    afterEach(() => {
      path.basename = realPathBasename
      getReposName.sync = realGetReposNameSync
    })

    it('should return package.json name prop when defined', () => {
      const packageJson = PackageJson.ForceCreateUnsafeFromInterface({name: projectName})
      getReposName.sync.mockReturnValueOnce('readme-md-generator')

      const result = utils.getProjectName(packageJson)

      expect(result).toEqual(projectName)
      expect(getReposName.sync).not.toHaveBeenCalled()
      expect(path.basename).not.toHaveBeenCalled()
    })

    it('should return git repos when package.json it is not defined', () => {
      const packageJson: PkgJson = new PackageJson('')
      getReposName.sync.mockReturnValueOnce('readme-md-generator')

      const result = utils.getProjectName(packageJson)

      expect(result).toEqual(projectName)
      expect(getReposName.sync).toHaveBeenCalled()
      expect(path.basename).not.toHaveBeenCalled()
    })

    it('should return folder basename when package.json and git repos name is undefined', () => {
      const packageJson = new PackageJson('')
      getReposName.sync.mockImplementation(() => {
        throw new Error('error')
      })

      const result = utils.getProjectName(packageJson)

      expect(result).toEqual(projectName)
      expect(getReposName.sync).toHaveBeenCalled()
      expect(path.basename).toHaveBeenCalled()
    })
  })


  describe('getDefaultAnswer', () => {
    it('should handle input prompts correctly', async () => {
      const question: Quest = {type: 'input', default: 'default'}
      const result = await utils.getDefaultAnswer(question)
      expect(result).toEqual(question.default)
    })

    it('should handle choices prompts correctly', async () => {
      const value = {name: 'name', value: 'value'}
      const question: Quest = {
        type: 'checkbox',
        choices: [ value, {checked: false}]
      }
      const result = await utils.getDefaultAnswer(question)

      expect(result).toEqual([value])
    })

    it('should return empty string for non-defaulted fields', async () => {
      const question: Quest = {type: 'input'}
      const result = await utils.getDefaultAnswer(question)

      expect(result).toEqual('')
    })

    it('should return undefined for invalid types', async () => {
      const question: Quest = {type: 'invalid'}
      const result = await utils.getDefaultAnswer(question)

      expect(result).toEqual(undefined)
    })

    it('should return undefined if when function is defined and return false', async () => {
      const answersContext: ReadmeContext = {}
      const question: Quest = {
        type: 'input',
        when: ctx => !isNil(ctx.licenseName)
      }

      const result = await utils.getDefaultAnswer(question, answersContext)

      expect(result).toEqual(undefined)
    })

    describe('isProjectAvailableOnNpm', () => {
      it('should return true if project is available on npm', () => {
        const result = utils.isProjectAvailableOnNpm('readme-md-generator')

        expect(result).toBe(true)
      })

      it('should return false if project is not available on npm', () => {
        const result = utils.isProjectAvailableOnNpm('bento-starter')

        expect(result).toBe(false)
      })
    })

    it('should return correct value if when function is defined and return true', async () => {
      const answersContext: ReadmeContext = {licenseName: 'licenseName'}
      const question: Quest = {
        type: 'input',
        default: 'default',
        when: context => !isNil(context.licenseName)
      }

      const result = await utils.getDefaultAnswer(question, answersContext)

      expect(result).toEqual('default')
    })
  })

  describe('getDefaultAnswers', () => {
    it('should return default answers from questions', async () => {
      const questions: Quest[] = [
        {
          type: 'input',
          name: 'questionOne',
          default: 'answer 1'
        },
        {
          type: 'input',
          name: 'questionTwo',
          default: 'answer 2'
        }
      ]

      const result = await utils.getDefaultAnswers(questions)

      expect(result).toEqual({
        questionOne: 'answer 1',
        questionTwo: 'answer 2'
      })
    })
  })

  describe('cleanSocialNetworkUsername', () => {
    it('should remove prefixed @', () => {
      expect(utils.cleanSocialNetworkUsername('@Slashgear')).toEqual('Slashgear')
    })

    it('should escape markdown characters', () => {
      expect(utils.cleanSocialNetworkUsername('Slashgear__')).toEqual(
        'Slashgear\\_\\_'
      )
      expect(utils.cleanSocialNetworkUsername('Slashgear**')).toEqual(
        'Slashgear\\*\\*'
      )
    })

    it('should return the same string when string is not prefixed or contains markdown chars', () => {
      expect(utils.cleanSocialNetworkUsername('Slashgear')).toEqual('Slashgear')
    })
  })

  describe('getAuthorWebsiteFromGithubAPI', () => {

    it('should return author website url when it exists', async () => {
      const expectedAuthorWebsite = 'https://www.franck-abgrall.me/'
      fetch.mockReturnValueOnce(
        Promise.resolve({
          json: () => Promise.resolve({blog: expectedAuthorWebsite})
        })
      )

      const githubUsername = 'kefranabg'
      const authorWebsite = await utils.getAuthorWebsiteFromGithubAPI(githubUsername)
      expect(authorWebsite).toEqual(expectedAuthorWebsite)
    })

    it('should return undefined if author website url does not exist', async () => {
      fetch.mockReturnValueOnce(Promise.resolve({blog: ''}))
      const githubUsername = 'kefranabg'
      const authorWebsite = await utils.getAuthorWebsiteFromGithubAPI(githubUsername)
      expect(authorWebsite).toEqual(undefined)
    })

    it('should return undefined if there is an error', async () => {
      fetch.mockImplementationOnce(() => {
        throw new Error('ERROR')
      })
      const githubUsername = 'kefranabg'
      const authorWebsite = await utils.getAuthorWebsiteFromGithubAPI(githubUsername)
      expect(authorWebsite).toEqual(undefined)
    })
  })

  describe('doesFileExist', () => {
    it('should return true when file exists for a given path', () => {
      fs.existsSync.mockReturnValueOnce(true)
      expect(utils.doesFileExist('./file-path')).toBe(true)
    })

    it('should return false when file does not exist for a given path', () => {
      fs.existsSync.mockReturnValueOnce(false)
      expect(utils.doesFileExist('./file-path')).toBe(false)
    })

    it('should return false if fs.existsSync throws an error', () => {
      fs.existsSync.mockImplementationOnce(() => {
        throw new Error('ERROR')
      })
      expect(utils.doesFileExist('./file-path')).toBe(false)
    })
  })

  describe('getPackageManagerFromLockFile', () => {
    it('should return npm if only package-lock.json exists', () => {
      fs.existsSync.mockImplementation(
        (filePath: string) => filePath === 'package-lock.json'
      )

      const result = utils.getPackageManagerFromLockFile()

      expect(result).toEqual('npm')
    })

    it('should return yarn if only yarn.lock exists', () => {
      fs.existsSync.mockImplementation((filePath: string)=> filePath === 'yarn.lock')

      const result = utils.getPackageManagerFromLockFile()

      expect(result).toEqual('yarn')
    })

    it('should return undefined if only yarn.lock and package-lock.json exists', () => {
      fs.existsSync.mockImplementation(
        (filePath: string) => filePath === 'yarn.lock' || filePath === 'package-lock.json'
      )

      const result = utils.getPackageManagerFromLockFile()

      expect(result).toBeUndefined()
    })

    it('should return undefined if only no lock file exists', () => {
      fs.existsSync.mockImplementation(() => false)

      const result = utils.getPackageManagerFromLockFile()

      expect(result).toBeUndefined()
    })
  })
})