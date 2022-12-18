import path from 'path';
import { CHEWY_PROJECT_CONFIG_DIR_NAME } from '../../constants';
import getProjectRootDir from '../get-project-root-dir/get-project-root-dir';

export default function getProjectConfigDir() {
  const projectRoot = getProjectRootDir();

  return path.resolve(projectRoot, CHEWY_PROJECT_CONFIG_DIR_NAME);
}
