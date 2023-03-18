import getComponentId from '../get-component-id/get-component-id';
import { GetComponentDirOptions } from '../../files/get-component-dir/get-component-dir';

interface GetStackNameOptions {
  environment: string;
  dirOpts?: GetComponentDirOptions;
}

export default function getStackName({
  environment,
  dirOpts,
}: GetStackNameOptions) {
  const componentId = getComponentId(dirOpts);
  return `${environment}-${componentId}`;
}
