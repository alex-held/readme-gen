import inquirer from 'inquirer'

const question = {
  type: 'list',
  message:
    '🚨  readme-md-generator will overwrite your current README.md. Are you sure you want to continue? ',
  name: 'overwriteReadme',
  choices: [
    {
      name: 'No',
      value: false
    },
    {
      name: 'Yes ',
      value: true
    }
  ]
}

export interface readmeQuestion {
  type: string,
  message: string,
  name: string,
  choices: [{ name: string, value: boolean }],
}

async function askOverwriteFn(): Promise<boolean> {
  const overwriteReadme = await inquirer.prompt<boolean>([question])
  return overwriteReadme
}


const askOverwrite = {askOverwriteFn}


/**
 * Ask users if they want to overwrite the existing README
 */
export default askOverwrite


