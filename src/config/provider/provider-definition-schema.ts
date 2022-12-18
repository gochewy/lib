import { z } from 'zod';

const providerDefinitionSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
});

export default providerDefinitionSchema;
