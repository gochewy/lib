import { GitProcess } from 'dugite';
import { getRootInstallationPath } from '../../../state';

export default async function initializeRootRepo() {
  const path = getRootInstallationPath();

  if (!path) throw new Error('Installation directory missing');

  await GitProcess.exec(['init'], path);
  await GitProcess.exec(['add', '.'], path);
  await GitProcess.exec(['commit', '-m', 'Chewy Stack initial commit'], path);
}
