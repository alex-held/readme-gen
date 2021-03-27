"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const project_version_1 = tslib_1.__importDefault(require("./project-version"));
describe('askProjectVersion', () => {
    it('should return correct question format', () => {
        const version = '1.0.0';
        const projectInfos = { version };
        const result = project_version_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: 'ℹ️  Project version (use empty value to skip)',
            name: 'projectVersion',
            default: version
        });
    });
});
//# sourceMappingURL=project-version.spec.js.map