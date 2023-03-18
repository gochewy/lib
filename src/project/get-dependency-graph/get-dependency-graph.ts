import { DepGraph } from 'dependency-graph';
import {
  getComponentId,
  getComponentLinks,
  getComponentList,
  getInstalledComponentDefinition,
} from '../../components';

/**
 *  NOTE TO SELF:
 *  - Each infra component specifies in its config which envs it is deployed to.
 *  - Each service/source component specifies in its config which infra components
 *    (specified by env as well) it depends on.
 *  - Maybe there is a special "infrastructure" environment, that only deploys infra.
 */

export default function getDependencyGraph(environment = 'dev') {
  const components = getComponentList().map(component => {
    const links = getComponentLinks(component);
    const definition = getInstalledComponentDefinition(component);
    const id = getComponentId(component);
    return {
      ...component,
      id,
      links,
      definition,
    };
  });

  const graph = new DepGraph<typeof components[number]>();
  components.forEach(component => {
    graph.addNode(component.id, component);
  });
  components.forEach(component => {
    component.links?.links?.forEach(link => {
      const linkId = getComponentId(link);
      graph.addDependency(component.id, linkId);
    });
  });
  return graph;
}
