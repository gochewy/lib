import { writeFileSync } from 'fs-extra';
import { dump } from 'js-yaml';
import { EnvironmentDefinition } from '../../config/environment';
import getEnvironmentFile from '../../files/get-environment-file/get-environment-file';

export default function setEnvironment(
  environmentName: string,
  environment: EnvironmentDefinition
) {
  const environmentYaml = dump(environment);
  const environmentFile = getEnvironmentFile(environmentName);
  writeFileSync(environmentFile, environmentYaml);
}
