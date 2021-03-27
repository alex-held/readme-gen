"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const os_1 = tslib_1.__importDefault(require("os"));
const path_1 = tslib_1.__importDefault(require("path"));
const defaultCfgFileName = 'config.json';
const getDefaultCfgRoot = () => {
    const homeDir = os_1.default.homedir();
    return path_1.default.resolve(homeDir, '.genctl/readme-md-generator');
};
const getDefaultCfgPath = () => {
    const cfgRoot = getDefaultCfgRoot();
    return path_1.default.resolve(cfgRoot, defaultCfgFileName);
};
const loadCfg = (cfgPath = null) => {
    if (cfgPath == null) {
        cfgPath = getDefaultCfgPath();
    }
    if (!fs_1.default.existsSync(cfgPath)) {
        return newDefaultConfig();
    }
    const jsonFile = fs_1.default.readFileSync(cfgPath, {
        encoding: 'utf-8',
        flag: 'r'
    });
    const cfg = JSON.parse(jsonFile);
    return cfg;
};
const storeCfg = (cfg, cfgPath) => {
    if (cfgPath == null) {
        cfgPath = getDefaultCfgPath();
    }
    const json = JSON.stringify(cfg);
    const data = Buffer.from(json, 'utf-8');
    fs_1.default.writeFileSync(cfgPath, data, { encoding: 'utf8', mode: 0o666, flag: 'w' });
};
const newDefaultConfig = () => {
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
    };
};
const config = {
    getDefaultCfgRoot,
    getDefaultCfgPath,
    newDefaultConfig,
    loadCfg,
    storeCfg,
};
exports.default = config;
module.exports = {
    config,
    getDefaultCfgRoot,
    getDefaultCfgPath,
    newDefaultConfig,
    loadCfg,
    storeCfg,
};
//# sourceMappingURL=config.js.map