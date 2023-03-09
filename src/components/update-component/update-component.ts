import { red } from 'colorette';
import { GitProcess } from 'dugite';
import { getComponentDir, getProjectRootDir } from '../../files';
import { setLocalGit, unsetLocalGit } from '../../state';
import fetchUsableVersion from '../fetch-usable-version/fetch-usable-version';
import getInstalledComponentDefinition from '../get-installed-component-definition/get-installed-component-definition';

export default async function updateComponent(
  getComponentOpts: Parameters<typeof getComponentDir>,
  version = 'main'
) {
  const projectRoot = getProjectRootDir();
  const componentPath = getComponentDir(...getComponentOpts);
  const { repository: validUrl } = getInstalledComponentDefinition(
    ...getComponentOpts
  );
  const validVersion = await fetchUsableVersion(validUrl, version);

  await setLocalGit();
  const exec = [
    'subtree',
    'pull',
    '--prefix',
    componentPath,
    validUrl,
    validVersion.sha,
  ];

  const output = await GitProcess.exec(exec, projectRoot);

  if (output.exitCode !== 0) {
    throw new Error(
      red(
        `Failed to pull from subtree for ${getComponentOpts[0]?.name || ''}: ${
          output.stderr
        }`
      )
    );
  }

  unsetLocalGit();
}
