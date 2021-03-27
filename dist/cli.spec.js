"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const cli_1 = tslib_1.__importDefault(require("./cli"));
const project_infos_1 = tslib_1.__importDefault(require("./project-infos"));
const clean_context_1 = tslib_1.__importDefault(require("./clean-context"));
const ask_questions_1 = tslib_1.__importDefault(require("./ask-questions"));
const utils_1 = tslib_1.__importDefault(require("./utils"));
const readme_1 = tslib_1.__importDefault(require("./readme"));
jest.mock('inquirer');
inquirer_1.default.prompt = jest.fn(items => Promise.resolve(items.reduce((result, item) => {
    result[item.name] = 'value';
    return result;
}, {})));
jest.mock('./ask-questions');
const askQuestionsMock = ask_questions_1.default.askQuestionsFn = jest.fn(() => Promise.resolve({ projectName: 'readme-md-generator' }));
jest.mock('./clean-context');
const cleanContextMock = clean_context_1.default.cleanContextFn = jest.fn(() => ({ projectName: 'readme-md-generator-after-context-clean', licenseName: null, projectVersion: null }));
jest.mock('./questions', () => ({
    askProjectName: jest.fn(() => ({
        name: 'projectName',
        type: 'input',
        default: 'defaultProjectName'
    })),
    askProjectVersion: jest.fn(() => ({
        name: 'projectVersion',
        type: 'input'
    })),
    askProjectDescription: jest.fn(() => ({
        name: 'projectDescription',
        type: 'checkbox',
        choices: [
            { value: { name: 'choiceOne', value: 1 }, checked: true },
            { value: { name: 'choiceTwo', value: 2 }, checked: false }
        ]
    }))
}));
describe('mainProcess', () => {
    const customTemplatePath = "";
    afterEach(() => {
        askQuestionsMock.mockClear();
    });
    it('should stop immediatly if user dont want overwrite', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const useDefaultAnswers = true;
        project_infos_1.default.getProjectInfos = jest.fn();
        readme_1.default.buildReadmeContent = jest.fn();
        readme_1.default.getReadmeTemplatePath = jest.fn();
        readme_1.default.writeReadme = jest.fn();
        readme_1.default.checkOverwriteReadme = jest.fn(() => Promise.resolve(false));
        utils_1.default.showEndMessage = jest.fn();
        yield cli_1.default.mainProcess({ customTemplatePath, useDefaultAnswers });
        expect(project_infos_1.default.getProjectInfos).not.toHaveBeenCalled();
        expect(clean_context_1.default).not.toHaveBeenCalled();
        expect(readme_1.default.buildReadmeContent).not.toHaveBeenCalled();
        expect(readme_1.default.getReadmeTemplatePath).not.toHaveBeenCalled();
        expect(readme_1.default.writeReadme).not.toHaveBeenCalled();
        expect(utils_1.default.showEndMessage).not.toHaveBeenCalled();
    }));
    it('should call main functions with correct args', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const useDefaultAnswers = true;
        const projectInformations = { name: 'readme-md-generator' };
        const readmeContent = 'content';
        const templatePath = 'path/to/template';
        project_infos_1.default.getProjectInfos = jest.fn(() => Promise.resolve(projectInformations));
        readme_1.default.buildReadmeContent = jest.fn(() => Promise.resolve(readmeContent));
        readme_1.default.getReadmeTemplatePath = jest.fn(() => Promise.resolve(templatePath));
        readme_1.default.checkOverwriteReadme = jest.fn(() => Promise.resolve(true));
        readme_1.default.writeReadme = jest.fn();
        utils_1.default.showEndMessage = jest.fn();
        yield cli_1.default.mainProcess({ customTemplatePath, useDefaultAnswers });
        expect(readme_1.default.getReadmeTemplatePath).toHaveBeenNthCalledWith(1, customTemplatePath, useDefaultAnswers);
        expect(project_infos_1.default.getProjectInfos).toHaveBeenCalledTimes(1);
        expect(ask_questions_1.default).toHaveBeenNthCalledWith(1, projectInformations, useDefaultAnswers);
        expect(clean_context_1.default).toHaveBeenNthCalledWith(1, {
            projectName: 'readme-md-generator'
        });
        expect(readme_1.default.buildReadmeContent).toHaveBeenNthCalledWith(1, { projectName: 'readme-md-generator-after-context-clean' }, templatePath);
        expect(readme_1.default.writeReadme).toHaveBeenNthCalledWith(1, readmeContent);
        expect(utils_1.default.showEndMessage).toHaveBeenCalledTimes(1);
    }));
});
//# sourceMappingURL=cli.spec.js.map