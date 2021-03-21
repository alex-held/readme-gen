import {Config, UpdateFn} from "./config";
import fs, {BaseEncodingOptions, PathLike} from 'fs'

import os from "os";
import config from "./config";

const userHome = '/some/path/to/user/home'
const cfgRootPath = `${userHome}/.genctl/readme-md-generator`
const cfgFilePath = `${cfgRootPath}/config.json`
const templatesPath = `${cfgRootPath}/templates`


const defaultCfg = {
  customTemplatesDir: templatesPath,
  useHTML: false,
  projectVersion: '0.0.1',
  authorName: '',
  authorWebsite: '',
  githubUsername: '',
  twitterUsername: '',
  linkedinUsername: '',
  patreonUsername: '',
  license: '',
}


function createCfg(map?: UpdateFn): Config {

  const defaultCfg: Config = {
    customTemplatesDir: templatesPath,
    useHTML: false,
    projectVersion: '0.0.1',
    authorName: '',
    authorWebsite: '',
    githubUsername: '',
    twitterUsername: '',
    linkedinUsername: '',
    patreonUsername: '',
    license: '',
  }
  return map != null ? map(defaultCfg) : defaultCfg
}

jest.mock('os')
os.homedir = jest.fn().mockReturnValue(userHome)

describe('config', () => {
  describe('getDefaultCfgPath', () => {
    it('should return default config', async () => {
      const expected = cfgFilePath
      const actual = config.getDefaultCfgPath()
      expect(actual).toEqual(expected)
    })
  })

  describe('newDefaultConfig', () => {
    it('should return default config', async () => {
      const expectCfg = createCfg()
      const result: Config = config.newDefaultConfig()
      expect(result).toEqual(expectCfg)
    })
  })

  describe('loadCfg', () => {
    let expected: Config = {
      customTemplatesDir: templatesPath,
      useHTML: true,
      authorName: 'Max Mustermann',
      authorWebsite: 'example.com',
      githubUsername: 'max-mustermann',
      projectVersion: '1.0.0',
      twitterUsername: '@max',
      linkedinUsername: 'max-mustermann',
      patreonUsername: 'max-mustermann',
      license: 'MIT'
    }
    const expectedJson = JSON.stringify(expected)

    const cfgFilePath = `${cfgRootPath}/config.json`

    beforeEach(() => {
      jest.mock('fs')
      fs.readFileSync = jest.fn().mockImplementation((cfgPath, _opt) => {
        if (cfgPath != cfgFilePath) {
          return Buffer.from("")
        } else {
          return Buffer.from(expectedJson)
        }
      })
     // fs.readFileSync = jest.fn().mockReturnValue(expectedJson)
    })

    it('should return default config', async () => {
      const actual = config.loadCfg(cfgFilePath)
      expect(actual).toEqual(expected)
    })
  })

  it('should return the default path', async () => {
    const expected = cfgRootPath
    const actual = config.getDefaultCfgRoot()
    expect(actual).toEqual(expected)
  })
})
