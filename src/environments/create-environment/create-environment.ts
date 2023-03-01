import { z } from 'zod';
import { environmentDefinitionSchema } from '../../config/environment';
import setEnvironment from '../set-environment/set-environment';

export default function createEnvironment(environmentName: string) {
  const validEnvironmentName = z
    .string()
    .regex(/^[a-z]+(-[a-z]+)*$/)
    .parse(environmentName);

  const environment = environmentDefinitionSchema.parse({
    name: validEnvironmentName,
    config: [],
  });
  setEnvironment(environmentName, environment);
}
