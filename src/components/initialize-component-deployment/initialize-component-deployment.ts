import { exec } from 'child_process';
import { existsSync } from 'fs-extra';
import { promisify } from 'util';
import getComponentDeploymentDir from '../../files/get-component-deployment-dir/get-component-deployment-dir';
import { GetComponentDirOptions } from '../../files/get-component-dir/get-component-dir';
import log from '../../utils/log/log';
import getComponentName from '../get-component-name/get-component-name';

const execAsync = promisify(exec);

/**
 * Each component has its own "deployment" system in the form of a Pulumi program. The program
 * has dependencies that need to be installed before it can be properly used.
 */
export default async function initializeComponentDeployment(
  componentOpts: GetComponentDirOptions
) {
  const validName = getComponentName(componentOpts);
  const cwd = getComponentDeploymentDir(componentOpts);

  if (!existsSync(cwd)) {
    log('No deployment system found. This is a problem with the component.', {
      level: 'error',
      source: validName,
    });
    return;
  }

  log('Installing deployment dependencies...', {
    level: 'info',
    source: validName,
    subtle: true,
  });
  try {
    await execAsync('yarn install', {
      cwd,
    });
  } catch (err) {
    log('Failed to install deployment dependencies.', {
      level: 'error',
      source: validName,
    });
    throw err;
  }
}
