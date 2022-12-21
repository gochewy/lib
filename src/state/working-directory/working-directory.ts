import { isAbsolute } from 'path';
import process from 'process';
let workingDirectory: string | undefined;

export const unsetWorkingDirectory = () => (workingDirectory = undefined);
export const getWorkingDirectory = () => workingDirectory ?? process.cwd();
export const setWorkingDirectory = (path: string) => {
  if (!isAbsolute(path)) {
    throw Error('Path must be absolute.');
  }
  workingDirectory = path;
};
