import { z } from 'zod';

const environmentVariableSchema = z.object({
  name: z.string(),
  value: z.string(),
  encrypted: z.boolean().optional(),
  public: z.boolean().optional(),
});

const environmentDefinitionSchema = z.object({
  name: z.string(),
  config: z.array(environmentVariableSchema),
  type: z.enum(['infrastructure', 'application']).optional(),
});

export default environmentDefinitionSchema;
