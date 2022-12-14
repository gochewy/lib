import { z } from 'zod';

const environmentVariableSchema = z.object({
  name: z.string(),
  value: z.string(),
  encrypted: z.boolean().optional(),
  public: z.boolean().optional(),
});

export const environmentDefinitionSchema = z.object({
  name: z.string(),
  config: z.array(environmentVariableSchema),
});

export type EnvironmentDefinition = z.TypeOf<
  typeof environmentDefinitionSchema
>;
