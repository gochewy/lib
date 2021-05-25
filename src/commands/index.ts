import {execSync} from "child_process";
import {Answers} from "../files/constants";
import {configFileGenerator, createConfig, createProjectDirectory, rootGitIgnore, rootReadmeFile} from "../files";
const modules = require('../../project.json').modules

export const initGitRepo = (directory: string) => {
    execSync(`cd .. && cd ${directory} && git init && git add . && git commit --allow-empty -n -m "add subtree"`)
    // execSync(`cd .. && cd ${directory} && git commit -m "adding subtree"`)
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
  execSync(`cd .. && cd ${directory} && git subtree add --prefix ${module} ${url} main --squash`)
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
