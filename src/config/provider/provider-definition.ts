import { z } from "zod";

export const ProviderDefinition = z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
})