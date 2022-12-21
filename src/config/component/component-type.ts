import { z } from 'zod';
import componentTypeSchema from './component-type-schema copy';

type ComponentType = z.TypeOf<typeof componentTypeSchema>;

export default ComponentType;
