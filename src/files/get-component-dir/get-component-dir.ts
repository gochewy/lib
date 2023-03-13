import { existsSync } from 'fs-extra';
import { resolve } from 'path';
import ComponentType from '../../config/component/component-type';
import {
  CHEWY_COMPONENT_DEFINITION_DIR_NAME,
  CHEWY_COMPONENT_DEFINITION_FILE_NAME,
  CHEWY_COMPONENT_DIRECTORY_NAMES,
} from '../../constants';
import { getWorkingDirectory } from '../../state/working-directory/working-directory';
import getProjectRootDir from '../get-project-root-dir/get-project-root-dir';
import searchForNestedFileUpwards from '../search-for-nested-file-upwards/search-for-nested-file-upwards';

export type GetComponentDirOptions =
  | {
      name: string;
      type: ComponentType;
    }
  | {
      name: string;
    };
// TODO: Add a way to get the component dir from a component ID.

export default function getComponentDir(opts?: GetComponentDirOptions) {
  if (!opts) {
    const workingDirectory = getWorkingDirectory();
    const path = searchForNestedFileUpwards(workingDirectory, [
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
