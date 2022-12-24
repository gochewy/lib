import { writeFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import ComponentType from '../../config/component/component-type';
import getComponentLinksFile from '../../files/get-component-links-file/get-component-links-file';
import getComponentLinks from '../get-component-links/get-component-links';

interface Component {
  name: string;
  type: ComponentType;
  repository: string;
}

export default function linkComponents(
  dependency: Component,
  role: string,
  dependent: Component
) {
  const links = getComponentLinks(dependent)?.links || [];
  const exists = !!links.find(
    link => link.repository === dependency.repository && link.role === role
  );
  if (exists) throw Error('This dependency role is already satisfied.');
  links.push({ ...dependency, role });
  const linkFile = getComponentLinksFile(dependent);
  const yaml = jsyaml.dump({ links });
  writeFileSync(linkFile, yaml);
  return { links };
}
