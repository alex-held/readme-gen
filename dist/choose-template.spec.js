"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const choose_template_1 = tslib_1.__importDefault(require("./choose-template"));
const path_1 = tslib_1.__importDefault(require("path"));
const defaultTemplatePath = path_1.default.resolve(__dirname, '../templates/default.md');
const defaultNoHtmlTemplatePath = path_1.default.resolve(__dirname, '../templates/default-no-html.md');
inquirer_1.default.prompt = jest.fn(() => Promise.resolve({ templatePath: defaultTemplatePath }));
describe('choose-template', () => {
    it('should return user choice', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const result = yield choose_template_1.default(false);
        expect(result).toEqual(defaultTemplatePath);
    }));
    it('should return default template', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const result = yield choose_template_1.default(true);
        expect(result).toEqual(defaultTemplatePath);
    }));
    it('should call prompt with correct parameters', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield choose_template_1.default(false);
        expect(inquirer_1.default.prompt).toHaveBeenNthCalledWith(1, [
            {
                type: 'list',
                message: '🎨  Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)',
                name: 'templatePath',
                choices: [
                    {
                        name: 'Yes ',
                        value: defaultTemplatePath
                    },
                    {
                        name: 'No',
                        value: defaultNoHtmlTemplatePath
                    }
                ]
            }
        ]);
    }));
});
//# sourceMappingURL=choose-template.spec.js.map