import { getProjectConfigDir } from '..';
import path from 'path';
import { CHEWY_DEV_VOLUMES_DIR_NAME } from '../../constants';

export default function getDevVolumesDir() {
  const projectConfigDir = getProjectConfigDir();

  return path.resolve(projectConfigDir, CHEWY_DEV_VOLUMES_DIR_NAME);
}
