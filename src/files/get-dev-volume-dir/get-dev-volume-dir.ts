import { getComponentDir, getDevVolumesDir } from '..';
import { getComponentId } from '../../components';
import path from 'path';

export default function getDevVolumeDir(
  ...opts: Parameters<typeof getComponentDir>
) {
  const id = getComponentId(...opts);
  const devVolumesDir = getDevVolumesDir();
  return path.resolve(devVolumesDir, id);
}
