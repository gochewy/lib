import ComponentType from '../../config/component/component-type';
import {
  CHEWY_COMPONENT_DEFINITION_DIR_NAME,
  CHEWY_COMPONENT_DEFINITION_FILE_NAME,
  CHEWY_COMPONENT_DIRECTORY_NAMES,
} from '../../constants';
import searchForNestedFileUpwards from '../search-for-nested-file-upwards/search-for-nested-file-upwards';
import { cwd } from 'process';
import getProjectRootDir from '../get-project-root-dir/get-project-root-dir';
import { resolve } from 'path';
import { existsSync } from 'fs-extra';

type GetComponentDirOptions =
  | {
      name: string;
      type: ComponentType;
    }
  | {
      name: string;
    };

export default function getComponentDir(opts?: GetComponentDirOptions) {
  if (!opts) {
    const path = searchForNestedFileUpwards(cwd(), [
      CHEWY_COMPONENT_DEFINITION_DIR_NAME,
      CHEWY_COMPONENT_DEFINITION_FILE_NAME,
    ]);

    if (!path)
      throw Error(
        'Could not find a component definition file in current directory.'
      );

    return path;
  } else if ('type' in opts) {
    const path = `${getProjectRootDir()}/${opts.type}/${opts.name}`;

    if (existsSync(path)) return path;
    throw Error('A component with that name does not exist.');
  } else {
    const found: string[] = [];
    const projectRoot = getProjectRootDir();

    CHEWY_COMPONENT_DIRECTORY_NAMES.forEach(dir => {
      const path = resolve(projectRoot, dir, opts.name);
      if (existsSync(path)) found.push(path);
    });

    if (found.length === 0)
      throw Error('A component with that name does not exist.');
    else if (found.length > 1) throw Error('Component name is ambiguous.');
    else return found[0];
  }
}
