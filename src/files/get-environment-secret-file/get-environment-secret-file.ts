import getProjectEnvironmentDir from '../get-project-environment-dir/get-project-environment-dir';
import { resolve } from 'path';

export default function getEnvironmentSecretFile(
  environmentName: string
): string {
  const environmentDir = getProjectEnvironmentDir();
  return resolve(environmentDir, `${environmentName}.secret`);
}
