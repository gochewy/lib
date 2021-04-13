import {readFileSync, writeFile, writeFileSync} from 'fs'
const findUp = require('find-up')

export type Answers=  {
    isAppsmith: boolean;
    isRabbitMQ: boolean;
}

export const checkFile = () => {
    let cwd = process.cwd()
    const file = findUp.sync('package.json', {
        cwd,
        type: 'file'
    })
    if(file) {
        console.log("file found", file)
    }
    return file
}

export const help = () => "rein gell"

export const envCreator = (dir: string, subdir: string) => {
    // eslint-disable-next-line no-console
    const log = console.log
    const data = readFileSync(`./../${dir}/${subdir}/sample.env`)
    writeFile(`./../${dir}/${subdir}/.env`, data, err => {
        if (err) {
            log(err)
        }
    })
}

export const fileGenerator = (answers: Answers, dir: string) => {
    const template =  `{
  "dev": {
  "projectName": "Chewy-Stack",
    "modulesEnabled": {
      "directus": true,
      "appsmith": ${answers.isAppsmith},
      "client": true,
      "server": true,
      "worker": true
  },
  "servicesEnabled": {
    "rabbitMQ": ${answers.isRabbitMQ}
  }
}
}`
    writeFileSync(`./../${dir}/project-config.json`, template)
}
