import readme from './readme';
import config, {Config} from "./config"
import infos, {Projectinfo} from './project-infos';
import utils from './utils';
import askQuestions from './ask-questions';
import cleanContext from './clean-context';


/**
 * Main process:
 * 1) Check overwrite README.md
 * 2) Get README template path
 * 3) Gather project infos
 * 4) Ask user questions
 * 5) Clean answer context
 * 6) Build README content
 * 7) Create README.md file
 *
 * @param {Object} args
 */


const mainProcess = async ({
                          customTemplatePath,
                          useDefaultAnswers
                        }: { customTemplatePath: string, useDefaultAnswers: boolean }) => {
  if (!(await readme.checkOverwriteReadme())) return

  const cfg = config.loadCfg()
  customTemplatePath = cfg.customTemplatesDir

  const templatePath = await readme.getReadmeTemplatePath(
    customTemplatePath,
    useDefaultAnswers
  )

  const projectInfo = await infos.getProjectInfos()
  const projectInformation = merge(projectInfo, cfg)

  const answersContext = await askQuestions.askQuestionsFn(
    projectInformation,
    useDefaultAnswers
  )
  const cleanedContext = cleanContext.cleanContextFn(answersContext)
  const readmeContent = await readme.buildReadmeContent(
    cleanedContext,
    templatePath
  )

  await readme.writeReadme(readmeContent)

  utils.showEndMessage()
}

function merge(info: Projectinfo, cfg?: Config): Projectinfo {
  if ((info?.author?.length ?? 0) <= 1 && cfg.authorName.length > 0) {
    info.author = cfg.authorName
  }
  if ((info?.authorWebsite?.length ?? 0) <= 1 && cfg.authorWebsite.length > 0) {
    info.authorWebsite = cfg.authorWebsite
  }
  if ((info?.license?.length ?? 0) <= 1 && cfg.license.length > 0) {
    info.license = cfg.license
  }
  if ((info?.githubUsername?.length ?? 0) <= 1 && cfg.githubUsername.length > 0) {
    info.githubUsername = cfg.githubUsername
  }
  if ((info?.version?.length ?? 0) <= 1 && cfg.projectVersion.length > 0) {
    info.version = cfg.projectVersion
  }
  return info
}

const cli = {
  merge,
  mainProcess
}

export default cli
