import { z } from 'zod';

const projectConfigSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  chewy: z.object({
    version: z.string(),
  }),
});

export default projectConfigSchema;
