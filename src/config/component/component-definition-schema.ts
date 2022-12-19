import { z } from 'zod';

const dependencySchema = z.object({
  repository: z.string(),
  role: z.string(),
});

const componentDefinitionSchema = z.object({
  repository: z.string().url(),
  name: z.string(),
  type: z.enum(['infrastructure', 'service', 'source']),
  version: z.string(),
  dependencies: z.array(dependencySchema),
});

export default componentDefinitionSchema;
