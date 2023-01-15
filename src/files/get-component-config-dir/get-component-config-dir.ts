import { resolve } from 'path';
import { CHEWY_COMPONENT_DEFINITION_DIR_NAME } from '../../constants';
import getComponentDir from '../get-component-dir/get-component-dir';

/**
 * Gets the component configuration directory for a given component.
 */
export default function getComponentConfigDir(
  ...params: Parameters<typeof getComponentDir>
) {
  return resolve(
    getComponentDir(...params),
    CHEWY_COMPONENT_DEFINITION_DIR_NAME
  );
}
