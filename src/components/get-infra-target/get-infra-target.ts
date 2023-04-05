import componentTypeSchema from '../../config/component/component-type-schema';
import getComponentDeploymentDependencies from '../get-component-deployment-dependencies/get-component-deployment-dependencies';

interface DeploymentDependenciesOpts {
  deployedComponentId: string;
}

/**
 * Get the infra target for a component being deployed.
 */
export default function getInfraTarget({
  deployedComponentId,
}: DeploymentDependenciesOpts) {
  const dependencies = getComponentDeploymentDependencies({
    deployedComponentId,
  });

  // get infra dependency
  const infraDeps = dependencies.filter(depedency => {
    return depedency.type === componentTypeSchema.Values.infrastructure;
  });

  if (infraDeps.length > 1) {
    throw new Error('More than one infra dependency found');
  }
  if (infraDeps.length === 0) {
    throw new Error('No infra dependency found');
  }

  return infraDeps[0];
}
