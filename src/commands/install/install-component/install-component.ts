import { GitProcess } from 'dugite';
import { z } from 'zod';
import getProjectRootDir from '../../../files/get-project-root-dir/get-project-root-dir';
import { resourceNameSchema } from '../../../utils';
import { resolve } from 'path';
import { CHEWY_GLOBAL_TMP_COMPONENT_DIR_NAME } from '../../../constants';
import fetchComponentDefinition from '../../../components/fetch-component-definition/fetch-component-definition';

interface InstallComponentOptions {
  name: string;
  url: string;
  version: string;
  refType?: Parameters<typeof fetchComponentDefinition>[2];
}

export default async function installComponent({
  name,
  url,
  version,
  refType,
}: InstallComponentOptions) {
  const root = getProjectRootDir();
  const validName = resourceNameSchema.parse(name);
  const validUrl = z.string().parse(url);

  const definition = await fetchComponentDefinition(validUrl, version, refType);

  // const globalComponentsDir = resolve(
  //   `${CHEWY_GLOBAL_TMP_COMPONENT_DIR_NAME}`,
  //   'components'
  // );

  // const componentDir = resolve(globalComponentsDir, validName);

  // const cloneResult = await GitProcess.exec(
  //   ['clone', validUrl, validName],
  //   globalComponentsDir
  // );

  // console.log(cloneResult);

  // try {
  //   await GitProcess.exec(
  //     ['checkout', version],
  //     resolve(globalComponentsDir, validName)
  //   );
  // } catch (e) {}

  // await GitProcess.exec(
  //   ['subtree', 'add', '--prefix', validName, validUrl, version],
  //   root
  // );
}
