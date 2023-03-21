import { execSync } from 'child_process';
import getComponentCommandsDir from '../../files/get-component-commands-dir/get-component-commands-dir';
import { GetComponentDirOptions } from '../../files/get-component-dir/get-component-dir';

interface RunCommandOptions {
  dirOpts: GetComponentDirOptions;
  command: string[];
}

/**
 * Runs a command in a component's commands directory.
 */
export default function runCommand({ dirOpts, command }: RunCommandOptions) {
  const cwd = getComponentCommandsDir(dirOpts);

  const commandsCommand =
    process.env.NODE_ENV === 'development' ? 'commands-dev' : 'commands';

  const fullCommand = ['yarn', 'run', commandsCommand, ...command].join(' ');

  execSync(fullCommand, { stdio: 'inherit', cwd });
}
