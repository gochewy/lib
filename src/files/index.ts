import {readFileSync, writeFile, writeFileSync} from 'fs'
import * as chalk from 'chalk'
import * as fs from "fs";
import { Answers} from "./constants";

const findUp = require('find-up')


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

export const configFileGenerator = (answers: Answers) => {
    const template = {
  dev: {
  projectName: answers.name,
    modulesEnabled: {
      content: answers.isContent,
      admin: answers.isAdmin,
      web: true,
      server: answers.isServer,
      worker: answers.isWorker,
      graphql: answers.isGraphQL,
      auth: answers.isAuth,
      mobile: answers.isMobile
      }
  }
}
    writeFileSync(`./../${answers.name}/chewy.json`, JSON.stringify(template, null,2))
}

export const createProjectDirectory = (directory) => {
    fs.mkdirSync(`./../${directory}`, {recursive: true})
    log(chalk.greenBright(`Created directory named: ${directory}`))
}

export const createGitIgnore = (dir: string) => {
    const fileContent = `/data`
    fs.appendFileSync(`./../${dir}/admin/.gitignore`, fileContent)
}
