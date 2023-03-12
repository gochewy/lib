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
    log.error('Cannot run commands.', {
      source: validName,
    });
    return;
  }

  log.info('Running init...', {
    subtle: true,
    source: validName,
  });

  const commandsCommand =
    process.env.NODE_ENV === 'development' ? 'commands-dev' : 'commands';

  await execAsync(`yarn ${commandsCommand} init`, {
    cwd,
  });
}
