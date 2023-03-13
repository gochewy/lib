import { DepGraph } from 'dependency-graph';
import {
  getComponentLinks,
  getComponentList,
  getInstalledComponentDefinition,
} from '../../components';

export default function getDependencyGraph() {
  const components = getComponentList().map(component => {
    const links = getComponentLinks(component);
    const definition = getInstalledComponentDefinition(component);
    return {
      ...component,
      id: `${component.type}/${component.name}`,
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
      const linkId = `${link.type}/${link.name}`;
      graph.addDependency(component.id, linkId);
    });
  });
  return graph;
}
