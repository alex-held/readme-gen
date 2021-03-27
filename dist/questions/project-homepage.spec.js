"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const project_homepage_1 = tslib_1.__importDefault(require("./project-homepage"));
describe('askProjectHomepage', () => {
    it('should return correct question format', () => {
        const homepage = 'homepage';
        const projectInfos = { homepage };
        const result = project_homepage_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '🏠  Project homepage (use empty value to skip)',
            name: 'projectHomepage',
            default: homepage
        });
    });
});
//# sourceMappingURL=project-homepage.spec.js.map