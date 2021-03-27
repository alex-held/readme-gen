"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const project_description_1 = tslib_1.__importDefault(require("./project-description"));
describe('askProjectDescription', () => {
    it('should return correct question format', () => {
        const description = 'description';
        const projectInfos = { description };
        const result = project_description_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '📄  Project description',
            name: 'projectDescription',
            default: description
        });
    });
});
//# sourceMappingURL=project-description.spec.js.map