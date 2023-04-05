import buildDependencyGraph from '../../project/build-dependency-graph/build-dependency-graph';
import * as pulumi from '@pulumi/pulumi';
import getStackName from '../get-stack-name/get-stack-name';

interface DeploymentDependenciesOpts {
  deployedComponentId: string;
  environment: string;
}

/**
 * Get the deployment dependencies for a component. This includes its
 * defintion, as well as stack references to other components.
 */
export default function getComponentDeploymentDependencies({
  deployedComponentId,
  environment,
}: DeploymentDependenciesOpts) {
  const graph = buildDependencyGraph(environment);

  const dependencies = graph.dependenciesOf(deployedComponentId);

  const dependencyNodes = dependencies.map(dependency => {
    const nodeData = graph.getNodeData(dependency);
    const stackName = getStackName({
      environment: nodeData.environment,
      dirOpts: {
        name: nodeData.name,
        type: nodeData.type as 'source' | 'infrastructure' | 'service',
      },
    });
    const stackReference = new pulumi.StackReference(stackName);
    return {
      ...nodeData,
      stackReference: stackReference,
    };
  });

  return dependencyNodes;
}
