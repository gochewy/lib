import rmfr from 'rmfr';
import { componentSources } from '../../config/component';
import { setWorkingDirectory } from '../../state/working-directory/working-directory';
import installTestProject from '../../testing/install-test-project/install-test-project';
import getComponentDir from './get-component-dir';

describe('getComponentDir', () => {
  let installOutput: Awaited<ReturnType<typeof installTestProject>>;
  const testComponentName = 'ory-kratos';

  beforeAll(async () => {
    installOutput = await installTestProject({
      testComponentName,
      testComponentUrl: componentSources['ory-kratos'],
    });
  });

  it('gets the component directory by name', async () => {
    setWorkingDirectory(installOutput.rootInstallPath);
    const directory = getComponentDir({
      name: installOutput.testComponentName,
    });
    console.log(directory);
  });

  // it('gets the component directory by name and type', async () => {
  //   console.log(installOutput);
  //   setWorkingDirectory(installOutput.rootInstallPath);
  //   const directory = getComponentDir({
  //     name: installOutput.testComponentName,
  //   });
  //   console.log(directory);
  // });

  afterAll(() => {
    rmfr(installOutput.rootInstallPath);
  });
});
