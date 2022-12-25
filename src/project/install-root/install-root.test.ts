import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { resolve } from 'path';
import rmfr from 'rmfr';
import {
  CHEWY_BASE_TEST_DIR,
  CHEWY_COMPONENT_DIRECTORY_NAMES,
  CHEWY_INFRA_DIR_NAME,
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
  CHEWY_SERVICE_DIR_NAME,
  CHEWY_SOURCE_DIR_NAME,
  CHEWY_VERSION,
} from '../../constants';
import installRoot from './install-root';
import {
  ProjectConfigInput,
  projectConfigSchema,
  ProjectConfig,
} from '../../config/project';
import { existsSync } from 'fs-extra';
import { GitProcess } from 'dugite';
import getTestPath from '../../files/get-test-path/get-test-path';

describe('installRoot', () => {
  const path = getTestPath('install-root');
  console.log('@@ test path: ', path);
  const projectConfig: ProjectConfigInput = {
    name: 'test-project',
    chewy: {
      version: CHEWY_VERSION,
    },
  };

  beforeAll(async () => {
    await rmfr(path);
    await installRoot(path, projectConfig);
  });

  it('creates a new directory for a chewy project and writes its config to a file', async () => {
    const writtenConfig = load(
      (
        await readFile(
          resolve(
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

  it('creates the directories for the project components', async () => {
    const dirs = [
      CHEWY_INFRA_DIR_NAME,
      CHEWY_SERVICE_DIR_NAME,
      CHEWY_SOURCE_DIR_NAME,
    ];
    const exists = dirs
      .map(dir => existsSync(resolve(path, dir)))
      .reduce((acc, val) => acc && val, true);
    expect(exists).toBe(true);
  });

  it('creates gitignore files for component directories', async () => {
    const exists = CHEWY_COMPONENT_DIRECTORY_NAMES.map(dir =>
      existsSync(resolve(path, dir, '.gitignore'))
    ).reduce((acc, val) => acc && val, true);
    expect(exists).toBe(true);
  });

  it('initializes a git repository', async () => {
    const result = await GitProcess.exec(['status'], path);
    expect(result.exitCode).toBe(0);
  });

  afterAll(async () => {
    await rmfr(path);
  });
});
