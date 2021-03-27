"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
module.exports = projectInfos => ({
    type: 'input',
    message: '📝  License url (use empty value to skip)',
    name: 'licenseUrl',
    default: projectInfos.licenseUrl,
    when: answersContext => !isEmpty_1.default(answersContext.licenseName)
});
//# sourceMappingURL=license-url.js.map