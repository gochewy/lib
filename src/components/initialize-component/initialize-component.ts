import { existsSync } from 'fs-extra';
import { getComponentCommandsDir } from '../../files';
import log from '../../utils/log/log';
import { execAsync } from '../install-component/install-component';

/**
 * Each component has its own "commands" in the form of a node-based CLI. The CLI
 * needs to be built before it can be properly used. This function installs the CLI's dependencies
 * and runs the build command.
 *
 * @param projectRoot The project root directory
 * @param componentPath The relative path to the component
 * @param validName The name of the component
 * @returns
 */
export default async function initializeComponentCommands(
  ...opts: Parameters<typeof getComponentCommandsDir>
) {
  const cwd = getComponentCommandsDir(...opts);

  if (!existsSync(cwd)) {
    log.error('No commands found. This is a problem with the component.');
    return;
  }

  log.info('Installing command dependencies...', {
    subtle: true,
  });
  await execAsync('yarn install && yarn build', {
    cwd,
  });

  log.info('Running init...', {
    subtle: true,
  });
  // TODO: We currently run this with the dev cli because the production cli
  // throws a weird error despite the fact that it's built.
  await execAsync('yarn commands-dev init', {
    cwd,
  });
}
