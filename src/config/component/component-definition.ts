import { z } from 'zod';
import componentDefinitionSchema from './component-definition-schema';

type ComponentDefinition = z.TypeOf<typeof componentDefinitionSchema>;

export default ComponentDefinition;
