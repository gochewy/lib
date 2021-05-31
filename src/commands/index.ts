import {exec, execSync} from "child_process";
import * as path from "path";
import {Answers} from "../files/constants";
import {configFileGenerator, createConfig, createProjectDirectory, rootGitIgnore, rootReadmeFile} from "../files";
const modules = require('../../project.json').modules

const config = require(path.resolve(process.cwd(), "chewy.json"));

export const initGitRepo = (directory: string) => {
    execSync(`cd ${directory} && git init && git add . && git commit --allow-empty -n -m "add subtree"`)
}

export const installMinimalProject = async (answers: Answers) => {
    await createProjectDirectory(answers.name);
    await initGitRepo(answers.name)
    await addSubtrees(answers.name, 'web', modules["web"].gitRepo)
    configFileGenerator(answers);
    rootGitIgnore(answers.name);
    rootReadmeFile(answers.name)
}
export const addSubtrees = (directory: string, module: string, url: string) => {
  execSync(`cd ${directory} && git subtree add --prefix ${module} ${url} main --squash`)
}
export const installAllApps = async (answers: Answers) => {
    await installMinimalProject(answers);
    Object.keys(modules).map(module => {
        if(module !== 'web') {
            addSubtrees(answers.name, module, modules[module].gitRepo)
        }
    })
}

export const installCustomApps = async (answers: Answers )=> {
    await installMinimalProject(answers);
    for (const answer in answers) {
        if(answers.hasOwnProperty(answer)) {
            if (answer !== 'name') {
                console.log(modules[answer])
                if(modules[answer].enabled === true)
                    addSubtrees(answers.name, answer, modules[answer].gitRepo)
            }
        }
    }
}

export const startDocker = () => {
    const modules = config.modules;
    let string: string = '';
    Object.entries(modules).forEach(([key, value]: any) => {
        if (value.containerized === true) {
            string = string + ` -f ${key}/docker-compose.yml`;
        }
    })
    let startCommand = `docker-compose -f docker-compose.yml${string} up -d`
    exec(`${startCommand}`, (error, stdout, stderr) => {
        if(error) {
            console.error(`Error: ${error}`)
        }
        console.log(stdout);
        console.error(`Error: ${stderr}`);
    })
}

export const stopDocker = () => {
    const modules = config.modules;
    let string: string = '';
    Object.entries(modules).forEach(([key, value]: any) => {
        if (value.containerized === true) {
            string = string + ` -f ${key}/docker-compose.yml`;
        }
    })
    let stopCommand = `docker-compose -f docker-compose.yml${string} down`
    exec(`${stopCommand}`, (error, stdout, stderr) => {
        if(error) {
            console.error(`Error: ${error}`)
        }
        console.log(stdout);
        console.error(`Error: ${stderr}`);
    })
}
