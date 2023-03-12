import { outputFileSync } from 'fs-extra';
import { getEnvironmentSecretFile } from '../../files';

export default function setEnvironmentSecret(
  environmentName: string,
  secret: string
) {
  const secretFile = getEnvironmentSecretFile(environmentName);
  outputFileSync(secretFile, secret);
}
