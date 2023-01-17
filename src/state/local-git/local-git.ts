import { dirname } from 'path';
import { default as findGit, Git } from 'find-git-exec';

/**
 * Instead of using the git binary included with dugite,
 * find the user's local binary and use that instead. Dugite
 * does not include the subtree command, which is included in
 * most git versions available out there.
 */
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

/**
 * Revert back to the dugite git binary.
 */
export const unsetLocalGit = () => {
  delete process.env.GIT_EXEC_PATH;
  delete process.env.LOCAL_GIT_DIRECTORY;
};
