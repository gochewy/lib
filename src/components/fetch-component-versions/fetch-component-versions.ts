import { GitProcess } from 'dugite';
import { homedir } from 'os';

export default async function fetchComponentVersions(
  url: string,
  refType: 'branch' | 'tag' = 'tag'
) {
  const lsFilter = refType === 'branch' ? '--heads' : '--tags';
  const response = await GitProcess.exec(
    ['ls-remote', lsFilter, url],
    homedir()
  );
  const { stdout, exitCode } = response;

  if (exitCode !== 0) {
    throw new Error('Failed to fetch component versions');
  }

  const versions = stdout
    .split('\n') // split on newlines
    .filter(line => line !== '') // there is always a trailing newline
    .map(line => line.split('\t')) // get the version (tab separated, and strip the refs/heads/ or refs/tags/)
    .map(([sha, ref]) => ({
      sha,
      ref: ref.split('/')[2],
    }));

  return versions;
}
