import { exec, execSync } from 'child_process';
import * as path from 'path';
import {
  configFileGenerator,
  createProjectDirectory,
  rootGitIgnore,
  rootReadmeFile,
} from '../files/index-old';
import { Answers } from '../files/constants-old';
const modules = require('../../project.json').modules;

export const initGitRepo = (directory: string) => {
  execSync(
    `cd ${directory} && git init && git add . && git commit --allow-empty -n -m "add subtree"`
  );
};

export const addSubtrees = (directory: string, module: string, url: string) => {
  execSync(
    `cd ${directory} && git subtree add --prefix ${module} ${url} main --squash`
  );
};

export const installMinimalProject = async (answers: Answers) => {
  await createProjectDirectory(answers.name);
  await initGitRepo(answers.name);
  // Todo -> Decide if we want search and storage in install options
  await addSubtrees(answers.name, 'web', modules['web'].gitRepo);
  await addSubtrees(answers.name, 'search', modules['search'].gitRepo);
  await addSubtrees(answers.name, 'storage', modules['storage'].gitRepo);
  configFileGenerator(answers);
  rootGitIgnore(answers.name);
  rootReadmeFile(answers.name);
};

export const installAllApps = async (answers: Answers) => {
  await installMinimalProject(answers);
  Object.keys(modules).forEach(module => {
    if (module !== 'web') {
      addSubtrees(answers.name, module, modules[module].gitRepo);
    }
  });
};

export const installCustomApps = async (answers: Answers) => {
  await installMinimalProject(answers);
  for (const answer in answers) {
    if (answers.hasOwnProperty(answer)) {
      if (answer !== 'name') {
        console.log(modules[answer]);
        if (modules[answer].enabled === true)
          addSubtrees(answers.name, answer, modules[answer].gitRepo);
      }
    }
  }
};

export const dockerCommandRunner = (cmd: string) => {
  const config = require(path.resolve(process.cwd(), 'chewy.json'));
  const modules = config.modules;
  let string: string = '';
  Object.entries(modules).forEach(([key, value]: any) => {
    if (value.containerized === true) {
      string = string + ` -f ${key}/docker-compose.yml`;
    }
  });
  let command = `docker-compose -f docker-compose.yml${string} ${cmd}`;
  exec(`${command}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
    }
    console.log(stdout);
    console.error(`Error: ${stderr}`);
  });
};

export const startDocker = () => {
  dockerCommandRunner('up -d');
};

export const stopDocker = () => {
  dockerCommandRunner('down');
};
