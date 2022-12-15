import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { dump } from 'js-yaml';
import { join, resolve } from 'path';
import {
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
} from '../../../config/global/constants';
import {
  ProjectConfig,
  ProjectConfigInput,
} from '../../../config/project/project-config';
import { setInstallingDir, setIsInstallingRoot } from './install-root-state';

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

  const configDir = join(path, CHEWY_PROJECT_CONFIG_DIR_NAME);
  await mkdir(configDir, { recursive: true });
  const id = randomUUID();
  const completeConfig: ProjectConfig = { ...config, id };
  const configFilePath = join(configDir, CHEWY_PROJECT_CONFIG_FILE_NAME);
  writeFile(configFilePath, dump(completeConfig));

  setIsInstallingRoot(false);
}
