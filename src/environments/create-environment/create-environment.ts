import { z } from 'zod';
import { environmentDefinitionSchema } from '../../config/environment';
import setEnvironment from '../set-environment/set-environment';
import crypto from 'crypto';
import setEnvironmentSecret from '../set-environment-secret/set-environment-secret';

function generateSecret() {
  return crypto.randomBytes(64).toString('hex');
}

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
  const secret = generateSecret();
  setEnvironmentSecret(environmentName, secret);
}
