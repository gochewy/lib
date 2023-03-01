import { writeFileSync } from 'fs-extra';
import { dump } from 'js-yaml';
import { ProjectConfig } from '../../config/project';
import { getProjectConfigFile } from '../../files';

export default function setProjectConfig(config: ProjectConfig) {
  const configFile = getProjectConfigFile();
  const configYaml = dump(config);
  writeFileSync(configFile, configYaml);
}
