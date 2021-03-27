"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
module.exports = projectInfos => ({
    type: 'input',
    message: '👤  GitHub username (use empty value to skip)',
    name: 'authorGithubUsername',
    default: projectInfos.githubUsername,
    filter: utils_1.cleanSocialNetworkUsername
});
//# sourceMappingURL=author-github.js.map