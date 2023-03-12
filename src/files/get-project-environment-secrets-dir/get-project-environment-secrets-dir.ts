import { resolve } from 'path';
import { CHEWY_PROJECT_ENVIRONMENT_SECRETS_DIR_NAME } from '../../constants';
import getProjectConfigDir from '../get-project-config-dir/get-project-config-dir';

/**
 * @returns The directory where the project's environment secrets are stored.
 */
export default function getProjectEnvironmentSecretsDir() {
  return resolve(
    getProjectConfigDir(),
    CHEWY_PROJECT_ENVIRONMENT_SECRETS_DIR_NAME
  );
}
