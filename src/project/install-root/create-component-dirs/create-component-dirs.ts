import { mkdirSync, writeFileSync } from 'fs-extra';
import { resolve } from 'path';
import {
  CHEWY_INFRA_DIR_NAME,
  CHEWY_SERVICE_DIR_NAME,
  CHEWY_SOURCE_DIR_NAME,
} from '../../../constants';
import { getRootInstallationPath } from '../../../state';

export default function createComponentDirs() {
  const path = getRootInstallationPath();

  if (!path)
    throw new Error('Cannot create component dirs without installing dir');

  const dirs = [
    resolve(path, CHEWY_INFRA_DIR_NAME),
    resolve(path, CHEWY_SERVICE_DIR_NAME),
    resolve(path, CHEWY_SOURCE_DIR_NAME),
  ];

  dirs.forEach((dir) => mkdirSync(dir, { recursive: true }));
  dirs.forEach((dir) => {
    const gitignorePath = resolve(dir, '.gitignore');
    writeFileSync(gitignorePath, '');
  });
}
