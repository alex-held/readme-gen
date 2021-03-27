import inquirer from 'inquirer'
import path from "path";



async function chooseTemplate(useDefaultAnswers: boolean): Promise<string> {

  const defaultTemplate = path.resolve(__dirname, '../templates/default.md')
  const defaultNoHtmlTemplate = path.resolve(
    __dirname,
    '../templates/default-no-html.md'
  )

  if (useDefaultAnswers) return Promise.resolve(defaultTemplate)

  const question = {
    type: 'list',
    message:
      '🎨  Use HTML in your README.md for a nicer rendering? (not supported everywhere. ex: Bitbucket)',
    name: 'templatePath',
    choices: [
      {
        name: 'Yes ',
        value: defaultTemplate
      },
      {
        name: 'No',
        value: defaultNoHtmlTemplate
      }
    ]
  }

  const templatePath: string = await inquirer.prompt([question])
  return templatePath
}


const choose = chooseTemplate


export default choose
