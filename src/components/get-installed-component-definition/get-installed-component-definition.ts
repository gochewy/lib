import { readFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { resolve } from 'path';
import { componentDefinitionSchema } from '../../config/component';
import {
  CHEWY_COMPONENT_DEFINITION_DIR_NAME,
  CHEWY_COMPONENT_DEFINITION_FILE_NAME,
} from '../../constants';
import getComponentDir from '../../files/get-component-dir/get-component-dir';

type Opts = Parameters<typeof getComponentDir>;

export default function getInstalledComponentDefinition(...opts: Opts) {
  const componentDir = getComponentDir(...opts);
  const definitionPath = resolve(
    componentDir,
    CHEWY_COMPONENT_DEFINITION_DIR_NAME,
    CHEWY_COMPONENT_DEFINITION_FILE_NAME
  );
  const definition = jsyaml.load(readFileSync(definitionPath, 'utf8'));
  const parsedDefinition = componentDefinitionSchema.parse(definition);
  return parsedDefinition;
}
