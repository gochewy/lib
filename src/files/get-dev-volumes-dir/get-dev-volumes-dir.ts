import path from 'path';
import { CHEWY_DEV_VOLUMES_DIR_NAME } from '../../constants';
import getProjectConfigDir from '../get-project-config-dir/get-project-config-dir';

export default function getDevVolumesDir() {
  const projectConfigDir = getProjectConfigDir();

  return path.resolve(projectConfigDir, CHEWY_DEV_VOLUMES_DIR_NAME);
}
