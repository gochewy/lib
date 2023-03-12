import { writeFileSync } from 'fs-extra';
import { getEnvironmentSecretFile } from '../../files';

export default function setEnvironmentSecret(
  environmentName: string,
  secret: string
) {
  const secretFile = getEnvironmentSecretFile(environmentName);
  writeFileSync(secretFile, secret);
}
