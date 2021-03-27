"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const project_name_1 = tslib_1.__importDefault(require("./project-name"));
const project_version_1 = tslib_1.__importDefault(require("./project-version"));
const project_description_1 = tslib_1.__importDefault(require("./project-description"));
const package_manager_1 = tslib_1.__importDefault(require("./package-manager"));
const project_homepage_1 = tslib_1.__importDefault(require("./project-homepage"));
const project_demo_url_1 = tslib_1.__importDefault(require("./project-demo-url"));
const project_documentation_url_1 = tslib_1.__importDefault(require("./project-documentation-url"));
const author_name_1 = tslib_1.__importDefault(require("./author-name"));
const author_github_1 = tslib_1.__importDefault(require("./author-github"));
const author_website_1 = tslib_1.__importDefault(require("./author-website"));
const author_twitter_1 = tslib_1.__importDefault(require("./author-twitter"));
const author_linkedin_1 = tslib_1.__importDefault(require("./author-linkedin"));
const author_patreon_1 = tslib_1.__importDefault(require("./author-patreon"));
const project_prerequisites_1 = tslib_1.__importDefault(require("./project-prerequisites"));
const license_name_1 = tslib_1.__importDefault(require("./license-name"));
const license_url_1 = tslib_1.__importDefault(require("./license-url"));
const issues_url_1 = tslib_1.__importDefault(require("./issues-url"));
const contributing_url_1 = tslib_1.__importDefault(require("./contributing-url"));
const install_command_1 = tslib_1.__importDefault(require("./install-command"));
const usage_1 = tslib_1.__importDefault(require("./usage"));
const test_command_1 = tslib_1.__importDefault(require("./test-command"));
const builders = {
    askProjectName: project_name_1.default,
    askProjectVersion: project_version_1.default,
    askProjectDescription: project_description_1.default,
    askPackageManager: package_manager_1.default,
    askProjectHomepage: project_homepage_1.default,
    askProjectDemoUrl: project_demo_url_1.default,
    askProjectDocumentationUrl: project_documentation_url_1.default,
    askAuhtorName: author_name_1.default,
    askAuthorGithub: author_github_1.default,
    askAuthorWebsite: author_website_1.default,
    askAuthorTwitter: author_twitter_1.default,
    askAuthorLinkedIn: author_linkedin_1.default,
    askAuthorPatreon: author_patreon_1.default,
    askProjectPrerequisites: project_prerequisites_1.default,
    askLicenseName: license_name_1.default,
    askLicenseUrl: license_url_1.default,
    askIssuesUrl: issues_url_1.default,
    askContributingUrl: contributing_url_1.default,
    askInstallCommand: install_command_1.default,
    askUsage: usage_1.default,
    askTestCommand: test_command_1.default
};
exports.default = builders;
module.exports = {
    builders,
    askProjectName: project_name_1.default,
    askProjectVersion: project_version_1.default,
    askProjectDescription: project_description_1.default,
    askPackageManager: package_manager_1.default,
    askProjectHomepage: project_homepage_1.default,
    askProjectDemoUrl: project_demo_url_1.default,
    askProjectDocumentationUrl: project_documentation_url_1.default,
    askAuhtorName: author_name_1.default,
    askAuthorGithub: author_github_1.default,
    askAuthorWebsite: author_website_1.default,
    askAuthorTwitter: author_twitter_1.default,
    askAuthorLinkedIn: author_linkedin_1.default,
    askAuthorPatreon: author_patreon_1.default,
    askProjectPrerequisites: project_prerequisites_1.default,
    askLicenseName: license_name_1.default,
    askLicenseUrl: license_url_1.default,
    askIssuesUrl: issues_url_1.default,
    askContributingUrl: contributing_url_1.default,
    askInstallCommand: install_command_1.default,
    askUsage: usage_1.default,
    askTestCommand: test_command_1.default
};
//# sourceMappingURL=index.js.map