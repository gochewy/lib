import { exec } from 'child_process';
import { existsSync } from 'fs-extra';
import { promisify } from 'util';
import { getComponentCommandsDir } from '../../files';
import { GetComponentDirOptions } from '../../files/get-component-dir/get-component-dir';
import log from '../../utils/log/log';
import getComponentName from '../get-component-name/get-component-name';

const execAsync = promisify(exec);

/**
 * Each component has its own "commands" in the form of a node-based CLI. The CLI
 * needs to be built before it can be properly used. This function installs the CLI's dependencies
 * and runs the build command.
 */
export default async function initializeComponentCommands(
  componentOpts: GetComponentDirOptions
) {
  const validName = getComponentName(componentOpts);
  const cwd = getComponentCommandsDir(componentOpts);

  if (!existsSync(cwd)) {
    log('No commands found. This is a problem with the component.', {
      level: 'error',
      source: validName,
    });
    return;
  }

  log('Installing command dependencies...', {
    level: 'info',
    source: validName,
    subtle: true,
  });
  try {
    await execAsync('yarn install && yarn build', {
      cwd,
    });
  } catch (err) {
    log.error(`⚠️⚠️⚠️ Failed to install command dependencies!`, {
      source: validName,
    });
    throw err;
  }
}
