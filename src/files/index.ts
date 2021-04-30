import {readFileSync, writeFile, writeFileSync} from 'fs'
import * as chalk from 'chalk'
import * as fs from "fs";
const findUp = require('find-up')

export type Answers=  {
    isAppsmith: boolean;
    isRabbitMQ: boolean;
    isContent: boolean;
}
const log = console.log;
export const checkFile = () => {
    let cwd = process.cwd()
    const file = findUp.sync('project-config.json', {
        cwd,
        type: 'file'
    })
    if(file) {
        console.log("file found", file)
    }
    return file
}

export const getDirName = () => {
    return require('./../../config.json').directory
}

export const createConfig = (dir) => {
    const fileTemplate = `{
    "directory": "${dir}"
    }`
    writeFileSync('./config.json', fileTemplate)
}

export const envCreator = (dir: string, subdir: string) => {
    const data = readFileSync(`./../${dir}/${subdir}/sample.env`)
    writeFile(`./../${dir}/${subdir}/.env`, data, err => {
        if (err) {
            log(err)
        }
    })
}

export const configFileGenerator = (answers: Answers, dir: string) => {
    const template = {
  dev: {
  projectName: "Chewy-Stack",
    modulesEnabled: {
      directus: answers.isContent,
      appsmith: answers.isAppsmith,
      client: true,
      server: true,
      worker: answers.isRabbitMQ
      }
  }
}
    writeFileSync(`./../${dir}/project-config.json`, JSON.stringify(template))
}

export const createProjectDirectory = (directory) => {
    fs.mkdirSync(`./../${directory}`, {recursive: true})
    log(chalk.greenBright(`Created directory named: ${directory}`))
}
