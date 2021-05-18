import {execSync} from "child_process";
import {Answers} from "../files/constants";
const modules = require('../../project.json').modules

export const installMinimalProject = (directory: string) => {
    execSync(`git clone -b 22-setup-subtree-for-the-project https://gitlab.com/ephemerecreative/x-stack.git ./../${directory}`)
}
export const addSubtrees = (directory: string, module: string, url: string) => {
  execSync(`cd .. && cd ${directory} && git subtree add --prefix ${module} ${url} main --squash`)
}
export const installAllApps = async (directory: string) => {
    await installMinimalProject(directory);
    Object.keys(modules).map(module => {
        addSubtrees(directory, module, modules[module].gitRepo)
    })
}

export const installCustomApps = async (directory: string, answers: Answers )=> {
    await installMinimalProject(directory);

}
