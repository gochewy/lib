import { z } from 'zod';
import componentTypeSchema from './component-type-schema';

const componentLinksSchema = z.object({
  links: z
    .array(
      z.object({
        name: z.string(),
        type: componentTypeSchema,
        repository: z.string(),
        role: z.string(),
        unique: z.boolean().default(true),
        environments: z.array(z.string()).default(['*']),
      })
    )
    .optional(),
});

export default componentLinksSchema;
