import path from 'path';
import getComponentId from '../../components/get-component-id/get-component-id';
import getComponentDir from '../get-component-dir/get-component-dir';
import getDevVolumesDir from '../get-dev-volumes-dir/get-dev-volumes-dir';

export default function getDevVolumeDir(
  ...opts: Parameters<typeof getComponentDir>
) {
  const id = getComponentId(...opts);
  const devVolumesDir = getDevVolumesDir();
  return path.resolve(devVolumesDir, id);
}
