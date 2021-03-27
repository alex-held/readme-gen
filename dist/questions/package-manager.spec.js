"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const package_manager_1 = tslib_1.__importDefault(require("./package-manager"));
const expectedQuestion = {
    type: 'list',
    message: '📦  Choose Package Manager ',
    name: 'packageManager',
    choices: [
        {
            name: 'npm',
            value: 'npm'
        },
        {
            name: 'yarn',
            value: 'yarn'
        }
    ]
};
describe('askPackageManager', () => {
    it('should return correct question format when package manager is undefined', () => {
        const projectInfos = { packageManager: undefined };
        const result = package_manager_1.default(projectInfos);
        expect(result).toEqual(expect.objectContaining(expectedQuestion));
    });
    it('should not show question for a non JS Project', () => {
        const projectInfos = { isJSProject: false, packageManager: undefined };
        const result = package_manager_1.default(projectInfos).when(projectInfos);
        expect(result).toBe(false);
    });
    it('should not show question when package manager has already been detected', () => {
        const projectInfos = { isJSProject: true, packageManager: 'yarn' };
        const result = package_manager_1.default(projectInfos).when(projectInfos);
        expect(result).toBe(false);
    });
    it('should show question when package manager is undefined and if project is JS', () => {
        const projectInfos = { isJSProject: true, packageManager: undefined };
        const result = package_manager_1.default(projectInfos).when(projectInfos);
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=package-manager.spec.js.map