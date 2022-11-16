import {z} from "zod";

export const ComponentDefinition = z.object({
    repository: z.string().url(),
    name: z.string(),
    type: z.enum(['infra', 'service', 'source']),
});

