import getComponentConfigDir from '../get-component-config-dir/get-component-config-dir';
import { resolve } from 'path';
import { CHEWY_COMPONENT_COMMANDS_DIRECTORY } from '../../constants';

/**
 * Fetch the directory where component commands are stored for a given component.
 */
export default function getComponentCommandsDir(
  ...params: Parameters<typeof getComponentConfigDir>
): string {
  return resolve(
    getComponentConfigDir(...params),
    CHEWY_COMPONENT_COMMANDS_DIRECTORY
  );
}
