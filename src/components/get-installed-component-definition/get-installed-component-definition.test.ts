import rmfr from 'rmfr';
import { componentSources } from '../../config/component';
import { setWorkingDirectory } from '../../state/working-directory/working-directory';
import installTestProject from '../../testing/install-test-project/install-test-project';
import getInstalledComponentDefinition from './get-installed-component-definition';

describe('getInstalledComponentDefinition', () => {
  let installOutput: Awaited<ReturnType<typeof installTestProject>>;
  const testComponentName = 'ory-kratos';
  const testProjectName = 'get-installed-component-definition-test';
  const testComponentUrl = componentSources['ory-kratos'];

  beforeAll(async () => {
    const output = await installTestProject({
      testProjectName,
      testComponentName,
      testComponentUrl,
    });
    installOutput = output;
    return output;
  }, 30000);

  it('gets the component definition', async () => {
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
