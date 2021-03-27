"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const ask_overwrite_1 = tslib_1.__importDefault(require("./ask-overwrite"));
const expectedQuestion = {
    type: 'list',
    message: '🚨  readme-md-generator will overwrite your current README.md. Are you sure you want to continue? ',
    name: 'overwriteReadme',
    choices: [
        {
            name: 'No',
            value: false
        },
        {
            name: 'Yes ',
            value: true
        }
    ]
};
inquirer_1.default.prompt = jest.fn(items => Promise.resolve(items.reduce((result, item) => {
    result[item.name] = 'value';
    return result;
}, {})));
describe('ask-overwrite', () => {
    beforeEach(() => {
        inquirer_1.default.prompt.mockClear();
    });
    it('should call prompt right questions', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield ask_overwrite_1.default();
        expect(inquirer_1.default.prompt).toHaveBeenCalledWith([expectedQuestion]);
    }));
    it('should return the right value', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        expect(yield ask_overwrite_1.default()).toEqual('value');
    }));
});
//# sourceMappingURL=ask-overwrite.spec.js.map