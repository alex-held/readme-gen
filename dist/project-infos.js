"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isNil_1 = tslib_1.__importDefault(require("lodash/isNil"));
const get_1 = tslib_1.__importDefault(require("lodash/get"));
const has_1 = tslib_1.__importDefault(require("lodash/has"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const child_process_1 = require("child_process");
const utils_1 = tslib_1.__importStar(require("./utils"));
const GITHUB_URL = 'https://github.com/';
const cleanReposUrl = (reposUrl) => reposUrl
    .replace('\n', '')
    .replace('git+', '')
    .replace('.git', '');
const getReposUrlFromPackageJson = (packageJson) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const reposUrl = get_1.default(packageJson, 'repository.url', undefined);
    return isNil_1.default(reposUrl) ? undefined : cleanReposUrl(reposUrl);
});
const getReposUrlFromGit = () => {
    try {
        const stdoutBuffer = child_process_1.execSync('git config --get remote.origin.url');
        const stdoutString = stdoutBuffer.toString();
        return cleanReposUrl(stdoutString);
    }
    catch (err) {
        return undefined;
    }
};
const getReposUrl = (packageJson) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield getReposUrlFromPackageJson(packageJson)) || getReposUrlFromGit(); });
const getReposIssuesUrl = (packageJson) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let reposIssuesUrl = get_1.default(packageJson, 'bugs.url', undefined);
    if (isNil_1.default(reposIssuesUrl)) {
        const reposUrl = yield getReposUrl(packageJson);
        if (!isNil_1.default(reposUrl)) {
            reposIssuesUrl = `${reposUrl}/issues`;
        }
    }
    return reposIssuesUrl;
});
const isGithubRepository = (repositoryUrl) => !isNil_1.default(repositoryUrl) && repositoryUrl.includes(GITHUB_URL);
const getGithubUsernameFromRepositoryUrl = (repositoryUrl) => repositoryUrl.replace(GITHUB_URL, '').split('/')[0];
const getLicenseUrlFromGithubRepositoryUrl = (repositoryUrl) => `${repositoryUrl}/blob/master/LICENSE`;
const getReadmeUrlFromGithubRepositoryUrl = (repositoryUrl) => `${repositoryUrl}#readme`;
const getContributingUrlFromRepositoryUrl = (repositoryUrl) => `${repositoryUrl}/blob/master/CONTRIBUTING.md`;
const getAuthorName = (packageJson) => {
    if (has_1.default(packageJson, 'author.name')) {
        return get_1.default(packageJson, 'author.name', undefined);
    }
    if (has_1.default(packageJson, 'author') && typeof packageJson.author === 'string') {
        return get_1.default(packageJson, 'author', undefined);
    }
    return undefined;
};
const getProjectInfos = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora_1.default('Gathering project infos').start();
    const packageJson = yield utils_1.default.getPackageJson();
    const isJSProject = !!packageJson;
    const packageManager = isJSProject
        ? utils_1.default.getPackageManagerFromLockFile()
        : undefined;
    const name = utils_1.default.getProjectName(packageJson);
    const description = get_1.default(packageJson, 'description', undefined);
    const engines = get_1.default(packageJson, 'engines', undefined);
    const author = getAuthorName(packageJson);
    const version = get_1.default(packageJson, 'version', undefined);
    const licenseName = get_1.default(packageJson, 'license', undefined);
    const homepage = get_1.default(packageJson, 'homepage', undefined);
    const hasStartCommand = has_1.default(packageJson, 'scripts.start');
    const hasTestCommand = has_1.default(packageJson, 'scripts.test');
    const repositoryUrl = yield getReposUrl(packageJson);
    const issuesUrl = yield getReposIssuesUrl(packageJson);
    const isGithubRepos = isGithubRepository(repositoryUrl);
    const contributingUrl = repositoryUrl
        ? getContributingUrlFromRepositoryUrl(repositoryUrl)
        : undefined;
    const documentationUrl = isGithubRepos
        ? getReadmeUrlFromGithubRepositoryUrl(repositoryUrl)
        : undefined;
    const githubUsername = isGithubRepos
        ? getGithubUsernameFromRepositoryUrl(repositoryUrl)
        : undefined;
    const authorWebsite = githubUsername
        ? yield utils_1.default.getAuthorWebsiteFromGithubAPI(githubUsername)
        : undefined;
    const licenseUrl = isGithubRepos
        ? getLicenseUrlFromGithubRepositoryUrl(repositoryUrl)
        : undefined;
    spinner.succeed('Project infos gathered');
    const info = utils_1.PackageJson.ForceCreateUnsafeFromInterface({
        name,
        description,
        version,
        author: {
            name: author,
            url: authorWebsite
        },
        homepage,
        repositoryUrl,
        issuesUrl,
        contributingUrl,
        githubUsername,
        engines,
        license: licenseName,
        licenseUrl,
        documentationUrl,
        isGithubRepos,
        hasStartCommand,
        hasTestCommand,
        isJSProject,
        packageManager
    });
    return info;
});
const infos = {
    cleanReposUrl,
    getReposUrlFromPackageJson,
    getReposUrlFromGit,
    getReposUrl,
    getReposIssuesUrl,
    isGithubRepository,
    getGithubUsernameFromRepositoryUrl,
    getLicenseUrlFromGithubRepositoryUrl,
    getReadmeUrlFromGithubRepositoryUrl,
    getContributingUrlFromRepositoryUrl,
    getProjectInfos
};
exports.default = infos;
//# sourceMappingURL=project-infos.js.map