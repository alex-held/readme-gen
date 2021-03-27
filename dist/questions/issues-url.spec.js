"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const issues_url_1 = tslib_1.__importDefault(require("./issues-url"));
describe('askIssues', () => {
    it('should return correct question format', () => {
        const issuesUrl = 'https://github.com/kefranabg/readme-md-generator/issues';
        const projectInfos = { issuesUrl };
        const result = issues_url_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '🔧  Issues page url (use empty value to skip)',
            name: 'issuesUrl',
            default: issuesUrl
        });
    });
});
//# sourceMappingURL=issues-url.spec.js.map