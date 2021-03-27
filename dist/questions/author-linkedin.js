"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
module.exports = () => ({
    type: 'input',
    message: '💼  LinkedIn username (use empty value to skip)',
    name: 'authorLinkedInUsername',
    filter: utils_1.cleanSocialNetworkUsername
});
//# sourceMappingURL=author-linkedin.js.map