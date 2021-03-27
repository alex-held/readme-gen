import fs from 'fs'
import os from 'os'
import path from 'path'


const defaultCfgFileName = 'config.json'

const getDefaultCfgRoot = () => {
  const homeDir = os.homedir()
  return path.resolve(homeDir, '.genctl/readme-md-generator')
}
const getDefaultCfgPath = () => {
  const cfgRoot = getDefaultCfgRoot()
  return path.resolve(cfgRoot, defaultCfgFileName)
}
const loadCfg = (cfgPath: string = null) => {
  if (cfgPath == null) {
    cfgPath = getDefaultCfgPath()
  }
  if (!fs.existsSync(cfgPath)) {
    return newDefaultConfig()
  }
  const jsonFile = fs.readFileSync(cfgPath, {
    encoding: 'utf-8',
    flag: 'r'
  })
  const cfg: Config = JSON.parse(jsonFile)
  return cfg
}

const storeCfg = (cfg: Config, cfgPath?: string) => {
  if (cfgPath == null) {
    cfgPath = getDefaultCfgPath()
  }
  const json = JSON.stringify(cfg)
  const data = Buffer.from(json, 'utf-8')
  fs.writeFileSync(cfgPath, data, {encoding: 'utf8', mode: 0o666, flag: 'w'})
}


const newDefaultConfig: () => Config = () => {
  return {
    customTemplatesDir: '',
    useHTML: false,
    projectVersion: '0.0.1',
    authorName: '',
    authorWebsite: '',
    githubUsername: '',
    twitterUsername: '',
    linkedinUsername: '',
    patreonUsername: '',
    license: ''
  }
}


export interface Config {
  customTemplatesDir: string;
  useHTML: boolean;
  projectVersion: string;
  authorName: string;
  authorWebsite: string;
  githubUsername: string;
  twitterUsername: string;
  linkedinUsername: string;
  patreonUsername: string;
  license: string;
}

export type UpdateFn = (cfg: Config) => Config


const config = {
  getDefaultCfgRoot,
  getDefaultCfgPath,
  newDefaultConfig,
  loadCfg,
  storeCfg,
}

export default config
module.exports = {
  config,
  getDefaultCfgRoot,
  getDefaultCfgPath,
  newDefaultConfig,
  loadCfg,
  storeCfg,
}
