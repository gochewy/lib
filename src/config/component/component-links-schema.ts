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
        sourceEnvironments: z
          .array(z.string(), {
            description:
              'The source environment is the environment in which current component depends on the linked component.',
          })
          .optional(),
        targetEnvironment: z
          .string({
            description:
              'The target environment is the environment that the linked component should be exist in to satisfy the link. i.e. if the link configuration is in a "postgres" service and the link is to a "postgresServer" with the target environment "global" then global-infrastructure-postgres-server will be targeted.',
          })
          .optional(),
      }),
      {
        description:
          'There should be, at most, one "infrastructure" component per sourceEnvironment. For every environment, a component should only have a single deployment target.',
      }
    )
    .optional(),
});

export default componentLinksSchema;
