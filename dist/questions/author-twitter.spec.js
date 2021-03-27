"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const author_twitter_1 = tslib_1.__importDefault(require("./author-twitter"));
describe('askAuthorTwitter', () => {
    it('should return correct question format', () => {
        const result = author_twitter_1.default();
        expect(result).toEqual({
            type: 'input',
            message: '🐦  Twitter username (use empty value to skip)',
            name: 'authorTwitterUsername',
            filter: expect.any(Function)
        });
    });
});
//# sourceMappingURL=author-twitter.spec.js.map