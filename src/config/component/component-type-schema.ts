import { z } from 'zod';

const componentTypeSchema = z.enum(['infrastructure', 'service', 'source']);

export default componentTypeSchema;
