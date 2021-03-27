"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const author_patreon_1 = tslib_1.__importDefault(require("./author-patreon"));
describe('askPatreonUsername', () => {
    it('should return correct question format', () => {
        const result = author_patreon_1.default();
        expect(result).toEqual({
            type: 'input',
            message: '❤️  Patreon username (use empty value to skip)',
            name: 'authorPatreonUsername',
            filter: expect.any(Function)
        });
    });
});
//# sourceMappingURL=author-patreon.spec.js.map