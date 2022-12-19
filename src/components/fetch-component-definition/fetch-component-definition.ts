import { GitProcess } from 'dugite';
import { mkdirSync, readFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { join, resolve } from 'path';
import { z } from 'zod';
import {
  CHEWY_COMPONENT_CONFIG_DIR_NAME,
  CHEWY_COMPONENT_DEFINITION_FILE_NAME,
  CHEWY_GLOBAL_CONFIG_DIR_PATH,
  CHEWY_GLOBAL_TMP_COMPONENT_DIR_NAME,
} from '../../constants';
import { createHash } from 'crypto';
import rmfr from 'rmfr';
import { componentDefinitionSchema } from '../../config/component';

export default async function fetchComponentDefinition(
  url: string,
  version: string,
  refType: 'branch' | 'tag' | 'commit' = 'tag'
) {
  const componentDirectoryName = createHash('shake256', { outputLength: 4 })
    .update(url)
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

  const filePath = join(
    CHEWY_COMPONENT_CONFIG_DIR_NAME,
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
      CHEWY_COMPONENT_CONFIG_DIR_NAME,
      CHEWY_COMPONENT_DEFINITION_FILE_NAME
    )
  );

  let componentDefinition = jsyaml.load(content.toString());

  await rmfr(tmpComponentDir);

  const parsedComponentDefinition = componentDefinitionSchema.parse(
    componentDefinition
  );

  return parsedComponentDefinition;
}
