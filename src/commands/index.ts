import {execSync} from "child_process";
import {Answers} from "../files/constants";
import {configFileGenerator, createConfig, createProjectDirectory, rootGitIgnore, rootReadmeFile} from "../files";
const modules = require('../../project.json').modules

export const installMinimalProject = async (directory: string, answers: Answers) => {
    await createProjectDirectory(directory);
    configFileGenerator(answers);
    rootGitIgnore(directory);
    rootReadmeFile(directory)
    addSubtrees(directory, 'web', modules["web"].gitRepo)
}
export const addSubtrees = (directory: string, module: string, url: string) => {
  execSync(`cd .. && cd ${directory} && git subtree add --prefix ${module} ${url} main --squash`)
}
export const installAllApps = async (directory: string, answers: Answers) => {
    await installMinimalProject(directory, answers);
    Object.keys(modules).map(module => {
        addSubtrees(directory, module, modules[module].gitRepo)
    })
}

export const installCustomApps = async (directory: string, answers: Answers )=> {
    await installMinimalProject(directory, answers);
    for (const answer in answers) {
        if(answers.hasOwnProperty(answer)) {
            if(answers[answer] === true)
                addSubtrees(directory, answer, modules[answer].gitRepo)
        }
    }
}
