import { getRootInstallationPath } from '../../state';

export default function isProjectInstalling() {
  return getRootInstallationPath() !== undefined;
}
