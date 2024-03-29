import { CHEWY_ID_SEPARATOR } from '../../constants';
import { GetComponentDirOptions } from '../../files/get-component-dir/get-component-dir';
import getComponentId from '../get-component-id/get-component-id';

export default function getDeployedComponentId(
  dirOpts: GetComponentDirOptions | undefined,
  environment: string
) {
  const id = getComponentId(dirOpts);
  return `${environment}${CHEWY_ID_SEPARATOR}${id}`;
}
