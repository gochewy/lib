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
  testComponentRefType?: Parameters<typeof fetchComponentVersions>[1];
}

export default async function installTestProject({
  testProjectName = 'chewy-test-project',
  testComponentName = 'ory-kratos',
  testComponentUrl = componentSources['ory-kratos'],
  testComponentRefType = 'branch',
}: InstallTestProjectOptions) {
  const rootInstallPath = resolve(
    CHEWY_BASE_TEST_DIR,
    `${testProjectName}-${Math.floor(Math.random() * 100)}`
  );

  await installRoot(rootInstallPath, {
    name: testProjectName,
    chewy: {
      version: CHEWY_VERSION,
    },
  });

  const versions = await fetchComponentVersions(
    testComponentUrl,
    testComponentRefType
  );

  const versionMatchingChewyLib = versions.find(
    ({ ref }) => ref === CHEWY_VERSION
  );

  const otherVersion = versions.find(({ ref }) => ref.includes('.'));
  const version = versionMatchingChewyLib || otherVersion;

  if (!version) throw new Error('No version found for component.');

  const definition = await fetchComponentDefinition(
    testComponentUrl,
    version.ref,
    testComponentRefType
  );

  setWorkingDirectory(rootInstallPath);

  console.log(definition);

  await installComponent({
    name: testComponentName,
    url: testComponentUrl,
    versionSha: version.sha,
    type: definition.type,
  });

  unsetWorkingDirectory();

  return {
    rootInstallPath,
    testComponentName,
    testComponentUrl,
  };
}
