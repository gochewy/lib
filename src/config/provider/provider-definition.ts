import { z } from "zod";

export const providerDefinitionSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
});

export type ProviderDefinition = z.TypeOf<typeof providerDefinitionSchema>;
