import getProjectEnvironmentDir from '../get-project-environment-secrets-dir/get-project-environment-secrets-dir';
import { resolve } from 'path';

export default function getEnvironmentSecretFile(
  environmentName: string
): string {
  const environmentDir = getProjectEnvironmentDir();
  return resolve(environmentDir, `${environmentName}.secret`);
}
