import { DepGraph } from 'dependency-graph';
import getComponentLinks from '../../components/get-component-links/get-component-links';
import getInstalledComponentDefinition from '../../components/get-installed-component-definition/get-installed-component-definition';
import getDeployedComponentId from '../../components/get-deployed-component-id/get-deployed-component-id';
import getComponentList from '../../components/get-component-list/get-component-list';

export default function buildDependencyGraph(environment: string) {
  /**
   * Build a node for the dependency graph. This is used for both application
   * components and infrastructure components later on in this function.
   */
  const buildNode = (dirOpts: { name: string; type: string }, env: string) => {
    const links = getComponentLinks(dirOpts);
    const definition = getInstalledComponentDefinition(dirOpts);
    const id = getDeployedComponentId(dirOpts, environment);
    return {
      ...dirOpts,
      id,
      links,
      definition,
      environment: env,
    };
  };

  const applicationComponents = getComponentList()
    .filter(component => component.type !== 'infrastructure')
    .map(component => buildNode(component, environment));

  // create the graph
  const graph = new DepGraph<typeof applicationComponents[number]>();

  // only add non-infra components to the graph for now
  applicationComponents.forEach(component => {
    graph.addNode(component.id, component);
  });

  // create non-infra dependencies
  applicationComponents.forEach(component => {
    component.links?.links
      ?.filter(link => link.type !== 'infrastructure')
      .forEach(link => {
        const linkId = getDeployedComponentId(link, environment);
        graph.addDependency(component.id, linkId);
      });
  });

  /**
   * Run through the links. If there is a link whose source environment matches the
   * environment we are building for, return that link. If there is not, and there is
   * a link with an undefined source environment, return that link. If there is not,
   * throw an error.
   */
  const getInfraLink = (component: typeof applicationComponents[number]) => {
    const linksFile = component.links;
    const infraLinks = (linksFile?.links || []).filter(
      link => link.type === 'infrastructure'
    );
    const validLinks = infraLinks.filter(link =>
      link.sourceEnvironments?.includes(environment)
    );

    if (validLinks.length > 1) {
      throw new Error(
        `Component ${component.id} has more than one link for environment ${environment}.`
      );
    }

    if (validLinks.length === 0) {
      const linksWithNoSourceEnvironment = infraLinks.filter(
        link => !link.sourceEnvironments
      );

      if (linksWithNoSourceEnvironment.length > 1) {
        throw new Error(
          `Component ${component.id} has more than one infrastructure link.`
        );
      }
      if (linksWithNoSourceEnvironment.length === 0) {
        throw new Error(
          `Component ${component.id} has no infrastructure links.`
        );
      }

      return linksWithNoSourceEnvironment[0];
    }

    return validLinks[0];
  };

  // For each application component, find the infrastructure component that it depends on
  // and add a dependency to that component in the graph. There can only be one infrastructure
  // component per application component. If there are multiple, we throw an error.
  applicationComponents.forEach(component => {
    const infraLink = getInfraLink(component);
    const newInfraNode = buildNode(
      infraLink,
      infraLink.targetEnvironment ?? environment
    );
    graph.addNode(newInfraNode.id, newInfraNode);
    graph.addDependency(component.id, newInfraNode.id);
  });

  return graph;
}
