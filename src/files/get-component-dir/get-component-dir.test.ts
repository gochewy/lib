import rmfr from 'rmfr';
import { setWorkingDirectory } from '../../state/working-directory/working-directory';
import installTestProject from '../../testing/install-test-project/install-test-project';
import getComponentDir from './get-component-dir';

describe('getComponentDir', () => {
  let installOutput: Awaited<ReturnType<typeof installTestProject>>;

  beforeAll(async () => {
    installOutput = await installTestProject({});
  });

  it('gets the component directory', async () => {
    console.log(installOutput);
    setWorkingDirectory(installOutput.rootInstallPath);
    const directory = getComponentDir({
      name: installOutput.testComponentName,
    });
    console.log(directory);
  });

  afterAll(() => {
    rmfr(installOutput.rootInstallPath);
  });
});
