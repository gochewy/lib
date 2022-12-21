import { GitProcess } from 'dugite';
import { z } from 'zod';
import { ComponentDefinition } from '../../config/component';
import getProjectRootDir from '../../files/get-project-root-dir/get-project-root-dir';
import { resourceNameSchema } from '../../utils';
import { join } from 'path';
import { setLocalGit, unsetLocalGit } from '../../state/local-git/local-git';

interface InstallComponentOptions {
  name: string;
  url: string;
  versionSha: string;
  type: ComponentDefinition['type'];
}

export default async function installComponent({
  name,
  url,
  versionSha,
  type,
}: InstallComponentOptions) {
  const root = getProjectRootDir();
  const validName = resourceNameSchema.parse(name);
  const validUrl = z.string().parse(url);
  const path = join(type, validName);

  await setLocalGit();
  const output = await GitProcess.exec(
    ['subtree', 'add', '--prefix', path, validUrl, versionSha],
    root
  );
  console.log('hello');
  console.log(root);
  console.log(path);
  console.log(validUrl);
  console.log(versionSha);
  console.log(output);
  unsetLocalGit();
}
