"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const clean_context_1 = tslib_1.__importDefault(require("./clean-context"));
describe('cleanContext', () => {
    it('should replace license and projectVersion - and _ characters by -- and __', () => {
        const context = {
            licenseName: 'Apache-2_0',
            projectVersion: '1.0_0-alpha'
        };
        const cleanedContext = {
            licenseName: 'Apache--2__0',
            projectVersion: '1.0__0--alpha'
        };
        const result = clean_context_1.default(context);
        expect(result).toEqual(cleanedContext);
    });
});
//# sourceMappingURL=clean-context.spec.js.map