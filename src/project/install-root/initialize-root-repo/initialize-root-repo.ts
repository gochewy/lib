import { GitProcess } from 'dugite';
import { IS_CI } from '../../../constants';
import { getRootInstallationPath } from '../../../state';

export default async function initializeRootRepo() {
  const path = getRootInstallationPath();

  if (!path) throw new Error('Installation directory missing');

  const initOutput = await GitProcess.exec(['init'], path);
  if (initOutput.exitCode !== 0) {
    throw new Error(`Failed to initialize git repo: ${initOutput.stderr}`);
  }

  const branchOutput = await GitProcess.exec(['branch', '-m', 'main'], path);
  if (branchOutput.exitCode !== 0) {
    throw new Error(`Failed to rename branch: ${branchOutput.stderr}`);
  }

  const addOutput = await GitProcess.exec(['add', '.'], path);
  if (addOutput.exitCode !== 0) {
    throw new Error(`Failed to add files to git: ${addOutput.stderr}`);
  }

  if (IS_CI) {
    const setEmailOutput = await GitProcess.exec(
      ['config', 'user.email', 'dev@gochewy.io'],
      path
    );
    if (setEmailOutput.exitCode !== 0) {
      throw new Error(`Failed to set git email: ${setEmailOutput.stderr}`);
    }
    const setNameOutput = await GitProcess.exec(
      ['config', 'user.name', 'Chewy Stack CI'],
      path
    );
    if (setNameOutput.exitCode !== 0) {
      throw new Error(`Failed to set git name: ${setNameOutput.stderr}`);
    }
  }

  const commitOutput = await GitProcess.exec(
    ['commit', '-m', 'Chewy Stack initial commit'],
    path
  );
  if (commitOutput.exitCode !== 0) {
    throw new Error(`Failed to commit files: ${commitOutput.stderr}`);
  }
}
