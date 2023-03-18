import { z } from 'zod';
import componentTypeSchema from './component-type-schema';

const componentLinksSchema = z.object({
  links: z
    .array(
      z.object({
        name: z.string(),
        type: componentTypeSchema,
        role: z.string(),
        repository: z.string(),
        unique: z.boolean().default(true),
        sourceEnvironments: z.array(z.string()).optional(),
        targetEnvironment: z.string().optional(),
      })
    )
    .optional(),
});

export default componentLinksSchema;
