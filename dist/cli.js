"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const readme_1 = tslib_1.__importDefault(require("./readme"));
const config_1 = tslib_1.__importDefault(require("./config"));
const project_infos_1 = tslib_1.__importDefault(require("./project-infos"));
const utils_1 = tslib_1.__importDefault(require("./utils"));
const ask_questions_1 = tslib_1.__importDefault(require("./ask-questions"));
const clean_context_1 = tslib_1.__importDefault(require("./clean-context"));
const mainProcess = ({ customTemplatePath, useDefaultAnswers }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!(yield readme_1.default.checkOverwriteReadme()))
        return;
    const cfg = config_1.default.loadCfg();
    customTemplatePath = cfg.customTemplatesDir;
    const templatePath = yield readme_1.default.getReadmeTemplatePath(customTemplatePath, useDefaultAnswers);
    const projectInfo = yield project_infos_1.default.getProjectInfos();
    const projectInformation = merge(projectInfo, cfg);
    const answersContext = yield ask_questions_1.default.askQuestionsFn(projectInformation, useDefaultAnswers);
    const cleanedContext = clean_context_1.default.cleanContextFn(answersContext);
    const readmeContent = yield readme_1.default.buildReadmeContent(cleanedContext, templatePath);
    yield readme_1.default.writeReadme(readmeContent);
    utils_1.default.showEndMessage();
});
function merge(info, cfg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (((_b = (_a = info === null || info === void 0 ? void 0 : info.author) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) <= 1 && cfg.authorName.length > 0) {
        info.author = cfg.authorName;
    }
    if (((_d = (_c = info === null || info === void 0 ? void 0 : info.authorWebsite) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) <= 1 && cfg.authorWebsite.length > 0) {
        info.authorWebsite = cfg.authorWebsite;
    }
    if (((_f = (_e = info === null || info === void 0 ? void 0 : info.license) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0) <= 1 && cfg.license.length > 0) {
        info.license = cfg.license;
    }
    if (((_h = (_g = info === null || info === void 0 ? void 0 : info.githubUsername) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0) <= 1 && cfg.githubUsername.length > 0) {
        info.githubUsername = cfg.githubUsername;
    }
    if (((_k = (_j = info === null || info === void 0 ? void 0 : info.version) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : 0) <= 1 && cfg.projectVersion.length > 0) {
        info.version = cfg.projectVersion;
    }
    return info;
}
const cli = {
    merge,
    mainProcess
};
exports.default = cli;
//# sourceMappingURL=cli.js.map