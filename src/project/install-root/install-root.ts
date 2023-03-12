import { ProjectConfigInput } from '../../config/project';
import { createEnvironmentSecretsGitignore } from '../../environments';
import {
  setRootInstallationPath,
  unsetRootInstallationPath,
} from '../../state';
import createComponentDirs from './create-component-dirs/create-component-dirs';
import createProjectConfig from './create-project-config/create-project-config';
import initializeRootRepo from './initialize-root-repo/initialize-root-repo';

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
  setRootInstallationPath(path);

  createProjectConfig(config);
  createComponentDirs();
  await initializeRootRepo();
  createEnvironmentSecretsGitignore();

  unsetRootInstallationPath();
}
