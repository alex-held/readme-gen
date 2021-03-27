import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

/**
 * Return engines as formatted choices
 *
 * @param {Object} engines
 */
const buildFormattedChoices = engines =>
  isNil(engines)
    ? null
    : Object.keys(engines).map(key => ({
      name: `${key} ${engines[key]}`,
      value: {
        name: key,
        value: engines[key]
      },
      checked: true
    }))

/**
 * Check if pinfo has engines properties
 *
 * @param {Object} projectInfos
 */
const hasProjectInfosEngines = projectInfos =>
  !isNil(projectInfos.engines) && !isEmpty(projectInfos.engines)

module.exports = projectInfos => ({
  type: 'checkbox',
  message: '⚠️  Project prerequisites',
  name: 'projectPrerequisites',
  choices: buildFormattedChoices(projectInfos.engines),
  when: () => hasProjectInfosEngines(projectInfos)
})
