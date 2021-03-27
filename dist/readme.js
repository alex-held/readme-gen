"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ejs_1 = tslib_1.__importDefault(require("ejs"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const util_1 = require("util");
const date_fns_1 = require("date-fns");
const fs_1 = tslib_1.__importDefault(require("fs"));
const lodash_1 = require("lodash");
const choose_template_1 = tslib_1.__importDefault(require("./choose-template"));
const ask_overwrite_1 = tslib_1.__importDefault(require("./ask-overwrite"));
const README_PATH = 'README.md';
const writeReadme = (readmeContent) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora_1.default('Creating README').start();
    try {
        yield util_1.promisify(fs_1.default.writeFile)(README_PATH, lodash_1.unescape(readmeContent));
        spinner.succeed('README created');
    }
    catch (err) {
        spinner.fail('README creation fail');
        throw err;
    }
});
const getReadmeTemplate = (templatePath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora_1.default('Loading README template').start();
    try {
        const template = yield util_1.promisify(fs_1.default.readFile)(templatePath, 'utf8');
        spinner.succeed('README template loaded');
        return template;
    }
    catch (err) {
        spinner.fail('README template loading fail');
        throw err;
    }
});
const buildReadmeContent = (context, templatePath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const currentYear = date_fns_1.getYear(new Date());
    const template = yield getReadmeTemplate(templatePath);
    return ejs_1.default.render(template, Object.assign({ filename: templatePath, currentYear }, context));
});
const validateReadmeTemplatePath = (templatePath) => {
    const spinner = ora_1.default('Resolving README template path').start();
    try {
        fs_1.default.lstatSync(templatePath).isFile();
    }
    catch (err) {
        spinner.fail(`The template path '${templatePath}' is not valid.`);
        throw err;
    }
    spinner.succeed('README template path resolved');
};
const getReadmeTemplatePath = (customTemplate, useDefaultAnswers) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const templatePath = lodash_1.isNil(customTemplate)
        ? yield choose_template_1.default(useDefaultAnswers)
        : customTemplate;
    validateReadmeTemplatePath(templatePath);
    return templatePath;
});
const checkOverwriteReadme = () => {
    if (!fs_1.default.existsSync(README_PATH) || ask_overwrite_1.default.askOverwriteFn())
        return Promise.resolve(true);
    else
        return Promise.resolve(false);
};
const readme = {
    README_PATH,
    writeReadme,
    buildReadmeContent,
    getReadmeTemplatePath,
    checkOverwriteReadme,
};
exports.default = readme;
//# sourceMappingURL=readme.js.map