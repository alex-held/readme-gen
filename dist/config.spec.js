"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const os_1 = tslib_1.__importDefault(require("os"));
const config_1 = tslib_1.__importDefault(require("./config"));
const userHome = '/some/path/to/user/home';
const cfgRootPath = `${userHome}/.genctl/readme-md-generator`;
const cfgFilePath = `${cfgRootPath}/config.json`;
const templatesPath = `${cfgRootPath}/templates`;
const defaultCfg = {
    customTemplatesDir: templatesPath,
    useHTML: false,
    projectVersion: '0.0.1',
    authorName: '',
    authorWebsite: '',
    githubUsername: '',
    twitterUsername: '',
    linkedinUsername: '',
    patreonUsername: '',
    license: '',
};
function createCfg(map) {
    const defaultCfg = {
        customTemplatesDir: templatesPath,
        useHTML: false,
        projectVersion: '0.0.1',
        authorName: '',
        authorWebsite: '',
        githubUsername: '',
        twitterUsername: '',
        linkedinUsername: '',
        patreonUsername: '',
        license: '',
    };
    return map != null ? map(defaultCfg) : defaultCfg;
}
jest.mock('os');
os_1.default.homedir = jest.fn().mockReturnValue(userHome);
describe('config', () => {
    describe('getDefaultCfgPath', () => {
        it('should return default config', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const expected = cfgFilePath;
            const actual = config_1.default.getDefaultCfgPath();
            expect(actual).toEqual(expected);
        }));
    });
    describe('newDefaultConfig', () => {
        it('should return default config', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const expectCfg = createCfg();
            const result = config_1.default.newDefaultConfig();
            expect(result).toEqual(expectCfg);
        }));
    });
    describe('loadCfg', () => {
        let expected = {
            customTemplatesDir: templatesPath,
            useHTML: true,
            authorName: 'Max Mustermann',
            authorWebsite: 'example.com',
            githubUsername: 'max-mustermann',
            projectVersion: '1.0.0',
            twitterUsername: '@max',
            linkedinUsername: 'max-mustermann',
            patreonUsername: 'max-mustermann',
            license: 'MIT'
        };
        const expectedJson = JSON.stringify(expected);
        const cfgFilePath = `${cfgRootPath}/config.json`;
        beforeEach(() => {
            jest.mock('fs');
            fs_1.default.readFileSync = jest.fn().mockImplementation((cfgPath, _opt) => {
                if (cfgPath != cfgFilePath) {
                    return Buffer.from("");
                }
                else {
                    return Buffer.from(expectedJson);
                }
            });
        });
        it('should return default config', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const actual = config_1.default.loadCfg(cfgFilePath);
            expect(actual).toEqual(expected);
        }));
    });
    it('should return the default path', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const expected = cfgRootPath;
        const actual = config_1.default.getDefaultCfgRoot();
        expect(actual).toEqual(expected);
    }));
});
//# sourceMappingURL=config.spec.js.map