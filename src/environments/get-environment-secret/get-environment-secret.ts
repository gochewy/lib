import { readFileSync } from 'fs-extra';
import { getEnvironmentSecretFile } from '../../files';

export default function getEnvironmentSecret(environmentName: string) {
  const secretFile = getEnvironmentSecretFile(environmentName);
  return readFileSync(secretFile, 'utf-8');
}
