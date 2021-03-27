"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
module.exports = () => ({
    type: 'input',
    message: '🐦  Twitter username (use empty value to skip)',
    name: 'authorTwitterUsername',
    filter: utils_1.cleanSocialNetworkUsername
});
//# sourceMappingURL=author-twitter.js.map