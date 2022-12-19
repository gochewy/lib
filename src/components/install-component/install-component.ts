import { GitProcess } from 'dugite';
import { z } from 'zod';
import { ComponentDefinition } from '../../config/component';
import getProjectRootDir from '../../files/get-project-root-dir/get-project-root-dir';
import { resourceNameSchema } from '../../utils';
import { join } from 'path';

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

  await GitProcess.exec(
    ['subtree', 'add', '--prefix', path, validUrl, versionSha],
    root
  );
}
