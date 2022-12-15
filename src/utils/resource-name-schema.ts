import { z } from 'zod';

const resourceNameSchema = z.string().regex(/^[a-z0-9-]+$/);
export default resourceNameSchema;
