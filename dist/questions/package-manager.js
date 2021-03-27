"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
module.exports = projectInfos => ({
    type: 'list',
    message: '📦  Choose Package Manager ',
    name: 'packageManager',
    choices: [
        {
            name: 'npm',
            value: 'npm'
        },
        {
            name: 'yarn',
            value: 'yarn'
        }
    ],
    when: () => projectInfos.isJSProject && isEmpty_1.default(projectInfos.packageManager)
});
//# sourceMappingURL=package-manager.js.map