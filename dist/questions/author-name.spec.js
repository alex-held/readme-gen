"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const author_name_1 = tslib_1.__importDefault(require("./author-name"));
describe('askAuthorName', () => {
    it('should return correct question format', () => {
        const author = 'Franck Abgrall';
        const projectInfos = { author };
        const result = author_name_1.default(projectInfos);
        expect(result).toEqual({
            type: 'input',
            message: '👤  Author name',
            name: 'authorName',
            default: author
        });
    });
});
//# sourceMappingURL=author-name.spec.js.map