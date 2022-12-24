import { resolve } from 'path';
import {
  CHEWY_COMPONENT_CONFIG_DIR_NAME,
  CHEWY_COMPONENT_CONFIG_FILE_NAME,
} from '../../constants';
import getComponentDir from '../get-component-dir/get-component-dir';

export default function getComponentLinksFile(
  ...opts: Parameters<typeof getComponentDir>
) {
  const componentConfigDir = getComponentDir(...opts);
  return resolve(
    componentConfigDir,
    CHEWY_COMPONENT_CONFIG_DIR_NAME,
    CHEWY_COMPONENT_CONFIG_FILE_NAME
  );
}
