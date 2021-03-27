"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const author_website_1 = tslib_1.__importDefault(require("./author-website"));
jest.mock('node-fetch');
describe('askAuthorWebsite', () => {
    it('should return correct question format', () => {
        const authorWebsite = 'authorWebsite';
        const projectInfos = { authorWebsite };
        const result = author_website_1.default(projectInfos);
        expect(result).toEqual(expect.objectContaining({
            type: 'input',
            message: '🏠  Author website (use empty value to skip)',
            name: 'authorWebsite'
        }));
    });
    it('should return a new website url if user changes its github username with the previous question', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const blog = 'https://www.new-website-url.com/';
        const projectInfos = {
            githubUsername: 'kefranabg',
            authorWebsite: 'https://www.franck-abgrall.me/'
        };
        node_fetch_1.default.mockReturnValueOnce(Promise.resolve({
            json: () => Promise.resolve({ blog })
        }));
        const result = yield author_website_1.default(projectInfos).default({
            authorGithubUsername: 'newGitHubUsername'
        });
        expect(result).toEqual(blog);
    }));
    it('should return project infos website url if github username did not change', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const projectInfos = {
            githubUsername: 'kefranabg',
            authorWebsite: 'https://www.franck-abgrall.me/'
        };
        const result = yield author_website_1.default(projectInfos).default({
            authorGithubUsername: 'kefranabg'
        });
        expect(result).toEqual(projectInfos.authorWebsite);
    }));
});
//# sourceMappingURL=author-website.spec.js.map