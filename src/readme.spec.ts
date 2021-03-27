import fs from 'fs';
let ora = require('ora');
import path from 'path';
import template from './choose-template';
import askOverwrite from './ask-overwrite';
import readme from './readme';


const defaultTemplatePath = path.resolve(__dirname, '../templates/default.md')
const defaultNoHtmlTemplatePath = path.resolve(
  __dirname,
  '../templates/default-no-html.md'
)

let chooseTemplate = template
chooseTemplate = jest.fn().mockReturnValue(defaultTemplatePath)

let askOverWriteMock = askOverwrite .askOverwriteFn = jest.fn().mockReturnValue(defaultTemplatePath)


describe('readme', () => {
  jest.mock('ora')
  ora = jest.fn()
  const succeed = jest.fn()
  const fail = jest.fn()

  ora.mockReturnValue({
    start: () => ({
      succeed,
      fail
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('writeReadme', () => {
    it('should call ora with correct parameters in success case', async () => {
      const readmeContent = 'content'
      jest.mock('fs')
      // @ts-ignore
      fs.writeFile = jest.fn((_, __, cb) => cb(null, 'done'))

      await readme.writeReadme(readmeContent)

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Creating README')
      expect(succeed).toHaveBeenCalledTimes(1)
      expect(succeed).toHaveBeenCalledWith('README created')
    })

    it('should call ora with correct parameters in fail case', async () => {
      const readmeContent = 'content'
      // @ts-ignore
      fs.writeFile = jest.fn(() => {
        throw new Error('error')
      })

      try {
        await readme.writeReadme(readmeContent)
        // eslint-disable-next-line no-empty
      } catch (err) {}

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Creating README')
      expect(fail).toHaveBeenCalledTimes(1)
      expect(fail).toHaveBeenCalledWith('README creation fail')
    })

    it('should call writeFile with correct parameters', async () => {
      const readmeContent = 'John &amp; Bryan'
      // @ts-ignore
      const fsMock = fs.writeFile = jest.fn((_, __, cb) => cb(null, 'done'))

      await readme.writeReadme(readmeContent)

      expect(fs.writeFile).toHaveBeenCalledTimes(1)
      expect(fsMock.mock.calls[0][0]).toBe(readme.README_PATH)
      expect(fsMock.mock.calls[0][1]).toBe('John & Bryan')
    })
  })

  describe('buildReadmeContent', () => {
    const context = {
      isGithubRepos: true,
      repositoryUrl: 'https://github.com/kefranabg/readme-md-generator',
      projectPrerequisites: [
        { name: 'npm', value: '>=5.5.0' },
        { name: 'node', value: '>= 9.3.0' }
      ],
      projectName: 'readme-md-generator',
      projectVersion: '0.1.3',
      projectDescription:
        'Generates beautiful README files from git config & package.json infos',
      projectDocumentationUrl:
        'https://github.com/kefranabg/readme-md-generator#readme',
      projectHomepage:
        'https://github.com/kefranabg/readme-md-generator#readme',
      projectDemoUrl: 'https://github.com/kefranabg/readme-md-generator#-demo',
      authorName: 'Franck Abgrall',
      authorWebsite: 'https://www.franck-abgrall.me/',
      authorGithubUsername: 'kefranabg',
      authorTwitterUsername: 'FranckAbgrall',
      authorLinkedInUsername: 'franckabgrall',
      authorPatreonUsername: 'FranckAbgrall',
      licenseName: 'MIT',
      licenseUrl:
        'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE',
      issuesUrl: 'https://github.com/kefranabg/readme-md-generator/issues',
      contributingUrl:
        'https://github.com/kefranabg/readme-md-generator/blob/master/CONTRIBUTING.md',
      installCommand: 'npm install',
      usage: 'npm start',
      testCommand: 'npm run test',
      isProjectOnNpm: true
    }

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should call ora with correct parameters in success case', async () => {
      await readme.buildReadmeContent(context, defaultTemplatePath)

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Loading README template')
      expect(succeed).toHaveBeenCalledTimes(1)
      expect(succeed).toHaveBeenCalledWith('README template loaded')
    })

    it('should return readme default template content', async () => {
      const result = await readme.buildReadmeContent(context, defaultTemplatePath)

      expect(result).toMatchSnapshot()
    })

    it('should return readme default template no html content', async () => {
      const result = await readme.buildReadmeContent(
        context,
        defaultNoHtmlTemplatePath
      )

      expect(result).toMatchSnapshot()
    })

    it('should call ora with correct parameters in fail case', async () => {
      // @ts-ignore
      const fsMock = fs.readFile = jest.fn(() => {
        throw new Error('error')
      })

      try {
        await readme.buildReadmeContent(context, defaultTemplatePath)
        // eslint-disable-next-line no-empty
      } catch (err) {}

      expect(ora).toHaveBeenCalledTimes(1)
      expect(ora).toHaveBeenCalledWith('Loading README template')
      expect(fail).toHaveBeenCalledTimes(1)
      expect(fail).toHaveBeenCalledWith('README template loading fail')
    })
  })

  describe('getReadmeTemplatePath', () => {
    it('should return template that user has selected', async () => {
      const useDefaultAnswers = false
      const actualResult = await readme.getReadmeTemplatePath(
        undefined,
        useDefaultAnswers
      )

      expect(actualResult).toEqual(defaultTemplatePath)
      expect(chooseTemplate).toHaveBeenNthCalledWith(1, useDefaultAnswers)
    })

    it('should return custom template path if customTemplatePath is defined', async () => {
      const customTemplatePath = defaultTemplatePath

      const actualResult = await readme.getReadmeTemplatePath(
        customTemplatePath,
        false
      )

      expect(actualResult).toEqual(customTemplatePath)
      expect(chooseTemplate).not.toHaveBeenCalled()
    })

    it('should throw an error if customTemplate is defined but invalid', () => {
      const wrongPath = 'wrong path'

      expect(readme.getReadmeTemplatePath(wrongPath, false)).rejects.toThrow()
    })

    it('should call ora with correct parameters in fail case', async () => {
      const wrongPath = 'wrong path'

      try {
        await readme.getReadmeTemplatePath(wrongPath, false)
        // eslint-disable-next-line no-empty
      } catch (err) {}

      expect(ora).toHaveBeenNthCalledWith(1, 'Resolving README template path')
      expect(fail).toHaveBeenNthCalledWith(
        1,
        "The template path 'wrong path' is not valid."
      )
    })

    it('should call ora with correct parameters in success case', async () => {
      await readme.getReadmeTemplatePath(defaultTemplatePath, false)

      expect(ora).toHaveBeenNthCalledWith(1, 'Resolving README template path')
      expect(succeed).toHaveBeenNthCalledWith(
        1,
        'README template path resolved'
      )
    })
  })

  describe('checkOverwrite', () => {
    it('should return true if README does not exist', async () => {
      fs.existsSync = jest.fn(p => p !== readme.README_PATH)
      expect(await readme.checkOverwriteReadme()).toEqual(true)
    })
    it('should return true if README exist and user want to overwrite it', async () => {
      fs.existsSync = jest.fn(p => p === readme.README_PATH)
      askOverWriteMock.mockResolvedValue(true)
      expect(await readme.checkOverwriteReadme()).toEqual(true)
    })
    it('should return false if README exist and user dont want to overwrite it', async () => {
      fs.existsSync = jest.fn(p => p === readme.README_PATH)
      askOverWriteMock.mockResolvedValue(false)
      expect(await readme.checkOverwriteReadme()).toEqual(false)
    })
  })
})

jest.mock('ora')
jest.mock('./choose-template')
jest.mock('./ask-overwrite')
