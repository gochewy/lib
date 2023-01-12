import { GitProcess } from 'dugite';
import { homedir } from 'os';
import semver from 'semver';

export default async function fetchComponentVersions(url: string) {
  const branchResponse = await GitProcess.exec(
    ['ls-remote', '--heads', url],
    homedir()
  );
  if (branchResponse.exitCode !== 0) {
    throw new Error(`Failed to fetch component versions for ${url} branches`);
  }

  const tagResponse = await GitProcess.exec(
    ['ls-remote', '--tags', url],
    homedir()
  );
  if (tagResponse.exitCode !== 0) {
    throw new Error(`Failed to fetch component versions for ${url} tags`);
  }

  const branches = branchResponse.stdout
    .split('\n') // split on newlines
    .filter(line => line !== '') // there is always a trailing newline
    .map(line => line.split('\t')) // get the version (tab separated, and strip the refs/heads/ or refs/tags/)
    .map(([sha, ref]) => ({
      sha,
      ref: ref.split('/')[2],
      type: 'branch',
    }))
    .filter(({ ref }) => semver.valid(ref) || ref === 'main');

  const tags = tagResponse.stdout
    .split('\n') // split on newlines
    .filter(line => line !== '') // there is always a trailing newline
    .map(line => line.split('\t')) // get the version (tab separated, and strip the refs/heads/ or refs/tags/)
    .map(([sha, ref]) => ({
      sha,
      ref: ref.split('/')[2],
      type: 'tag',
    }))
    .filter(({ ref }) => semver.valid(ref));

  return [...branches, ...tags];
}
