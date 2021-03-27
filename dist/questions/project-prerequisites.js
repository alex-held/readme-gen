"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
const isNil_1 = tslib_1.__importDefault(require("lodash/isNil"));
const buildFormattedChoices = engines => isNil_1.default(engines)
    ? null
    : Object.keys(engines).map(key => ({
        name: `${key} ${engines[key]}`,
        value: {
            name: key,
            value: engines[key]
        },
        checked: true
    }));
const hasProjectInfosEngines = projectInfos => !isNil_1.default(projectInfos.engines) && !isEmpty_1.default(projectInfos.engines);
module.exports = projectInfos => ({
    type: 'checkbox',
    message: '⚠️  Project prerequisites',
    name: 'projectPrerequisites',
    choices: buildFormattedChoices(projectInfos.engines),
    when: () => hasProjectInfosEngines(projectInfos)
});
//# sourceMappingURL=project-prerequisites.js.map