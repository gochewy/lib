import { z } from 'zod';
import componentTypeSchema from './component-type-schema copy';

const dependencySchema = z.object({
  repository: z.string(),
  role: z.string(),
});

const componentDefinitionSchema = z.object({
  repository: z.string().url(),
  name: z.string(),
  type: componentTypeSchema,
  version: z.string(),
  dependencies: z.array(dependencySchema),
});

export default componentDefinitionSchema;
