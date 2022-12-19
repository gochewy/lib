import { GitProcess } from 'dugite';
import { getInstallingDir } from '../install-root-state/install-root-state';

export default async function initializeRootRepo() {
  const path = getInstallingDir();

  if (!path) throw new Error('Installation directory missing');

  await GitProcess.exec(['init'], path);
  await GitProcess.exec(['add', '.'], path);
  await GitProcess.exec(['commit', '-m', 'Chewy Stack initial commit'], path);
}
