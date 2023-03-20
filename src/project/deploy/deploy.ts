import runCommand from '../../components/run-command/run-command';
import log from '../../utils/log/log';
import buildDependencyGraph from '../build-dependency-graph/build-dependency-graph';

export default function deploy(environment: string) {
  const graph = buildDependencyGraph(environment);
  const orderedIds = graph.overallOrder();

  log.info(`Deploying ${orderedIds.length} components...`);
  log.info(`Environment: ${environment}`);
  log.info(`Components: `);
  orderedIds.forEach(id => {
    log.info(`\t- ${graph.getNodeData(id).name}`);
  });

  for (const id of orderedIds) {
    const component = graph.getNodeData(id);
    log.info(`Deploying...`, { source: component.name });
    runCommand({
      dirOpts: component,
      command: ['deploy', environment],
    });
  }
}
