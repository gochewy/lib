import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { dump } from 'js-yaml';
import { join } from 'path';
import {
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
} from '../../../config/global/constants';
import {
  ProjectConfig,
  ProjectConfigInput,
} from '../../../config/project/project-config';

let installingRoot = false;

export const getInstallingRoot = () => installingRoot;

/**
 * Creates a new project configuration file in the given path.
 *
 * @param path The path to install to.
 * @param config The project configuration.
 */
export const installRoot = async (path: string, config: ProjectConfigInput) => {
  installingRoot = true;

  const configDir = join(path, CHEWY_PROJECT_CONFIG_DIR_NAME);
  await mkdir(configDir, { recursive: true });
  const id = randomUUID();
  const completeConfig: ProjectConfig = { ...config, id };
  const configFilePath = join(configDir, CHEWY_PROJECT_CONFIG_FILE_NAME);
  writeFile(configFilePath, dump(completeConfig));

  installingRoot = false;
};
