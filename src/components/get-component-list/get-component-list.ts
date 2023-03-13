import { CHEWY_COMPONENT_DIRECTORY_NAMES } from '../../constants';
import { getProjectRootDir } from '../../files';
import path from 'path';
import fs from 'fs';
import ComponentType from '../../config/component/component-type';

export default function getComponentList() {
  const projectRoot = getProjectRootDir();
  const components: {
    name: string;
    type: ComponentType;
  }[] = [];

  CHEWY_COMPONENT_DIRECTORY_NAMES.forEach(type => {
    const typeDir = path.resolve(projectRoot, type);
    // get all the directories in the type directory
    const typeDirs = fs.readdirSync(typeDir, { withFileTypes: true });
    typeDirs.forEach(dir => {
      if (dir.isDirectory()) {
        const name = dir.name;
        components.push({
          type: type as ComponentType,
          name,
        });
      }
    });
  });
  return components;
}
