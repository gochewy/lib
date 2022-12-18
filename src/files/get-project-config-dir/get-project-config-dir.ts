import path from 'path';
import { cwd } from 'process';
import {
  getInstallingDir,
  getIsInstallingRoot,
} from '../../commands/install/install-root/install-root-state';
import {
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
} from '../../constants';
import searchForNestedFileUpwards from '../search-for-nested-file-upwards/search-for-nested-file-upwards';

export default function getProjectConfigDir() {
  const isInstallingRoot = getIsInstallingRoot();
  const installingDir = getInstallingDir();
  if (isInstallingRoot && installingDir)
    return path.resolve(installingDir, CHEWY_PROJECT_CONFIG_DIR_NAME);

  const dir = searchForNestedFileUpwards(cwd(), [
    CHEWY_PROJECT_CONFIG_DIR_NAME,
    CHEWY_PROJECT_CONFIG_FILE_NAME,
  ]);

  if (!dir) {
    throw Error(`Could not find a ${CHEWY_PROJECT_CONFIG_FILE_NAME} file.`);
  }

  return path.resolve(dir, CHEWY_PROJECT_CONFIG_DIR_NAME);
}
