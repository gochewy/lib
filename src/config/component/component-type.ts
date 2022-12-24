import { z } from 'zod';
import componentTypeSchema from './component-type-schema';

type ComponentType = z.TypeOf<typeof componentTypeSchema>;

export default ComponentType;
