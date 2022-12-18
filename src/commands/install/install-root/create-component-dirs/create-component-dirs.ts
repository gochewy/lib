import { mkdirSync, writeFileSync } from 'fs-extra';
import { getInstallingDir } from '../install-root-state/install-root-state';
import { resolve } from 'path';
import {
  CHEWY_INFRA_DIR_NAME,
  CHEWY_SERVICE_DIR_NAME,
  CHEWY_SOURCE_DIR_NAME,
} from '../../../../constants';

export default async function createComponentDirs() {
  const path = getInstallingDir();

  if (!path)
    throw new Error('Cannot create component dirs without installing dir');

  const dirs = [
    resolve(path, CHEWY_INFRA_DIR_NAME),
    resolve(path, CHEWY_SERVICE_DIR_NAME),
    resolve(path, CHEWY_SOURCE_DIR_NAME),
  ];

  dirs.forEach(dir => mkdirSync(dir, { recursive: true }));
  dirs.forEach(dir => {
    const gitignorePath = resolve(dir, '.gitignore');
    writeFileSync(gitignorePath, '');
  });
}
