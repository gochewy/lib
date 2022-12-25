import rmfr from 'rmfr';
import { componentSources } from '../../config/component';
import getTestPath from '../../files/get-test-path/get-test-path';
import { setWorkingDirectory } from '../../state/working-directory/working-directory';
import installTestProject from '../../testing/install-test-project/install-test-project';
import getInstalledComponentDefinition from './get-installed-component-definition';

describe('getInstalledComponentDefinition', () => {
  let installOutput: Awaited<ReturnType<typeof installTestProject>>;
  const testProjectPath = getTestPath(
    'get-installed-component-definition-test'
  );
  const testComponentName = 'ory-kratos';
  const testProjectName = 'get-installed-component-definition-test';
  const testComponentUrl = componentSources['ory-kratos'];

  beforeAll(async () => {
    await rmfr(testProjectPath);
    const output = await installTestProject({
      testProjectPath,
      testProjectName,
      testComponentName,
      testComponentUrl,
    });
    installOutput = output;
    return output;
  }, 30000);

  it('gets the component definition', () => {
    setWorkingDirectory(installOutput.rootInstallPath);
    const componentDefinition = getInstalledComponentDefinition({
      name: testComponentName,
    });
    expect(componentDefinition.name).toBeTruthy();
  });

  afterAll(async () => {
    await rmfr(installOutput.rootInstallPath);
  });
});
