import { getProjectConfig } from '../../project';
import getGlobalEnvironmentsDir from '../get-global-environments-dir/get-global-environments-dir';
import { resolve } from 'path';

/**
 * @returns The directory where the project's environment secrets are stored.
 */
export default function getProjectEnvironmentDir() {
  const projectDefinition = getProjectConfig();
  const environmentsDir = getGlobalEnvironmentsDir();
  return resolve(environmentsDir, projectDefinition.id);
}
