import { z } from 'zod';

const resourceNameSchema = z
  .string()
  .regex(
    /^[a-z0-9-]+$/,
    'Resource name must be lowercase, alphanumeric, may contain hyphens, and must start with a letter.'
  );
export default resourceNameSchema;
