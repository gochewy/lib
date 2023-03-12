import { resolve } from 'path';
import { CHEWY_COMPONENT_DEPLOYMENT_DIRECTORY } from '../../constants';
import getComponentConfigDir from '../get-component-config-dir/get-component-config-dir';

/**
 * Fetch the directory where component commands are stored for a given component.
 */
export default function getComponentDeploymentDir(
  ...params: Parameters<typeof getComponentConfigDir>
): string {
  return resolve(
    getComponentConfigDir(...params),
    CHEWY_COMPONENT_DEPLOYMENT_DIRECTORY
  );
}
