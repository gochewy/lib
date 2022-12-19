import { randomUUID } from 'crypto';
import { mkdirSync, writeFileSync } from 'fs-extra';
import { dump } from 'js-yaml';
import { resolve } from 'path';
import { ProjectConfig, ProjectConfigInput } from '../../../config/project';
import {
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
} from '../../../constants';
import { getRootInstallationPath } from '../../../state';

export default function createProjectConfig(config: ProjectConfigInput) {
  const path = getRootInstallationPath();

  if (!path)
    throw new Error('Cannot create project config without installing dir');

  const configDir = resolve(path, CHEWY_PROJECT_CONFIG_DIR_NAME);
  mkdirSync(configDir, { recursive: true });
  const id = randomUUID();
  const completeConfig: ProjectConfig = { ...config, id };
  const configFilePath = resolve(configDir, CHEWY_PROJECT_CONFIG_FILE_NAME);
  writeFileSync(configFilePath, dump(completeConfig));
}
