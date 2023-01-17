import { getRootInstallationPath } from '../../state';

/**
 * There are points in the Chewy system where we need to alter
 * functionality based on whether or not a project is currently
 * being installed. This function tells you whether or not an
 * installation is in progress.
 */
export default function isProjectInstalling() {
  return getRootInstallationPath() !== undefined;
}
