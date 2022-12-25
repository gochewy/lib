import { resolve } from 'path';
import { CHEWY_BASE_TEST_DIR } from '../../constants';

export default function getTestPath(dirname: string) {
  return resolve(CHEWY_BASE_TEST_DIR, dirname);
}
