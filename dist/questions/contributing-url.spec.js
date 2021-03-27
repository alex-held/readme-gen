"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const contributing_url_1 = tslib_1.__importDefault(require("./contributing-url"));
describe('askContributingUrl', () => {
    it('should return correct question format', () => {
        const contributingUrl = 'https://github.com/kefranabg/readme-md-generator/blob/master/CONTRIBUTING.md';
        const projectInfos = { contributingUrl };
        const result = contributing_url_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '🤝  Contributing guide url (use empty value to skip)',
            name: 'contributingUrl',
            default: contributingUrl
        });
    });
});
//# sourceMappingURL=contributing-url.spec.js.map