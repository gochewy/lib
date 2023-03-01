import { readFileSync } from 'fs-extra';
import { load } from 'js-yaml';
import { projectConfigSchema } from '../../config/project';
import { getProjectConfigFile } from '../../files';

export default function getProjectConfig() {
  const projectConfigPath = getProjectConfigFile();
  const configYaml = readFileSync(projectConfigPath, 'utf8');
  const config = load(configYaml);
  const safeConfig = projectConfigSchema.parse(config);
  return safeConfig;
}
