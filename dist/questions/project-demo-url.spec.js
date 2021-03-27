"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const project_demo_url_1 = tslib_1.__importDefault(require("./project-demo-url"));
describe('askProjectDemoUrl', () => {
    it('should return the correct question format', () => {
        const result = project_demo_url_1.default();
        expect(result).toEqual({
            type: 'input',
            message: '✨  Project demo url (use empty value to skip)',
            name: 'projectDemoUrl'
        });
    });
});
//# sourceMappingURL=project-demo-url.spec.js.map