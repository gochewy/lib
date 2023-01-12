import { z } from 'zod';
import { CHEWY_VERSION } from '../../constants';
import componentTypeSchema from './component-type-schema';

const dependencySchema = z.object({
  repository: z.string(),
  role: z.string(),
  version: z.string().default(CHEWY_VERSION),
  unique: z.boolean().default(true),
  required: z.boolean().default(true),
});

const componentDefinitionSchema = z.object({
  repository: z.string().url(),
  name: z.string(),
  type: componentTypeSchema,
  version: z.string(),
  dependencies: z.array(dependencySchema).optional(),
  config: z.record(z.any()).optional(),
});

export default componentDefinitionSchema;
