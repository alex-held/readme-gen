"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const ask_questions_1 = tslib_1.__importDefault(require("./ask-questions"));
const questions_1 = tslib_1.__importDefault(require("./questions"));
inquirer_1.default.prompt = jest.fn(items => Promise.resolve(items.reduce((result, item) => {
    result[item.name] = 'value';
    return result;
}, {})));
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
describe('ask-questions', () => {
    beforeEach(() => {
        inquirer_1.default.prompt.mockClear();
    });
    it('should call all builder functions exported by questions', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const projectInfos = { name: 'readme-md-generator' };
        yield ask_questions_1.default(projectInfos, false);
        expect(questions_1.default.askProjectName).toHaveBeenCalledTimes(1);
        expect(questions_1.default.askProjectVersion).toHaveBeenCalledTimes(1);
        expect(questions_1.default.askProjectDescription).toHaveBeenCalledTimes(1);
    }));
    it('should use default values with --yes option', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const result = yield ask_questions_1.default({}, true);
        expect(inquirer_1.default.prompt).not.toHaveBeenCalled();
        expect(result).toEqual({
            projectName: 'defaultProjectName',
            projectVersion: '',
            projectDescription: [{ name: 'choiceOne', value: 1 }],
            isGithubRepos: undefined,
            repositoryUrl: undefined,
            projectPrerequisites: undefined,
            isProjectOnNpm: false
        });
    }));
    it('should return merged contexts', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const projectInfos = { name: 'readme-md-generator' };
        const context = yield ask_questions_1.default(projectInfos, false);
        expect(context).toEqual({
            projectName: 'value',
            projectVersion: 'value',
            projectDescription: 'value',
            isGithubRepos: undefined,
            repositoryUrl: undefined,
            projectPrerequisites: undefined,
            isProjectOnNpm: true
        });
    }));
});
//# sourceMappingURL=ask-questions.spec.js.map