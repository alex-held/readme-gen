"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const lodash_1 = require("lodash");
const utils_1 = tslib_1.__importStar(require("./utils"));
var fetch = require('node-fetch');
var boxen = require('boxen');
var loadJsonFile = require('load-json-file');
var getReposName = require('git-repo-name');
var fs = require('fs');
const realPathBasename = path_1.default.basename;
const realGetReposNameSync = getReposName.sync;
jest.mock('load-json-file');
jest.mock('git-repo-name');
jest.mock('boxen');
jest.mock('node-fetch');
jest.mock('fs');
describe('utils', () => {
    describe('getPackageJson', () => {
        const packageJsonContent = {
            name: 'readme-md-cli'
        };
        it('should return package.json content', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            loadJsonFile.mockReturnValueOnce(Promise.resolve(packageJsonContent));
            const result = yield utils_1.default.getPackageJson();
            expect(result).toEqual(packageJsonContent);
        }));
        it('should return undefined', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            loadJsonFile.mockImplementationOnce(() => {
                throw new Error('ERROR');
            });
            const result = yield utils_1.default.getPackageJson();
            expect(result).toBeUndefined();
        }));
    });
    describe('showEndMessage', () => {
        boxen.mockReturnValue(utils_1.default.END_MSG);
        it('should call boxen with correct parameters', () => {
            utils_1.default.showEndMessage();
            expect(boxen).toHaveBeenCalledTimes(1);
            expect(boxen).toHaveBeenCalledWith(utils_1.default.END_MSG, utils_1.default.BOXEN_CONFIG);
        });
        it('should call process.stdout.write with correct parameters', () => {
            process.stdout.write = jest.fn();
            utils_1.default.showEndMessage();
            expect(process.stdout.write).toHaveBeenCalledTimes(1);
            expect(process.stdout.write).toHaveBeenCalledWith(utils_1.default.END_MSG);
        });
    });
    describe('getProjectName', () => {
        const projectName = 'readme-md-generator';
        beforeEach(() => {
            path_1.default.basename = jest.fn(() => projectName);
            getReposName.sync = jest.fn();
        });
        afterEach(() => {
            path_1.default.basename = realPathBasename;
            getReposName.sync = realGetReposNameSync;
        });
        it('should return package.json name prop when defined', () => {
            const packageJson = utils_1.PackageJson.ForceCreateUnsafeFromInterface({ name: projectName });
            getReposName.sync.mockReturnValueOnce('readme-md-generator');
            const result = utils_1.default.getProjectName(packageJson);
            expect(result).toEqual(projectName);
            expect(getReposName.sync).not.toHaveBeenCalled();
            expect(path_1.default.basename).not.toHaveBeenCalled();
        });
        it('should return git repos when package.json it is not defined', () => {
            const packageJson = new utils_1.PackageJson('');
            getReposName.sync.mockReturnValueOnce('readme-md-generator');
            const result = utils_1.default.getProjectName(packageJson);
            expect(result).toEqual(projectName);
            expect(getReposName.sync).toHaveBeenCalled();
            expect(path_1.default.basename).not.toHaveBeenCalled();
        });
        it('should return folder basename when package.json and git repos name is undefined', () => {
            const packageJson = new utils_1.PackageJson('');
            getReposName.sync.mockImplementation(() => {
                throw new Error('error');
            });
            const result = utils_1.default.getProjectName(packageJson);
            expect(result).toEqual(projectName);
            expect(getReposName.sync).toHaveBeenCalled();
            expect(path_1.default.basename).toHaveBeenCalled();
        });
    });
    describe('getDefaultAnswer', () => {
        it('should handle input prompts correctly', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const question = { type: 'input', default: 'default' };
            const result = yield utils_1.default.getDefaultAnswer(question);
            expect(result).toEqual(question.default);
        }));
        it('should handle choices prompts correctly', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const value = { name: 'name', value: 'value' };
            const question = {
                type: 'checkbox',
                choices: [value, { checked: false }]
            };
            const result = yield utils_1.default.getDefaultAnswer(question);
            expect(result).toEqual([value]);
        }));
        it('should return empty string for non-defaulted fields', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const question = { type: 'input' };
            const result = yield utils_1.default.getDefaultAnswer(question);
            expect(result).toEqual('');
        }));
        it('should return undefined for invalid types', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const question = { type: 'invalid' };
            const result = yield utils_1.default.getDefaultAnswer(question);
            expect(result).toEqual(undefined);
        }));
        it('should return undefined if when function is defined and return false', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const answersContext = {};
            const question = {
                type: 'input',
                when: ctx => !lodash_1.isNil(ctx.licenseName)
            };
            const result = yield utils_1.default.getDefaultAnswer(question, answersContext);
            expect(result).toEqual(undefined);
        }));
        describe('isProjectAvailableOnNpm', () => {
            it('should return true if project is available on npm', () => {
                const result = utils_1.default.isProjectAvailableOnNpm('readme-md-generator');
                expect(result).toBe(true);
            });
            it('should return false if project is not available on npm', () => {
                const result = utils_1.default.isProjectAvailableOnNpm('bento-starter');
                expect(result).toBe(false);
            });
        });
        it('should return correct value if when function is defined and return true', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const answersContext = { licenseName: 'licenseName' };
            const question = {
                type: 'input',
                default: 'default',
                when: context => !lodash_1.isNil(context.licenseName)
            };
            const result = yield utils_1.default.getDefaultAnswer(question, answersContext);
            expect(result).toEqual('default');
        }));
    });
    describe('getDefaultAnswers', () => {
        it('should return default answers from questions', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const questions = [
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
            ];
            const result = yield utils_1.default.getDefaultAnswers(questions);
            expect(result).toEqual({
                questionOne: 'answer 1',
                questionTwo: 'answer 2'
            });
        }));
    });
    describe('cleanSocialNetworkUsername', () => {
        it('should remove prefixed @', () => {
            expect(utils_1.default.cleanSocialNetworkUsername('@Slashgear')).toEqual('Slashgear');
        });
        it('should escape markdown characters', () => {
            expect(utils_1.default.cleanSocialNetworkUsername('Slashgear__')).toEqual('Slashgear\\_\\_');
            expect(utils_1.default.cleanSocialNetworkUsername('Slashgear**')).toEqual('Slashgear\\*\\*');
        });
        it('should return the same string when string is not prefixed or contains markdown chars', () => {
            expect(utils_1.default.cleanSocialNetworkUsername('Slashgear')).toEqual('Slashgear');
        });
    });
    describe('getAuthorWebsiteFromGithubAPI', () => {
        it('should return author website url when it exists', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const expectedAuthorWebsite = 'https://www.franck-abgrall.me/';
            fetch.mockReturnValueOnce(Promise.resolve({
                json: () => Promise.resolve({ blog: expectedAuthorWebsite })
            }));
            const githubUsername = 'kefranabg';
            const authorWebsite = yield utils_1.default.getAuthorWebsiteFromGithubAPI(githubUsername);
            expect(authorWebsite).toEqual(expectedAuthorWebsite);
        }));
        it('should return undefined if author website url does not exist', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            fetch.mockReturnValueOnce(Promise.resolve({ blog: '' }));
            const githubUsername = 'kefranabg';
            const authorWebsite = yield utils_1.default.getAuthorWebsiteFromGithubAPI(githubUsername);
            expect(authorWebsite).toEqual(undefined);
        }));
        it('should return undefined if there is an error', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            fetch.mockImplementationOnce(() => {
                throw new Error('ERROR');
            });
            const githubUsername = 'kefranabg';
            const authorWebsite = yield utils_1.default.getAuthorWebsiteFromGithubAPI(githubUsername);
            expect(authorWebsite).toEqual(undefined);
        }));
    });
    describe('doesFileExist', () => {
        it('should return true when file exists for a given path', () => {
            fs.existsSync.mockReturnValueOnce(true);
            expect(utils_1.default.doesFileExist('./file-path')).toBe(true);
        });
        it('should return false when file does not exist for a given path', () => {
            fs.existsSync.mockReturnValueOnce(false);
            expect(utils_1.default.doesFileExist('./file-path')).toBe(false);
        });
        it('should return false if fs.existsSync throws an error', () => {
            fs.existsSync.mockImplementationOnce(() => {
                throw new Error('ERROR');
            });
            expect(utils_1.default.doesFileExist('./file-path')).toBe(false);
        });
    });
    describe('getPackageManagerFromLockFile', () => {
        it('should return npm if only package-lock.json exists', () => {
            fs.existsSync.mockImplementation((filePath) => filePath === 'package-lock.json');
            const result = utils_1.default.getPackageManagerFromLockFile();
            expect(result).toEqual('npm');
        });
        it('should return yarn if only yarn.lock exists', () => {
            fs.existsSync.mockImplementation((filePath) => filePath === 'yarn.lock');
            const result = utils_1.default.getPackageManagerFromLockFile();
            expect(result).toEqual('yarn');
        });
        it('should return undefined if only yarn.lock and package-lock.json exists', () => {
            fs.existsSync.mockImplementation((filePath) => filePath === 'yarn.lock' || filePath === 'package-lock.json');
            const result = utils_1.default.getPackageManagerFromLockFile();
            expect(result).toBeUndefined();
        });
        it('should return undefined if only no lock file exists', () => {
            fs.existsSync.mockImplementation(() => false);
            const result = utils_1.default.getPackageManagerFromLockFile();
            expect(result).toBeUndefined();
        });
    });
});
//# sourceMappingURL=utils.spec.js.map