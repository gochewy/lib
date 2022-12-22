import rmfr from 'rmfr';
import { componentSources } from '../../config/component';
import { setWorkingDirectory } from '../../state/working-directory/working-directory';
import installTestProject from '../../testing/install-test-project/install-test-project';
import getComponentDir from './get-component-dir';
import { resolve } from 'path';

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
    expect(directory).toEqual(
      `${installOutput.rootInstallPath}/${installOutput.testComponentType}/${testComponentName}`
    );
  });

  it('gets the component directory by name and type', async () => {
    setWorkingDirectory(installOutput.rootInstallPath);
    const directory = getComponentDir({
      name: installOutput.testComponentName,
      type: installOutput.testComponentType,
    });
    expect(directory).toEqual(
      `${installOutput.rootInstallPath}/${installOutput.testComponentType}/${testComponentName}`
    );
  });

  it('gets the component from the current directory', async () => {
    setWorkingDirectory(
      resolve(
        installOutput.rootInstallPath,
        installOutput.testComponentType,
        installOutput.testComponentName
      )
    );
    const directory = getComponentDir();
    expect(directory).toEqual(
      `${installOutput.rootInstallPath}/${installOutput.testComponentType}/${testComponentName}`
    );
  });

  afterAll(async () => {
    await rmfr(installOutput.rootInstallPath);
  });
});
