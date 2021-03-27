"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const question = {
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
function askOverwriteFn() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const overwriteReadme = yield inquirer_1.default.prompt([question]);
        return overwriteReadme;
    });
}
const askOverwrite = { askOverwriteFn };
exports.default = askOverwrite;
//# sourceMappingURL=ask-overwrite.js.map