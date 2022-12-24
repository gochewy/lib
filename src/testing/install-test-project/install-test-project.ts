import { resolve } from 'path';
import {
  fetchComponentDefinition,
  fetchComponentVersions,
  installComponent,
} from '../../components';
import { componentSources } from '../../config/component';
import { CHEWY_BASE_TEST_DIR, CHEWY_VERSION } from '../../constants';
import { installRoot } from '../../project';
import {
  setWorkingDirectory,
  unsetWorkingDirectory,
} from '../../state/working-directory/working-directory';

interface InstallTestProjectOptions {
  testProjectName?: string;
  testComponentName?: string;
  testComponentUrl?: string;
  testProjectPath?: string;
}

export default async function installTestProject({
  testProjectPath,
  testProjectName = 'chewy-test-project',
  testComponentName = 'ory-kratos',
  testComponentUrl = componentSources['ory-kratos'],
}: InstallTestProjectOptions) {
  const rootInstallPath =
    testProjectPath ||
    resolve(
      CHEWY_BASE_TEST_DIR,
      `${testProjectName}-${Math.floor(Math.random() * 1000)}`
    );

  await installRoot(rootInstallPath, {
    name: testProjectName,
    chewy: {
      version: CHEWY_VERSION,
    },
  });

  const versions = await fetchComponentVersions(testComponentUrl);

  const versionMatchingChewyLib = versions.find(
    ({ ref }) => ref === CHEWY_VERSION
  );

  const otherVersion = versions.find(({ ref }) => ref.includes('.'));
  const version = versionMatchingChewyLib || otherVersion;

  if (!version) throw new Error('No version found for component.');

  const definition = await fetchComponentDefinition(
    testComponentUrl,
    version.ref
  );

  setWorkingDirectory(rootInstallPath);

  await installComponent({
    name: testComponentName,
    url: testComponentUrl,
    version: CHEWY_VERSION,
  });

  unsetWorkingDirectory();

  return {
    rootInstallPath,
    testComponentName,
    testComponentUrl,
    testComponentType: definition.type,
  };
}
