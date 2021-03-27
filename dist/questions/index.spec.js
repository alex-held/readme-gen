"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _1 = tslib_1.__importDefault(require("./"));
describe('questions', () => {
    it('should export questions in the correct order', () => {
        const questionsNameOrder = Object.keys(_1.default);
        expect(questionsNameOrder).toEqual([
            'askProjectName',
            'askProjectVersion',
            'askProjectDescription',
            'askPackageManager',
            'askProjectHomepage',
            'askProjectDemoUrl',
            'askProjectDocumentationUrl',
            'askAuhtorName',
            'askAuthorGithub',
            'askAuthorWebsite',
            'askAuthorTwitter',
            'askAuthorLinkedIn',
            'askAuthorPatreon',
            'askProjectPrerequisites',
            'askLicenseName',
            'askLicenseUrl',
            'askIssuesUrl',
            'askContributingUrl',
            'askInstallCommand',
            'askUsage',
            'askTestCommand'
        ]);
    });
});
//# sourceMappingURL=index.spec.js.map