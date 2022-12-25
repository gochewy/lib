import path from 'path';
import { cwd } from 'process';
import {
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
} from '../../constants';
import { getRootInstallationPath } from '../../state';
import { getWorkingDirectory } from '../../state/working-directory/working-directory';
import searchForNestedFileUpwards from '../search-for-nested-file-upwards/search-for-nested-file-upwards';

export default function getProjectRootDir() {
  const installingDir = getRootInstallationPath();
  if (installingDir) return path.resolve(installingDir);

  const workingDirectory = getWorkingDirectory();
  if (workingDirectory) return workingDirectory;

  const dir = searchForNestedFileUpwards(cwd(), [
    CHEWY_PROJECT_CONFIG_DIR_NAME,
    CHEWY_PROJECT_CONFIG_FILE_NAME,
  ]);

  if (!dir) {
    throw Error(`Could not find a ${CHEWY_PROJECT_CONFIG_FILE_NAME} file.`);
  }

  return path.resolve(dir);
}
