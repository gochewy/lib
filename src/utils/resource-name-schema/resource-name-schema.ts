import { z } from 'zod';

const resourceNameSchema = z
  .string()
  .regex(
    /^[a-z]+[a-z\d-]*[\da-z]*(?<!-)$/,
    'Resource name must be lowercase, alphanumeric, may contain dashes, must start with a letter, and cannot end in a dash.'
  );
export default resourceNameSchema;
