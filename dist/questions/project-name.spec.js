"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const project_documentation_url_1 = tslib_1.__importDefault(require("./project-documentation-url"));
describe('askProjectDocumentationUrl', () => {
    it('should return correct question format', () => {
        const documentationUrl = 'https://github.com/kefranabg/readme-md-generator/blob/master/README.md';
        const projectInfos = { documentationUrl };
        const result = project_documentation_url_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '📘  Project documentation url (use empty value to skip)',
            name: 'projectDocumentationUrl',
            default: documentationUrl
        });
    });
});
//# sourceMappingURL=project-name.spec.js.map