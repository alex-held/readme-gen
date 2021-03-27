"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const test_command_1 = tslib_1.__importDefault(require("./test-command"));
describe('askTestCommand', () => {
    it('should return correct question format', () => {
        const result = test_command_1.default();
        expect(result).toEqual(expect.objectContaining({
            type: 'input',
            message: '✅  Test command (use empty value to skip)',
            name: 'testCommand'
        }));
    });
    it('should return undefined default answer when package manager does not exists', () => {
        const projectInfos = { hasTestCommand: true };
        const result = test_command_1.default(projectInfos).default({
            packageManager: undefined
        });
        expect(result).toBeUndefined();
    });
    it('should return undefined default answer when test command does not exists', () => {
        const projectInfos = { hasTestCommand: false };
        const result = test_command_1.default(projectInfos).default({
            packageManager: 'yarn'
        });
        expect(result).toBeUndefined();
    });
    it('should return correct default answer when start command and package manager exists', () => {
        const projectInfos = { hasTestCommand: true };
        const result = test_command_1.default(projectInfos).default({
            packageManager: 'yarn'
        });
        expect(result).toEqual('yarn run test');
    });
});
//# sourceMappingURL=test-command.spec.js.map