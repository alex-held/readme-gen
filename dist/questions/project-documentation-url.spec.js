"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const project_name_1 = tslib_1.__importDefault(require("./project-name"));
describe('askProjectName', () => {
    it('should return correct question format', () => {
        const name = 'readme-md-generator';
        const projectInfos = { name };
        const result = project_name_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '💡  Project name',
            name: 'projectName',
            default: name
        });
    });
});
//# sourceMappingURL=project-documentation-url.spec.js.map