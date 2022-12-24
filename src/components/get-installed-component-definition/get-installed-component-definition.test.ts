import rmfr from 'rmfr';
import { componentSources } from '../../config/component';
import { setWorkingDirectory } from '../../state/working-directory/working-directory';
import installTestProject from '../../testing/install-test-project/install-test-project';
import getInstalledComponentDefinition from './get-installed-component-definition';

describe('getInstalledComponentDefinition', () => {
  const testComponentName = 'ory-kratos';
  const testProjectName = 'get-installed-component-definition-test';
  const testComponentUrl = componentSources['ory-kratos'];

  const install = () =>
    installTestProject({
      testProjectName,
      testComponentName,
      testComponentUrl,
    });

  it('gets the component definition', async () => {
    const installOutput = await install();
    setWorkingDirectory(installOutput.rootInstallPath);
    const componentDefinition = getInstalledComponentDefinition({
      name: testComponentName,
    });
    expect(componentDefinition.name).toBeTruthy();
    await rmfr(installOutput.rootInstallPath);
  });
});
