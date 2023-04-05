import { GetComponentDirOptions } from '../../files/get-component-dir/get-component-dir';
import getDeployedComponentId from '../get-deployed-component-id/get-deployed-component-id';

interface GetStackNameOptions {
  environment: string;
  dirOpts?: GetComponentDirOptions;
}

export default function getStackName({
  environment,
  dirOpts,
}: GetStackNameOptions) {
  return getDeployedComponentId(dirOpts, environment);
}
