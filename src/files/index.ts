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
        "projectName": `"${answers.name}"`,
        "modules": {
            "admin": {
                "enabled": answers.isAdmin,
                "gitRepo": "https://github.com/gochewy/admin.git"
            },
            "content": {
                "enabled": answers.isContent,
                "gitRepo": "https://github.com/gochewy/content.git"
            },
            "graphql": {
                "enabled": answers.isGraphQL,
                "gitRepo": "https://github.com/gochewy/graphql.git"
            },
            "auth": {
                "enabled": answers.isAuth,
                "gitRepo": "https://github.com/gochewy/auth.git"
            },
            "server": {
                "enabled": answers.isServer,
                "gitRepo": "https://github.com/gochewy/server.git"
            },
            "worker": {
                "enabled": answers.isWorker,
                "gitRepo": "https://github.com/gochewy/worker.git"
            },
            "mobile": {
                "enabled": answers.isMobile,
                "gitRepo": "https://github.com/gochewy/mobile.git"
            },
            "analytics": {
                "enabled": answers.isAnalytics,
                "gitRepo": "https://github.com/gochewy/analytics.git"
            },
            "business-intelligence": {
                "enabled": answers.isBI,
                "gitRepo": "https://github.com/gochewy/business-intelligence.git"
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

export const createAppConfigExpo = (answers) => {
    const template = `// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default ({ config }) => {
  return {
    ...config,
    extra: {
      name: '${answers.name}',
      graphql: ${answers.isGraphQL},
      auth: ${answers.isAuth},
    },
  };
};`
    writeFileSync(`./../${answers.name}/mobile/app.config.js`, template)

}
