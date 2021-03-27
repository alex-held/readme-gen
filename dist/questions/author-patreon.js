"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
module.exports = () => ({
    type: 'input',
    message: '❤️  Patreon username (use empty value to skip)',
    name: 'authorPatreonUsername',
    filter: utils_1.cleanSocialNetworkUsername
});
//# sourceMappingURL=author-patreon.js.map