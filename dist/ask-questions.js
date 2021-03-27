"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const utils_1 = tslib_1.__importDefault(require("./utils"));
const questions_1 = tslib_1.__importDefault(require("./questions"));
const lodash_1 = require("lodash");
const askQuestionsFn = (projectInfos, useDefaultAnswers) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const questions = lodash_1.flatMap(Object.values(questions_1.default), questionBuilder => questionBuilder(projectInfos));
    const answersContext = useDefaultAnswers
        ? yield utils_1.default.getDefaultAnswers(questions)
        : yield inquirer_1.default.prompt(questions);
    return Object.assign({ isGithubRepos: projectInfos.isGithubRepos, repositoryUrl: projectInfos.repositoryUrl, projectPrerequisites: undefined, isProjectOnNpm: utils_1.default.isProjectAvailableOnNpm(answersContext.projectName) }, answersContext);
});
const askQuestions = {
    askQuestionsFn
};
exports.default = askQuestions;
//# sourceMappingURL=ask-questions.js.map