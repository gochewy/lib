import { resolve } from 'path';
import { ProjectConfigInput } from '../../../config/project';
import createComponentDirs from './create-component-dirs/create-component-dirs';
import createProjectConfig from './create-project-config/create-project-config';
import initializeRootRepo from './initialize-root-repo/initialize-root-repo';
import {
  setInstallingDir,
  setIsInstallingRoot,
} from './install-root-state/install-root-state';

/**
 * Creates a new project configuration file in the given path.
 *
 * @param path The path to install to.
 * @param config The project configuration.
 */
export default async function installRoot(
  path: string,
  config: ProjectConfigInput
) {
  setIsInstallingRoot(true);
  const installingDir = resolve(path);
  setInstallingDir(installingDir);

  createProjectConfig(config);
  createComponentDirs();
  initializeRootRepo();

  setIsInstallingRoot(false);
}
