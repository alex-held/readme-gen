/**
 * Clean answer context
 *
 * @param {ReadmeContext} context
 */

const cleanContextFn = (context: ReadmeContext) => {
  const cleanBadgeText = (text: string) => text.replace(/-/g, '--').replace(/_/g, '__')

  // Why doing this?
  // See https://github.com/kefranabg/readme-md-generator/pull/141
  const licenseName = context.licenseName
    .replace(/-/g, '--')
    .replace(/_/g, '__')
  const projectVersion = cleanBadgeText(context.projectVersion)

  return {
    ...context,
    licenseName,
    projectVersion
  }
}

export interface ReadmeContext {
  projectName?: string
  licenseName?: string;
  projectVersion?: string;
}

const cleanContext = {
  cleanContextFn
}
export default cleanContext

