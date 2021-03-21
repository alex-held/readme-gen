import {cleanSocialNetworkUsername} from "../utils";


module.exports = projectInfos => ({
  type: 'input',
  message: '👤  GitHub username (use empty value to skip)',
  name: 'authorGithubUsername',
  default: projectInfos.githubUsername,
  filter: cleanSocialNetworkUsername
})
