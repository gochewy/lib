import { getProjectConfig } from '../../project';

export default function getDevNetworkName() {
  const projectConfig = getProjectConfig();
  return `${projectConfig.name}-${projectConfig.id}`;
}
