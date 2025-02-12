import inquirer from 'inquirer'
import utils from './utils';
import questionsBuilders from './questions';
import {flatMap} from 'lodash';


/**
 * Ask user questions and return context to generate a README
 *
 * @param {Object} projectInfos
 * @param {Boolean} useDefaultAnswers
 */
const askQuestionsFn = async (projectInfos: any, useDefaultAnswers: boolean) => {
  const questions = flatMap(Object.values(questionsBuilders), questionBuilder =>
    questionBuilder(projectInfos)
  )

  const answersContext = useDefaultAnswers
    ? await utils.getDefaultAnswers(questions)
    : await inquirer.prompt(questions)

  return {
    isGithubRepos: projectInfos.isGithubRepos,
    repositoryUrl: projectInfos.repositoryUrl,
    projectPrerequisites: undefined,
    isProjectOnNpm: utils.isProjectAvailableOnNpm(answersContext.projectName),
    ...answersContext
  }
}

const askQuestions = {
  askQuestionsFn
}

export default askQuestions
