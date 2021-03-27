"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const usage_1 = tslib_1.__importDefault(require("./usage"));
describe('askUsage', () => {
    it('should return correct question format', () => {
        const result = usage_1.default();
        expect(result).toEqual(expect.objectContaining({
            type: 'input',
            message: '🚀  Usage command or instruction (use empty value to skip)',
            name: 'usage'
        }));
    });
    it('should return undefined default answer when package manager does not exists', () => {
        const projectInfos = { hasStartCommand: true };
        const result = usage_1.default(projectInfos).default({
            packageManager: undefined
        });
        expect(result).toBeUndefined();
    });
    it('should return undefined default answer when start command does not exists', () => {
        const projectInfos = { hasStartCommand: false };
        const result = usage_1.default(projectInfos).default({
            packageManager: 'yarn'
        });
        expect(result).toBeUndefined();
    });
    it('should return correct default answer when start command and packageManager exists', () => {
        const projectInfos = { hasStartCommand: true };
        const result = usage_1.default(projectInfos).default({
            packageManager: 'yarn'
        });
        expect(result).toEqual('yarn run start');
    });
});
//# sourceMappingURL=usage.spec.js.map