"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
let ora = require('ora');
const path_1 = tslib_1.__importDefault(require("path"));
const choose_template_1 = tslib_1.__importDefault(require("./choose-template"));
const ask_overwrite_1 = tslib_1.__importDefault(require("./ask-overwrite"));
const readme_1 = tslib_1.__importDefault(require("./readme"));
const defaultTemplatePath = path_1.default.resolve(__dirname, '../templates/default.md');
const defaultNoHtmlTemplatePath = path_1.default.resolve(__dirname, '../templates/default-no-html.md');
let chooseTemplate = choose_template_1.default;
chooseTemplate = jest.fn().mockReturnValue(defaultTemplatePath);
let askOverWriteMock = ask_overwrite_1.default.askOverwriteFn = jest.fn().mockReturnValue(defaultTemplatePath);
describe('readme', () => {
    jest.mock('ora');
    ora = jest.fn();
    const succeed = jest.fn();
    const fail = jest.fn();
    ora.mockReturnValue({
        start: () => ({
            succeed,
            fail
        })
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('writeReadme', () => {
        it('should call ora with correct parameters in success case', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const readmeContent = 'content';
            jest.mock('fs');
            fs_1.default.writeFile = jest.fn((_, __, cb) => cb(null, 'done'));
            yield readme_1.default.writeReadme(readmeContent);
            expect(ora).toHaveBeenCalledTimes(1);
            expect(ora).toHaveBeenCalledWith('Creating README');
            expect(succeed).toHaveBeenCalledTimes(1);
            expect(succeed).toHaveBeenCalledWith('README created');
        }));
        it('should call ora with correct parameters in fail case', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const readmeContent = 'content';
            fs_1.default.writeFile = jest.fn(() => {
                throw new Error('error');
            });
            try {
                yield readme_1.default.writeReadme(readmeContent);
            }
            catch (err) { }
            expect(ora).toHaveBeenCalledTimes(1);
            expect(ora).toHaveBeenCalledWith('Creating README');
            expect(fail).toHaveBeenCalledTimes(1);
            expect(fail).toHaveBeenCalledWith('README creation fail');
        }));
        it('should call writeFile with correct parameters', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const readmeContent = 'John &amp; Bryan';
            const fsMock = fs_1.default.writeFile = jest.fn((_, __, cb) => cb(null, 'done'));
            yield readme_1.default.writeReadme(readmeContent);
            expect(fs_1.default.writeFile).toHaveBeenCalledTimes(1);
            expect(fsMock.mock.calls[0][0]).toBe(readme_1.default.README_PATH);
            expect(fsMock.mock.calls[0][1]).toBe('John & Bryan');
        }));
    });
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
            projectDescription: 'Generates beautiful README files from git config & package.json infos',
            projectDocumentationUrl: 'https://github.com/kefranabg/readme-md-generator#readme',
            projectHomepage: 'https://github.com/kefranabg/readme-md-generator#readme',
            projectDemoUrl: 'https://github.com/kefranabg/readme-md-generator#-demo',
            authorName: 'Franck Abgrall',
            authorWebsite: 'https://www.franck-abgrall.me/',
            authorGithubUsername: 'kefranabg',
            authorTwitterUsername: 'FranckAbgrall',
            authorLinkedInUsername: 'franckabgrall',
            authorPatreonUsername: 'FranckAbgrall',
            licenseName: 'MIT',
            licenseUrl: 'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE',
            issuesUrl: 'https://github.com/kefranabg/readme-md-generator/issues',
            contributingUrl: 'https://github.com/kefranabg/readme-md-generator/blob/master/CONTRIBUTING.md',
            installCommand: 'npm install',
            usage: 'npm start',
            testCommand: 'npm run test',
            isProjectOnNpm: true
        };
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should call ora with correct parameters in success case', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            yield readme_1.default.buildReadmeContent(context, defaultTemplatePath);
            expect(ora).toHaveBeenCalledTimes(1);
            expect(ora).toHaveBeenCalledWith('Loading README template');
            expect(succeed).toHaveBeenCalledTimes(1);
            expect(succeed).toHaveBeenCalledWith('README template loaded');
        }));
        it('should return readme default template content', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const result = yield readme_1.default.buildReadmeContent(context, defaultTemplatePath);
            expect(result).toMatchSnapshot();
        }));
        it('should return readme default template no html content', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const result = yield readme_1.default.buildReadmeContent(context, defaultNoHtmlTemplatePath);
            expect(result).toMatchSnapshot();
        }));
        it('should call ora with correct parameters in fail case', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const fsMock = fs_1.default.readFile = jest.fn(() => {
                throw new Error('error');
            });
            try {
                yield readme_1.default.buildReadmeContent(context, defaultTemplatePath);
            }
            catch (err) { }
            expect(ora).toHaveBeenCalledTimes(1);
            expect(ora).toHaveBeenCalledWith('Loading README template');
            expect(fail).toHaveBeenCalledTimes(1);
            expect(fail).toHaveBeenCalledWith('README template loading fail');
        }));
    });
    describe('getReadmeTemplatePath', () => {
        it('should return template that user has selected', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const useDefaultAnswers = false;
            const actualResult = yield readme_1.default.getReadmeTemplatePath(undefined, useDefaultAnswers);
            expect(actualResult).toEqual(defaultTemplatePath);
            expect(chooseTemplate).toHaveBeenNthCalledWith(1, useDefaultAnswers);
        }));
        it('should return custom template path if customTemplatePath is defined', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const customTemplatePath = defaultTemplatePath;
            const actualResult = yield readme_1.default.getReadmeTemplatePath(customTemplatePath, false);
            expect(actualResult).toEqual(customTemplatePath);
            expect(chooseTemplate).not.toHaveBeenCalled();
        }));
        it('should throw an error if customTemplate is defined but invalid', () => {
            const wrongPath = 'wrong path';
            expect(readme_1.default.getReadmeTemplatePath(wrongPath, false)).rejects.toThrow();
        });
        it('should call ora with correct parameters in fail case', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const wrongPath = 'wrong path';
            try {
                yield readme_1.default.getReadmeTemplatePath(wrongPath, false);
            }
            catch (err) { }
            expect(ora).toHaveBeenNthCalledWith(1, 'Resolving README template path');
            expect(fail).toHaveBeenNthCalledWith(1, "The template path 'wrong path' is not valid.");
        }));
        it('should call ora with correct parameters in success case', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            yield readme_1.default.getReadmeTemplatePath(defaultTemplatePath, false);
            expect(ora).toHaveBeenNthCalledWith(1, 'Resolving README template path');
            expect(succeed).toHaveBeenNthCalledWith(1, 'README template path resolved');
        }));
    });
    describe('checkOverwrite', () => {
        it('should return true if README does not exist', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            fs_1.default.existsSync = jest.fn(p => p !== readme_1.default.README_PATH);
            expect(yield readme_1.default.checkOverwriteReadme()).toEqual(true);
        }));
        it('should return true if README exist and user want to overwrite it', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            fs_1.default.existsSync = jest.fn(p => p === readme_1.default.README_PATH);
            askOverWriteMock.mockResolvedValue(true);
            expect(yield readme_1.default.checkOverwriteReadme()).toEqual(true);
        }));
        it('should return false if README exist and user dont want to overwrite it', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            fs_1.default.existsSync = jest.fn(p => p === readme_1.default.README_PATH);
            askOverWriteMock.mockResolvedValue(false);
            expect(yield readme_1.default.checkOverwriteReadme()).toEqual(false);
        }));
    });
});
jest.mock('ora');
jest.mock('./choose-template');
jest.mock('./ask-overwrite');
//# sourceMappingURL=readme.spec.js.map