import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';
import rmfr from 'rmfr';
import {
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
} from '../../../config/global/constants';
import {
  ProjectConfig,
  ProjectConfigInput,
} from '../../../config/project/project-config';
import { installRoot } from './install-root';

test('creates a new directory for a chewy project and writes its config to a file', async () => {
  const path = 'test-project';
  const projectConfig: ProjectConfigInput = {
    name: 'test-project',
  };
  await installRoot(path, projectConfig);

  const writtenConfig = load(
    (
      await readFile(
        join(
          path,
          CHEWY_PROJECT_CONFIG_DIR_NAME,
          CHEWY_PROJECT_CONFIG_FILE_NAME
        )
      )
    ).toString()
  ) as ProjectConfig;

  expect(writtenConfig.id).toBeDefined();
  expect(writtenConfig.name).toBe(projectConfig.name);

  await rmfr(path);
});
