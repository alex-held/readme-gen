/* eslint-disable global-require */
import project_name from "./project-name";
import project_version from "./project-version";
import project_description from "./project-description";
import package_manager from "./package-manager";
import project_homepage from "./project-homepage";
import project_demo_url from "./project-demo-url";
import project_documentation_url from "./project-documentation-url";
import author_name from "./author-name";
import author_github from "./author-github";
import author_website from "./author-website";
import author_twitter from "./author-twitter";
import author_linkedin from "./author-linkedin";
import author_patreon from "./author-patreon";
import project_prerequisites from "./project-prerequisites";
import license_name from "./license-name";
import license_url from "./license-url";
import issues_url from "./issues-url";
import contributing_url from "./contributing-url";
import install_command from "./install-command";
import usage from "./usage";
import test_command from "./test-command";


const builders = {
  askProjectName: project_name,
  askProjectVersion: project_version,
  askProjectDescription: project_description,
  askPackageManager: package_manager,
  askProjectHomepage: project_homepage,
  askProjectDemoUrl: project_demo_url,
  askProjectDocumentationUrl: project_documentation_url,
  askAuhtorName: author_name,
  askAuthorGithub: author_github,
  askAuthorWebsite: author_website,
  askAuthorTwitter: author_twitter,
  askAuthorLinkedIn: author_linkedin,
  askAuthorPatreon: author_patreon,
  askProjectPrerequisites: project_prerequisites,
  askLicenseName: license_name,
  askLicenseUrl: license_url,
  askIssuesUrl: issues_url,
  askContributingUrl: contributing_url,
  askInstallCommand: install_command,
  askUsage: usage,
  askTestCommand: test_command
}

export default builders

module.exports = {
  builders,
  askProjectName: project_name,
  askProjectVersion: project_version,
  askProjectDescription: project_description,
  askPackageManager: package_manager,
  askProjectHomepage: project_homepage,
  askProjectDemoUrl: project_demo_url,
  askProjectDocumentationUrl: project_documentation_url,
  askAuhtorName: author_name,
  askAuthorGithub: author_github,
  askAuthorWebsite: author_website,
  askAuthorTwitter: author_twitter,
  askAuthorLinkedIn: author_linkedin,
  askAuthorPatreon: author_patreon,
  askProjectPrerequisites: project_prerequisites,
  askLicenseName: license_name,
  askLicenseUrl: license_url,
  askIssuesUrl: issues_url,
  askContributingUrl: contributing_url,
  askInstallCommand: install_command,
  askUsage: usage,
  askTestCommand: test_command
}
