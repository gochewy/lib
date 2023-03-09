import fetchComponentVersions from '../fetch-component-versions/fetch-component-versions';

/**
 * We rely on git sha's to identify the version of a component that we will install. This function
 * takes a version string (e.g. 'v1.0.0') and returns a version object, which includes the git sha that matches
 * that version.
 *
 * @param url The git url of the component
 * @param version The desired version of the component
 * @returns The version object that matches the desired version string
 */
export default async function fetchUsableVersion(url: string, version: string) {
  const versions = await fetchComponentVersions(url);
  const validVersion = versions.find(({ ref }) => ref === version);

  if (!validVersion)
    throw new Error(
      `No version found for component ${url}. Available versions are ${versions
        .map(({ ref }) => ref)
        .join(', ')}.}`
    );

  return validVersion;
}
