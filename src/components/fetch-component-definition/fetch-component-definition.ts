import { GitProcess } from 'dugite';
import { mkdirSync, readFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { join, resolve } from 'path';
import { z } from 'zod';
import {
  CHEWY_COMPONENT_DEFINITION_DIR_NAME,
  CHEWY_COMPONENT_DEFINITION_FILE_NAME,
  CHEWY_GLOBAL_CONFIG_DIR_PATH,
  CHEWY_GLOBAL_TMP_COMPONENT_DIR_NAME,
} from '../../constants';
import { createHash } from 'crypto';
import rmfr from 'rmfr';
import { componentDefinitionSchema } from '../../config/component';

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
  version: string,
  refType: 'branch' | 'tag' | 'commit' = 'tag'
) {
  const componentDirectoryName = createHash('shake256', { outputLength: 4 })
    .update(`${url}-${version}`)
    .digest('hex');
  const validUrl = z.string().parse(url);

  const globalComponentsDir = resolve(
    CHEWY_GLOBAL_CONFIG_DIR_PATH,
    CHEWY_GLOBAL_TMP_COMPONENT_DIR_NAME
  );

  mkdirSync(globalComponentsDir, { recursive: true });

  const tmpComponentDir = resolve(globalComponentsDir, componentDirectoryName);

  await GitProcess.exec(
    ['clone', '--no-checkout', validUrl, componentDirectoryName],
    globalComponentsDir
  );

  await GitProcess.exec(['reset'], tmpComponentDir);
  await GitProcess.exec(['fetch'], tmpComponentDir);

  const filePath = join(
    CHEWY_COMPONENT_DEFINITION_DIR_NAME,
    CHEWY_COMPONENT_DEFINITION_FILE_NAME
  );

  let checkoutOutput: Awaited<ReturnType<typeof GitProcess.exec>>;
  if (refType === 'branch') {
    checkoutOutput = await GitProcess.exec(
      ['checkout', `origin/${version}`, filePath],
      tmpComponentDir
    );
  } else {
    checkoutOutput = await GitProcess.exec(
      ['checkout', version, filePath],
      tmpComponentDir
    );
  }
  if (checkoutOutput.exitCode !== 0)
    throw Error('No matching version found for component. (branch/tag/commit)');

  const content = readFileSync(
    resolve(
      tmpComponentDir,
      CHEWY_COMPONENT_DEFINITION_DIR_NAME,
      CHEWY_COMPONENT_DEFINITION_FILE_NAME
    )
  );

  let componentDefinition = jsyaml.load(content.toString());

  const parsedComponentDefinition = componentDefinitionSchema.parse(
    componentDefinition
  );

  return parsedComponentDefinition;
}
