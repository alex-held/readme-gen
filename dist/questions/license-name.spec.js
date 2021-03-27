"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const license_name_1 = tslib_1.__importDefault(require("./license-name"));
describe('askLicenseName', () => {
    it('should return correct question format', () => {
        const licenseName = 'MIT';
        const projectInfos = { licenseName };
        const result = license_name_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '📝  License name (use empty value to skip)',
            name: 'licenseName',
            default: licenseName
        });
    });
});
//# sourceMappingURL=license-name.spec.js.map