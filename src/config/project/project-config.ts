import { z } from 'zod';

export const projectConfigSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type ProjectConfig = z.TypeOf<typeof projectConfigSchema>;
