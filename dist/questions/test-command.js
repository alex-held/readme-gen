"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isNil_1 = tslib_1.__importDefault(require("lodash/isNil"));
module.exports = projectInfos => ({
    type: 'input',
    message: '✅  Test command (use empty value to skip)',
    name: 'testCommand',
    default: answers => {
        const packageManager = answers.packageManager || projectInfos.packageManager;
        return projectInfos.hasTestCommand && !isNil_1.default(packageManager)
            ? `${packageManager} run test`
            : undefined;
    }
});
//# sourceMappingURL=test-command.js.map