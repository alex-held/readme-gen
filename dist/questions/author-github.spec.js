"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const author_github_1 = tslib_1.__importDefault(require("./author-github"));
describe('askAuthorGithub', () => {
    it('should return correct question format', () => {
        const githubUsername = 'kefranabg';
        const projectInfos = { githubUsername };
        const result = author_github_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '👤  GitHub username (use empty value to skip)',
            name: 'authorGithubUsername',
            default: githubUsername,
            filter: expect.any(Function)
        });
    });
});
//# sourceMappingURL=author-github.spec.js.map