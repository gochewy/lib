import { z } from 'zod';

export const projectConfigSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  chewy: z.object({
    version: z.string(),
  }),
});

export type ProjectConfig = z.TypeOf<typeof projectConfigSchema>;
export type ProjectConfigInput = Omit<ProjectConfig, 'id'>;
