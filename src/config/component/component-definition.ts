import { z } from 'zod';

export const componentDefinitionSchema = z.object({
  repository: z.string().url(),
  name: z.string(),
  type: z.enum(['infra', 'service', 'source']),
  dependencies: z.array(z.string()),
});

export type ComponentDefinition = z.TypeOf<typeof componentDefinitionSchema>;
