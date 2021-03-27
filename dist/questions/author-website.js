"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
module.exports = projectInfos => ({
    type: 'input',
    message: '🏠  Author website (use empty value to skip)',
    name: 'authorWebsite',
    default: (answers) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        return answers.authorGithubUsername !== projectInfos.githubUsername
            ? utils_1.getAuthorWebsiteFromGithubAPI(answers.authorGithubUsername)
            : projectInfos.authorWebsite;
    })
});
//# sourceMappingURL=author-website.js.map