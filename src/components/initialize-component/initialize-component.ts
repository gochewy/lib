import { exec } from 'child_process';
import { existsSync } from 'fs-extra';
import { promisify } from 'util';
import { getComponentCommandsDir } from '../../files';
import { GetComponentDirOptions } from '../../files/get-component-dir/get-component-dir';
import log from '../../utils/log/log';
import getComponentName from '../get-component-name/get-component-name';

const execAsync = promisify(exec);

export default async function initializeComponent(
  componentOpts: GetComponentDirOptions
) {
  const validName = getComponentName(componentOpts);
  const cwd = getComponentCommandsDir(componentOpts);

  if (!existsSync(cwd)) {
    log.error('No commands found. This is a problem with the component.');
    return;
  }

  log.info('Running init...', {
    subtle: true,
    source: validName,
  });

  await execAsync('yarn commands init', {
    cwd,
  });
}
