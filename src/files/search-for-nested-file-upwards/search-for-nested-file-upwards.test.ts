import { createFileSync } from 'fs-extra';
import { mkdir, rm } from 'fs/promises';
import path from 'path';
import {
  CHEWY_PROJECT_CONFIG_DIR_NAME,
  CHEWY_PROJECT_CONFIG_FILE_NAME,
} from '../../constants';
import searchForNestedFileUpwards from './search-for-nested-file-upwards';

describe('searchForDirectoryUpwards', () => {
  const tmpDirBase = '/tmp/tmp';
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
    expect(searchForNestedFileUpwards(tmpDir, search)).toBe('/tmp/tmp');
  });

  it('returns an empty string if the directory does not exist', () => {
    expect(searchForNestedFileUpwards('/tmp', search)).toBe(null);
  });

  afterAll(() => {
    rm(tmpDirBase, { recursive: true, force: true });
  });
});
