"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const author_linkedin_1 = tslib_1.__importDefault(require("./author-linkedin"));
describe('askAuthorLinkedIn', () => {
    it('should return correct question format', () => {
        const result = author_linkedin_1.default();
        expect(result).toEqual({
            type: 'input',
            message: '💼  LinkedIn username (use empty value to skip)',
            name: 'authorLinkedInUsername',
            filter: expect.any(Function)
        });
    });
});
//# sourceMappingURL=author-linkedin.spec.js.map