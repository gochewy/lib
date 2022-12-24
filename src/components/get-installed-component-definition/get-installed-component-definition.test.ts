import rmfr from 'rmfr';
import { componentSources } from '../../config/component';
import { setWorkingDirectory } from '../../state/working-directory/working-directory';
import installTestProject from '../../testing/install-test-project/install-test-project';
import getInstalledComponentDefinition from './get-installed-component-definition';

describe('getInstalledComponentDefinition', () => {
  let installOutput: Awaited<ReturnType<typeof installTestProject>>;
  const testComponentName = 'ory-kratos';

  beforeAll(async () => {
    installOutput = await installTestProject({
      testProjectName: 'get-installed-component-definition-test',
      testComponentName,
      testComponentUrl: componentSources['ory-kratos'],
    });
  });

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
