"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJson = void 0;
const tslib_1 = require("tslib");
const load_json_file_1 = tslib_1.__importDefault(require("load-json-file"));
const isNil_1 = tslib_1.__importDefault(require("lodash/isNil"));
const isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
const boxen_1 = tslib_1.__importStar(require("boxen"));
const path_1 = tslib_1.__importDefault(require("path"));
const git_repo_name_1 = tslib_1.__importDefault(require("git-repo-name"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const child_process_1 = require("child_process");
const markdown_escape_1 = tslib_1.__importDefault(require("markdown-escape"));
const END_MSG = `README.md was successfully generated.
Thanks for using readme-md-generator!`;
const GITHUB_API_URL = 'https://api.github.com';
const BOXEN_CONFIG = {
    padding: 1,
    margin: { top: 2, bottom: 3, left: 0, right: 0 },
    borderColor: 'cyan',
    align: 'center',
    borderStyle: "double"
};
const showEndMessage = () => {
    return process.stdout.write(boxen_1.default(END_MSG, BOXEN_CONFIG));
};
const getPackageJsonName = (packageJson) => packageJson.name;
const getGitRepositoryName = (cwd) => {
    try {
        return git_repo_name_1.default.sync({ cwd });
    }
    catch (err) {
        return undefined;
    }
};
const getProjectName = (packageJson) => {
    const cwd = process.cwd();
    return (getPackageJsonName(packageJson) ||
        getGitRepositoryName(cwd) ||
        path_1.default.basename(cwd));
};
class PackageJson {
    constructor(jsonValue) {
        this.map = new Map();
        let json = JSON.stringify(jsonValue);
        let jMap = JSON.parse(json);
        jMap.forEach((value, key, map) => {
            this.map.set(key, value);
        });
    }
    static ForceCreateUnsafeFromInterface(any) {
        const pkgJson = new PackageJson(JSON.stringify(any));
        return pkgJson;
    }
    get author() {
        return this.get('author');
    }
    set author(author) {
        this.set('author', author);
    }
    get name() {
        return this.get('name');
    }
    set name(name) {
        this.set('name', name);
    }
    clear() {
        this.map.clear();
    }
    delete(key) {
        return this.map.delete(key);
    }
    forEach(callbackfn, thisArg) {
        return this.map.forEach(callbackfn, thisArg);
    }
    get(key) {
        return this.map.get(key);
    }
    has(key) {
        return this.map.has(key);
    }
    set(key, value) {
        this.map.set(key, value);
        return this;
    }
    get size() {
        return this.map.size;
    }
    [Symbol.iterator]() {
        return this.map[Symbol.iterator]();
    }
    entries() {
        return this.map.entries();
    }
    keys() {
        return this.map.keys();
    }
    values() {
        return this.map.values();
    }
    get [Symbol.toStringTag]() {
        return this.map[Symbol.toStringTag];
    }
}
exports.PackageJson = PackageJson;
const getPackageJson = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield load_json_file_1.default('package.json');
        const packageJson = new PackageJson(json);
        return packageJson;
    }
    catch (err) {
        return Promise.reject(err);
    }
});
const getDefaultAnswer = (question, answersContext) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (question.when && !question.when(answersContext))
        return undefined;
    switch (question.type) {
        case 'input':
            return typeof question.default === 'function'
                ? question.default(answersContext)
                : question.default || '';
        case 'checkbox':
            return question.choices
                .filter((choice) => !choice.checked)
                .map((choice) => choice.value);
        default:
            return undefined;
    }
});
const isProjectAvailableOnNpm = (projectName) => {
    try {
        child_process_1.execSync(`npm view ${projectName}`, { stdio: 'ignore' });
        return true;
    }
    catch (err) {
        return false;
    }
};
const getDefaultAnswers = (questions) => questions.reduce((answersContextProm, question) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const answersContext = yield answersContextProm;
    return Object.assign(Object.assign({}, answersContext), { [question.name]: yield getDefaultAnswer(question, answersContext) });
}), Promise.resolve({}));
const cleanSocialNetworkUsername = (input) => {
    return markdown_escape_1.default(input.replace(/^@/, ''));
};
const getAuthorWebsiteFromGithubAPI = (githubUsername) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield node_fetch_1.default(`${GITHUB_API_URL}/users/${githubUsername}`).then(res => res.json());
        const authorWebsite = userData.blog;
        return isNil_1.default(authorWebsite) || isEmpty_1.default(authorWebsite)
            ? undefined
            : authorWebsite;
    }
    catch (err) {
        return undefined;
    }
});
const doesFileExist = (filepath) => {
    try {
        return fs_1.default.existsSync(filepath);
    }
    catch (err) {
        return false;
    }
};
const getPackageManagerFromLockFile = () => {
    const packageLockExists = doesFileExist('package-lock.json');
    const yarnLockExists = doesFileExist('yarn.lock');
    if (packageLockExists && yarnLockExists)
        return undefined;
    if (packageLockExists)
        return 'npm';
    if (yarnLockExists)
        return 'yarn';
    return undefined;
};
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
};
exports.default = utils;
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
};
//# sourceMappingURL=utils.js.map