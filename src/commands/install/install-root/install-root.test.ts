import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';
import rmfr from 'rmfr';
import {
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
  CHEWY_VERSION,
} from '../../../constants';
import installRoot from './install-root';
import {
  ProjectConfigInput,
  projectConfigSchema,
  ProjectConfig,
} from '../../../config/project';

describe('installRoot', () => {
  const path = 'test-project';
  const projectConfig: ProjectConfigInput = {
    name: 'test-project',
    chewy: {
      version: CHEWY_VERSION,
    },
  };

  it('creates a new directory for a chewy project and writes its config to a file', async () => {
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
    expect(projectConfigSchema.safeParse(writtenConfig).success).toBe(true);
  });

  afterAll(async () => {
    await rmfr(path);
  });
});
