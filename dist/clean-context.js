"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanContextFn = (context) => {
    const cleanBadgeText = (text) => text.replace(/-/g, '--').replace(/_/g, '__');
    const licenseName = context.licenseName
        .replace(/-/g, '--')
        .replace(/_/g, '__');
    const projectVersion = cleanBadgeText(context.projectVersion);
    return Object.assign(Object.assign({}, context), { licenseName,
        projectVersion });
};
const cleanContext = {
    cleanContextFn
};
exports.default = cleanContext;
//# sourceMappingURL=clean-context.js.map