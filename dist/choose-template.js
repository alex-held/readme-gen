"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const path_1 = tslib_1.__importDefault(require("path"));
function chooseTemplate(useDefaultAnswers) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const defaultTemplate = path_1.default.resolve(__dirname, '../templates/default.md');
        const defaultNoHtmlTemplate = path_1.default.resolve(__dirname, '../templates/default-no-html.md');
        if (useDefaultAnswers)
            return Promise.resolve(defaultTemplate);
        const question = {
            type: 'list',
            message: '🎨  Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)',
            name: 'templatePath',
            choices: [
                {
                    name: 'Yes ',
                    value: defaultTemplate
                },
                {
                    name: 'No',
                    value: defaultNoHtmlTemplate
                }
            ]
        };
        const templatePath = yield inquirer_1.default.prompt([question]);
        return templatePath;
    });
}
const choose = chooseTemplate;
exports.default = choose;
//# sourceMappingURL=choose-template.js.map