import { createFileSync } from 'fs-extra';
import { mkdir, rm } from 'fs/promises';
import path from 'path';
import rmfr from 'rmfr';
import {
  CHEWY_BASE_TEST_DIR,
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
} from '../../constants';
import searchForNestedFileUpwards from './search-for-nested-file-upwards';

describe('searchForDirectoryUpwards', () => {
  const tmpDirBase = path.resolve(CHEWY_BASE_TEST_DIR, 'dir-search-test');
  const tmpDir = path.resolve(tmpDirBase, CHEWY_PROJECT_CONFIG_DIR_NAME);
  const tmpFile = path.resolve(tmpDir, CHEWY_PROJECT_CONFIG_FILE_NAME);
  const search = [
    CHEWY_PROJECT_CONFIG_DIR_NAME,
    CHEWY_PROJECT_CONFIG_FILE_NAME,
  ];

  beforeAll(async () => {
    await mkdir(tmpDir, { recursive: true });
    createFileSync(tmpFile);
  });

  it('returns the path to the directory if it exists', () => {
    expect(searchForNestedFileUpwards(tmpDir, search)).toBe(tmpDirBase);
  });

  it('returns null if the directory does not exist', () => {
    expect(searchForNestedFileUpwards('/tmp', search)).toBe(null);
  });

  afterAll(async () => {
    await rmfr(tmpDirBase);
  });
});
