import { writeJsonSync } from 'fs-extra';
import { resolve } from 'path';
import zodToJsonSchema from 'zod-to-json-schema';
import { componentDefinitionSchema } from '../config/component/component-definition';
import { environmentDefinitionSchema } from '../config/environment/environment-definition';
import { projectConfigSchema } from '../config/project/project-config';
import { providerDefinitionSchema } from '../config/provider/provider-definition';

const componentSchema = zodToJsonSchema(componentDefinitionSchema);
const projectSchema = zodToJsonSchema(projectConfigSchema);
const environmentSchema = zodToJsonSchema(environmentDefinitionSchema);
const providerSchema = zodToJsonSchema(providerDefinitionSchema);

writeJsonSync(
  resolve(__dirname + '/../../schemas/chewy-component-schema.json'),
  componentSchema
);
writeJsonSync(
  resolve(__dirname + '/../../schemas/chewy-project-schema.json'),
  projectSchema
);
writeJsonSync(
  resolve(__dirname + '/../../schemas/chewy-environment-schema.json'),
  environmentSchema
);
writeJsonSync(
  resolve(__dirname + '/../../schemas/chewy-provider-schema.json'),
  providerSchema
);
