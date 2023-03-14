import { log } from '../../utils';
import getDependencyGraph from '../get-dependency-graph/get-dependency-graph';

async function deployComponent(
  environment: string,
  graph: ReturnType<typeof getDependencyGraph>,
  id: string
) {
  const component = graph.getNodeData(id);
  log.info(`Deploying ${component.type} component ${component.name}`, {
    source: component.name,
  });
  const dependants = graph.dependantsOf(id);
  if (dependants.length > 0) {
    await Promise.all(
      dependants.map(dependantId =>
        deployComponent(environment, graph, dependantId)
      )
    );
  }
}

export default async function deploy(environment: string) {
  const graph = getDependencyGraph();
  const leafNodes = graph.overallOrder(true).map(id => graph.getNodeData(id));
  await Promise.all(
    leafNodes.map(node => deployComponent(environment, graph, node.id))
  );
}
