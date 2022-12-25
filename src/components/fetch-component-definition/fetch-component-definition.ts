import { GitProcess } from 'dugite';
import { existsSync, mkdirSync, readFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { join, resolve } from 'path';
import { z } from 'zod';
import { componentDefinitionSchema } from '../../config/component';
import {
  CHEWY_COMPONENT_DEFINITION_DIR_NAME,
  CHEWY_COMPONENT_DEFINITION_FILE_NAME,
  CHEWY_GLOBAL_COMPONENT_CACHE_DIR_NAME,
  CHEWY_GLOBAL_CONFIG_DIR_PATH,
} from '../../constants';
import fetchComponentVersions from '../fetch-component-versions/fetch-component-versions';

const urlToDirectoryName = (url: string) => {
  let name: string = url;
  if (name.includes('chewy-global/components')) {
    name = name.split('chewy-global/components').pop() || '';
  }
  name = name.split('://').pop() || '';
  name = name.split('@').pop() || '';
  name = name.replace(/[^a-zA-Z0-9]/g, '-');
  name = name.replace(/-+/g, '-');
  name = name.replace(/-$/, '');
  name = name.replace(/^-/, '');
  return name;
};

/**
 * Fetches the component definition from a component repository by cloning it to a
 * temporary directory and reading the definition file.
 *
 * @param url The url of the component repository
 * @param version The version of the component to fetch
 * @param refType The type of ref (branch, tag, commit)
 * @returns The component definition
 */
export default async function fetchComponentDefinition(
  url: string,
  version: string
) {
  const componentDirectoryName = urlToDirectoryName(url);
  const validUrl = z.string().parse(url);

  const validVersion = (await fetchComponentVersions(url)).find(
    ({ ref }) => ref === version
  );

  if (!validVersion) throw new Error('No version found for component.');

  const globalComponentsDir = resolve(
    CHEWY_GLOBAL_CONFIG_DIR_PATH,
    CHEWY_GLOBAL_COMPONENT_CACHE_DIR_NAME
  );

  mkdirSync(globalComponentsDir, { recursive: true });

  const tmpComponentDir = resolve(globalComponentsDir, componentDirectoryName);

  if (!existsSync(tmpComponentDir)) {
    await GitProcess.exec(
      ['clone', '--no-checkout', validUrl, componentDirectoryName],
      globalComponentsDir
    );
    await GitProcess.exec(['reset'], tmpComponentDir);
    await GitProcess.exec(['fetch'], tmpComponentDir);
  } else {
    await GitProcess.exec(['fetch'], tmpComponentDir);
    await GitProcess.exec(['reset'], tmpComponentDir);
  }

  const filePath = join(
    CHEWY_COMPONENT_DEFINITION_DIR_NAME,
    CHEWY_COMPONENT_DEFINITION_FILE_NAME
  );

  const checkoutOutput = await GitProcess.exec(
    ['checkout', validVersion.sha, filePath],
    tmpComponentDir
  );

  if (checkoutOutput.exitCode !== 0)
    throw Error(`No match found for version ${version} of component ${url}`);

  const content = readFileSync(
    resolve(
      tmpComponentDir,
      CHEWY_COMPONENT_DEFINITION_DIR_NAME,
      CHEWY_COMPONENT_DEFINITION_FILE_NAME
    )
  );

  const componentDefinition = jsyaml.load(content.toString());

  const parsedComponentDefinition = componentDefinitionSchema.parse(
    componentDefinition
  );

  return parsedComponentDefinition;
}
