import { z } from "zod";

const EnvironmentVariable = z.object({
  value: z.string(),
  encrypted: z.boolean().optional(),
  public: z.boolean().optional(),
})

export const EnvironmentDefinition = z.object({
  name: z.string(),
  config: z.array(EnvironmentVariable),
});
