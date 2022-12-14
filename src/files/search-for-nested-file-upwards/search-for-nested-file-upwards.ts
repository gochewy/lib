import { existsSync } from 'fs';
import path from 'path';

export default function searchForNestedFileUpwards(
  startDir: string,
  search: string[]
): string | null {
  const checkPath = path.resolve(startDir, ...search);
  const exists = existsSync(checkPath);
  if (exists) {
    return startDir;
  } else if (startDir === '/') {
    return null;
  }
  return searchForNestedFileUpwards(path.resolve(startDir, '..'), search);
}
