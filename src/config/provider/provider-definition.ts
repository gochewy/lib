import { z } from 'zod';
import providerDefinitionSchema from './provider-definition-schema';

type ProviderDefinition = z.TypeOf<typeof providerDefinitionSchema>;

export default ProviderDefinition;
