import { resolve } from 'path';
import {
  CHEWY_GLOBAL_CONFIG_DIR_PATH,
  CHEWY_GLOBAL_ENVIRONMENTS_DIR_NAME,
} from '../../constants';

export default function getGlobalEnvironmentsDir() {
  return resolve(
    CHEWY_GLOBAL_CONFIG_DIR_PATH,
    CHEWY_GLOBAL_ENVIRONMENTS_DIR_NAME
  );
}
