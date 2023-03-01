import { readFileSync } from 'fs-extra';
import { load } from 'js-yaml';
import { environmentDefinitionSchema } from '../../config/environment';
import getEnvironmentFile from '../get-environment-file/get-environment-file';

export default function getEnvironment(environmentName: string) {
  const environmentFile = getEnvironmentFile(environmentName);
  const environmentYaml = readFileSync(environmentFile, 'utf8');
  const environment = load(environmentYaml);
  const safeEnvironment = environmentDefinitionSchema.parse(environment);
  return safeEnvironment;
}
