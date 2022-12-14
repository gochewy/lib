let isInstallingRoot = false;
export const setIsInstallingRoot = (value: boolean) =>
  (isInstallingRoot = value);
export const getIsInstallingRoot = () => isInstallingRoot;

let installingDir: string | undefined = undefined;
export const setInstallingDir = (value: string) => (installingDir = value);
export const getInstallingDir = () => installingDir;
