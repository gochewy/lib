import { readFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { resolve } from 'path';
import rmfr from 'rmfr';
import { ComponentDefinition, componentSources } from '../../config/component';
import {
  CHEWY_BASE_TEST_DIR,
  CHEWY_COMPONENT_DEFINITION_DIR_NAME,
  CHEWY_COMPONENT_DEFINITION_FILE_NAME,
  CHEWY_VERSION,
} from '../../constants';
import { installRoot } from '../../project';
import {
  setWorkingDirectory,
  unsetWorkingDirectory,
} from '../../state/working-directory/working-directory';
import fetchComponentDefinition from '../fetch-component-definition/fetch-component-definition';
import fetchComponentVersions from '../fetch-component-versions/fetch-component-versions';
import installComponent from './install-component';

describe('installComponent', () => {
  const rootInstallPath = resolve(
    CHEWY_BASE_TEST_DIR,
    `chewy-test-project-${Date.now()}-${Math.floor(Math.random() * 10)}`
  );

  beforeAll(async () => {
    await installRoot(rootInstallPath, {
      name: 'chewy-test-project',
      chewy: {
        version: CHEWY_VERSION,
      },
    });
  });

  it('installs the component', async () => {
    const name = 'ory-kratos';
    const url = componentSources['ory-kratos'];
    const refType = 'branch';
    const versions = await fetchComponentVersions(url, refType);
    const versionMatchingChewyLib = versions.find(
      ({ ref }) => ref === CHEWY_VERSION
    );
    const otherVersion = versions.find(({ ref }) => ref.includes('.'));
    const version = versionMatchingChewyLib || otherVersion;
    if (!version) throw new Error('No version found for component.');
    const definition = await fetchComponentDefinition(
      url,
      version.ref,
      refType
    );
    console.log(rootInstallPath);
    setWorkingDirectory(rootInstallPath);
    await installComponent({
      name,
      url,
      versionSha: version.sha,
      type: definition.type,
    });
    const contentsBuffer = readFileSync(
      resolve(
        rootInstallPath,
        definition.type,
        name,
        CHEWY_COMPONENT_DEFINITION_DIR_NAME,
        CHEWY_COMPONENT_DEFINITION_FILE_NAME
      )
    );
    const contents = jsyaml.load(
      contentsBuffer.toString()
    ) as ComponentDefinition;
    expect(contents).toEqual(definition);
    unsetWorkingDirectory();
  });

  afterAll(async () => {
    await rmfr(rootInstallPath);
  });
});
