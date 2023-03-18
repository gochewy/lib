import { writeFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import getComponentDir from '../../files/get-component-dir/get-component-dir';
import getComponentLinksFile from '../../files/get-component-links-file/get-component-links-file';
import getComponentLinks from '../get-component-links/get-component-links';
import getInstalledComponentDefinition from '../get-installed-component-definition/get-installed-component-definition';

export default function linkComponents(
  dependency: NonNullable<Parameters<typeof getComponentDir>[0]>,
  role: string,
  dependent: NonNullable<Parameters<typeof getComponentDir>[0]>,
  environments: string[] = ['*']
) {
  const links = getComponentLinks(dependent)?.links || [];
  const dependentDefinition = getInstalledComponentDefinition(dependent);
  const dependencyDefinitions = dependentDefinition.dependencies || [];

  const dependencyDefinition = dependencyDefinitions.find(
    dep => dep.role === role
  );
  const roleIsUnique = dependencyDefinition?.unique ?? true;
  const satisfyingLink = links.find(link => link.role === role);

  if (!dependentDefinition) {
    throw new Error(
      `${dependent.name} does not have a dependency with role ${role}`
    );
  }

  if (!!satisfyingLink && roleIsUnique)
    throw Error(`${role} is already fulfilled by ${satisfyingLink?.name}`);

  const dependencyComponentDefinition = getInstalledComponentDefinition(
    dependency
  );

  links.push({
    role,
    name: dependency.name,
    type: dependencyComponentDefinition.type,
    repository: dependencyComponentDefinition.repository,
    unique: roleIsUnique,
    environments,
  });

  const linkFile = getComponentLinksFile(dependent);
  const yaml = jsyaml.dump({ links });
  writeFileSync(linkFile, yaml);
  return { links };
}
