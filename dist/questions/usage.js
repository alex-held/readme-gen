"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isNil_1 = tslib_1.__importDefault(require("lodash/isNil"));
module.exports = projectInfos => ({
    type: 'input',
    message: '🚀  Usage command or instruction (use empty value to skip)',
    name: 'usage',
    default: answers => {
        const packageManager = answers.packageManager || projectInfos.packageManager;
        return projectInfos.hasStartCommand && !isNil_1.default(packageManager)
            ? `${packageManager} run start`
            : undefined;
    }
});
//# sourceMappingURL=usage.js.map