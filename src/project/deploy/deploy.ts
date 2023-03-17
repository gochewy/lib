// import runCommand from '../../components/run-command/run-command';
import { blue, greenBright, bold } from 'colorette';
import getDependencyGraph from '../get-dependency-graph/get-dependency-graph';

interface DeploymentPriorities {
  [key: string]: number;
}

async function deployComponent(
  environment: string,
  graph: ReturnType<typeof getDependencyGraph>,
  deploymentPriorities: DeploymentPriorities,
  id: string,
  level = 0
) {
  const priority = deploymentPriorities[id];
  const shouldDeploy = priority === level;

  if (shouldDeploy) {
    const component = graph.getNodeData(id);
    console.log(
      `${blue('|' + ' - -'.repeat(level))} Deploying ${
        component.type
      } component ${greenBright(bold(component.name))}`
    );

    // runCommand({
    //   dirOpts: component,
    //   command: ['deploy', environment],
    // });
  }

  const dependants = graph.dependantsOf(id);
  if (dependants.length > 0) {
    await Promise.all(
      dependants.map(dependantId =>
        deployComponent(
          environment,
          graph,
          deploymentPriorities,
          dependantId,
          level + 1
        )
      )
    );
  }
}

export default async function deploy(environment: string) {
  const graph = getDependencyGraph();
  const leafNodes = graph.overallOrder(true).map(id => graph.getNodeData(id));

  const deploymentPriorities: DeploymentPriorities = {};

  const buildDeploymentPriorities = (nodeId: string, level = 0) => {
    // get or set deployment priority
    const currentPriority = deploymentPriorities[nodeId] ?? 0;
    const actualPriority = Math.max(currentPriority, level);
    deploymentPriorities[nodeId] = actualPriority;
    graph
      .dependantsOf(nodeId)
      .forEach(dependantId =>
        buildDeploymentPriorities(dependantId, level + 1)
      );
  };

  leafNodes.forEach(node => buildDeploymentPriorities(node.id));

  await Promise.all(
    leafNodes.map(node =>
      deployComponent(environment, graph, deploymentPriorities, node.id)
    )
  );
}
