import { dirname } from 'path';
import { default as findGit, Git } from 'find-git-exec';

export const setLocalGit = async () => {
  let git: Git | undefined = undefined;

  git = await findGit();

  if (git.path && git.execPath) {
    const { path, execPath } = git;
    // Set the environment variable to be able to use an external Git.
    process.env.GIT_EXEC_PATH = execPath;
    process.env.LOCAL_GIT_DIRECTORY = dirname(dirname(path));
  }
};

export const unsetLocalGit = () => {
  delete process.env.GIT_EXEC_PATH;
  delete process.env.LOCAL_GIT_DIRECTORY;
};
