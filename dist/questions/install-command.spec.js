"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const install_command_1 = tslib_1.__importDefault(require("./install-command"));
describe('askInstallCommand', () => {
    it('should return correct question format', () => {
        const result = install_command_1.default();
        expect(result).toEqual(expect.objectContaining({
            type: 'input',
            message: '📦  Install command (use empty value to skip)',
            name: 'installCommand'
        }));
    });
    it('should return undefined default answer when package manager is not defined', () => {
        const projectInfos = {};
        const result = install_command_1.default(projectInfos).default({
            packageManager: undefined
        });
        expect(result).toBeUndefined();
    });
    it('should return correct default answer when package manager is defined', () => {
        const projectInfos = {};
        const result = install_command_1.default(projectInfos).default({
            packageManager: 'yarn'
        });
        expect(result).toEqual('yarn install');
    });
});
//# sourceMappingURL=install-command.spec.js.map