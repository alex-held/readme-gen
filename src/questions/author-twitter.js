import {cleanSocialNetworkUsername} from "../utils";


module.exports = () => ({
  type: 'input',
  message: '🐦  Twitter username (use empty value to skip)',
  name: 'authorTwitterUsername',
  filter: cleanSocialNetworkUsername
})
