import { resolve } from 'path';
import { CHEWY_ENVIRONMENT_FILE_EXTENSION } from '../../constants';
import { getProjectConfigDir } from '../../files';

export default function getEnvironmentFile(environment: string) {
  const projectConfigDir = getProjectConfigDir();
  const environmentFile = resolve(
    projectConfigDir,
    `${environment}.${CHEWY_ENVIRONMENT_FILE_EXTENSION}`
  );
  return environmentFile;
}
