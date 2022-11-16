import { writeFileSync } from 'fs';
import { writeJsonSync } from 'fs-extra';
import { resolve } from 'path';
import zodToJsonSchema from 'zod-to-json-schema';
import { ComponentDefinition } from '../config/component/component-definition';
import { EnvironmentDefinition } from '../config/environment/environment-definition';
import { ProjectConfig } from '../config/project/project-config';
import { ProviderDefinition } from '../config/provider/provider-definition';

const componentSchema = zodToJsonSchema(ComponentDefinition);
const projectSchema = zodToJsonSchema(ProjectConfig);
const environmentSchema = zodToJsonSchema(EnvironmentDefinition);
const providerSchema = zodToJsonSchema(ProviderDefinition);

writeJsonSync(resolve(__dirname+'/../../schemas/chewy-component-schema.json'), componentSchema);
writeJsonSync(resolve(__dirname+'/../../schemas/chewy-project-schema.json'), projectSchema);
writeJsonSync(resolve(__dirname+'/../../schemas/chewy-environment-schema.json'), environmentSchema);
writeJsonSync(resolve(__dirname+'/../../schemas/chewy-provider-schema.json'), providerSchema);
