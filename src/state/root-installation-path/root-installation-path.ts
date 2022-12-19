import { resolve } from 'path';

let rootInstallationPath: string | undefined = undefined;

export const unsetRootInstallationPath = () =>
  (rootInstallationPath = undefined);
export const setRootInstallationPath = (value: string) =>
  (rootInstallationPath = resolve(value));
export const getRootInstallationPath = () => rootInstallationPath;
