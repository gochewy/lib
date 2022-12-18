import path from 'path';
import { CHEWY_PROJECT_CONFIG_FILE_NAME } from '../../constants';
import getProjectConfigDir from '../get-project-config-dir/get-project-config-dir';

export default function getProjectConfigPath() {
  const projectConfigDir = getProjectConfigDir();

  return path.resolve(projectConfigDir, CHEWY_PROJECT_CONFIG_FILE_NAME);
}
