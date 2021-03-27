"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isNil_1 = tslib_1.__importDefault(require("lodash/isNil"));
module.exports = projectInfos => ({
    type: 'input',
    message: '📦  Install command (use empty value to skip)',
    name: 'installCommand',
    default: answers => {
        const packageManager = answers.packageManager || projectInfos.packageManager;
        return isNil_1.default(packageManager) ? undefined : `${packageManager} install`;
    }
});
//# sourceMappingURL=install-command.js.map