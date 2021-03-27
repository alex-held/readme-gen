"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const license_url_1 = tslib_1.__importDefault(require("./license-url"));
describe('askLicenseUrl', () => {
    it('should return correct question format', () => {
        const licenseUrl = 'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE';
        const projectInfos = { licenseUrl };
        const result = license_url_1.default(projectInfos);
        expect(result).toEqual(expect.objectContaining({
            type: 'input',
            message: '📝  License url (use empty value to skip)',
            name: 'licenseUrl',
            default: licenseUrl
        }));
    });
    it('should show this question if license is defined', () => {
        const projectInfos = {
            licenseUrl: 'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE'
        };
        const answersContext = { licenseName: 'MIT' };
        const question = license_url_1.default(projectInfos);
        const result = question.when(answersContext);
        expect(result).toBe(true);
    });
    it('should not show this question if license is not defined', () => {
        const projectInfos = {
            licenseUrl: 'https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE'
        };
        const answersContext = {};
        const question = license_url_1.default(projectInfos);
        const result = question.when(answersContext);
        expect(result).toBe(false);
    });
});
//# sourceMappingURL=license-url.spec.js.map