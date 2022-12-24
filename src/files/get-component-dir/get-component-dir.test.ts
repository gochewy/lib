import { resolve } from 'path';
import rmfr from 'rmfr';
import { componentSources } from '../../config/component';
import componentTypeSchema from '../../config/component/component-type-schema';
import { CHEWY_BASE_TEST_DIR } from '../../constants';
import { setWorkingDirectory } from '../../state/working-directory/working-directory';
import installTestProject from '../../testing/install-test-project/install-test-project';
import getComponentDir from './get-component-dir';

describe('getComponentDir', () => {
  const testComponentName = 'ory-kratos';
  const testProjectName = 'get-component-dir-test';
  const testComponentUrl = componentSources['ory-kratos'];
  const testProjectPath = resolve(
    CHEWY_BASE_TEST_DIR,
    `${testProjectName}-${Math.floor(Math.random() * 1000)}`
  );

  const install = async () => {
    console.log('installing test project');
    const output = await installTestProject({
      testProjectPath,
      testProjectName,
      testComponentName,
      testComponentUrl,
    });
    console.log('@@ output', output);
    return output;
  };

  const teardown = () => rmfr(testProjectPath);

  it('gets the component directory by name', async () => {
    await install();
    console.log('@@ in the test');
    setWorkingDirectory(testProjectPath);
    const directory = getComponentDir({
      name: testComponentName,
    });
    expect(directory).toEqual(
      `${testProjectPath}/${componentTypeSchema.Enum.service}/${testComponentName}`
    );
    await teardown();
  });

  it('gets the component directory by name and type', async () => {
    await install();
    console.log('@@ in the test');
    setWorkingDirectory(testProjectPath);
    const directory = getComponentDir({
      name: testComponentName,
      type: componentTypeSchema.Enum.service,
    });
    expect(directory).toEqual(
      `${testProjectPath}/${componentTypeSchema.Enum.service}/${testComponentName}`
    );
    await teardown();
  });

  it('gets the component from the current directory', async () => {
    await install();
    console.log('@@ in the test');
    setWorkingDirectory(
      resolve(
        testProjectPath,
        componentTypeSchema.Enum.service,
        testComponentName
      )
    );
    const directory = getComponentDir();
    expect(directory).toEqual(
      `${testProjectPath}/${componentTypeSchema.Enum.service}/${testComponentName}`
    );
    await teardown();
  });
});
