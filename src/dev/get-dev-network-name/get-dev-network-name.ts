import getProjectConfig from '../../project/get-project-config/get-project-config';

export default function getDevNetworkName() {
  const projectConfig = getProjectConfig();
  return `${projectConfig.name}-${projectConfig.id}`;
}
