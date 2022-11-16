import { z } from "zod";


export const ProjectConfig = z.object({
    id: z.string().uuid(),
    name: z.string(),
})