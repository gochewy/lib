import { resolve } from 'path';
import rmfr from 'rmfr';
import { componentSources } from '../../config/component';
import { CHEWY_BASE_TEST_DIR, CHEWY_VERSION } from '../../constants';
import { installRoot } from '../../project';
import {
  setWorkingDirectory,
  unsetWorkingDirectory,
} from '../../state/working-directory/working-directory';
import getInstalledComponentDefinition from '../get-installed-component-definition/get-installed-component-definition';
import installComponent from './install-component';

// use real timers
jest.useRealTimers();

describe('installComponent', () => {
  const rootInstallPath = resolve(CHEWY_BASE_TEST_DIR, `install-component`);

  beforeAll(async () => {
    await rmfr(rootInstallPath);
    await installRoot(rootInstallPath, {
      name: 'install-component-test',
      chewy: { version: CHEWY_VERSION },
    });
  }, 30000);

  it('installs the component', async () => {
    const name = 'nextjs';
    const url = componentSources['nextjs'];

    setWorkingDirectory(rootInstallPath);

    const { definition } = await installComponent({
      name,
      url,
      version: CHEWY_VERSION,
    });

    checkDefinition(definition);

    unsetWorkingDirectory();
  }, 30000);

  afterAll(async () => {
    await rmfr(rootInstallPath);
  });
});

function checkDefinition({ name }: { name: string }) {
  const installedDefinition = getInstalledComponentDefinition({
    name: name,
  });
  expect(installedDefinition.name).toEqual(name);
}
