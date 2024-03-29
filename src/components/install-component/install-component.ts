import { red } from 'colorette';
import { GitProcess } from 'dugite';
import { createFileSync, mkdirSync, writeFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { join, resolve } from 'path';
import { z } from 'zod';
import ComponentDefinition from '../../config/component/component-definition';
import componentLinksSchema from '../../config/component/component-links-schema';
import { ChewyComponentNames } from '../../config/component/component-sources';
import {
  CHEWY_COMPONENT_CONFIG_DIR_NAME,
  CHEWY_COMPONENT_CONFIG_FILE_NAME,
  CHEWY_COMPONENT_LINKS_FILE_NAME,
  CHEWY_DEV_ENV_NAME,
} from '../../constants';
import getProjectRootDir from '../../files/get-project-root-dir/get-project-root-dir';
import { setLocalGit, unsetLocalGit } from '../../state/local-git/local-git';
import { resourceNameSchema } from '../../utils';
import log from '../../utils/log/log';
import fetchComponentDefinition from '../fetch-component-definition/fetch-component-definition';
import fetchUsableVersion from '../fetch-usable-version/fetch-usable-version';
import linkComponents from '../link-components/link-components';

interface InstallComponentOptions {
  name?: string;
  url: string;
  version: string;
  autoInstallDependencies?: boolean;
  dependent?: {
    name: string;
    role: string;
    definition: ComponentDefinition;
  };
}

interface InstallComponentOutput {
  name: string;
  definition: ComponentDefinition;
  dependencyDefinitions: InstallComponentOutput[];
}

/**
 * Installs a component into the project by adding it as a subtree
 * and creating the necessary starting config files.
 */
export default async function installComponent({
  name,
  url,
  version,
  autoInstallDependencies = true,
  dependent,
}: InstallComponentOptions): Promise<InstallComponentOutput> {
  const projectRoot = getProjectRootDir();
  const validUrl = z.string().parse(url);
  const validVersion = await fetchUsableVersion(validUrl, version);
  const definition = await fetchComponentDefinition(url, validVersion.ref);
  let tmpName = name ?? definition.name;
  if (dependent && !name) {
    tmpName = `${dependent.name}-${dependent.role}-${definition.name}`;
  }
  const validName = resourceNameSchema.parse(tmpName);
  const componentPath = join(definition.type, validName);

  await setLocalGit();

  const exec = [
    'subtree',
    'add',
    '--prefix',
    componentPath,
    validUrl,
    validVersion.sha,
  ];
  const output = await GitProcess.exec(exec, projectRoot);

  if (output.exitCode !== 0) {
    throw new Error(
      red(`Failed to add subtree for ${validName}: ${output.stderr}`)
    );
  }

  unsetLocalGit();

  setupConfiguration(validName, projectRoot, componentPath);

  const dependencyDefinitions: InstallComponentOutput[] = [];

  if (autoInstallDependencies && definition.dependencies?.length) {
    log('Installing dependencies', {
      level: 'info',
      source: validName,
      subtle: true,
    });
    for (const dependency of definition.dependencies || []) {
      const depInstallOutput = await installComponent({
        url: dependency.repository,
        version: dependency.version,
        dependent: {
          name: validName,
          role: dependency.role,
          definition,
        },
      });
      dependencyDefinitions.push(depInstallOutput);

      linkComponents({ name: depInstallOutput.name }, dependency.role, {
        name: validName,
      });
    }
  }

  const dockerDevHost: ChewyComponentNames = 'docker-development-host';

  if (definition.type !== 'infrastructure') {
    linkComponents(
      { name: dockerDevHost, type: 'infrastructure' },
      'development-host',
      {
        name: validName,
      },
      // Essentially the following is saying for all application components,
      // "if you're in the dev environment, you run on the docker dev host"
      [CHEWY_DEV_ENV_NAME],
      CHEWY_DEV_ENV_NAME
    );
  }

  return {
    name: validName,
    definition,
    dependencyDefinitions,
  };
}

/**
 * Creates an empty links file for a component.
 * Links define the components that fulfill the dependencies of a component.
 *
 * @param projectRoot Project root
 * @param componentPath Relative path to component
 */
function createEmptyLinksFile(projectRoot: string, componentPath: string) {
  const emptyLinks = componentLinksSchema.parse({
    links: [],
  });

  const yaml = jsyaml.dump(emptyLinks);

  writeFileSync(
    resolve(
      projectRoot,
      componentPath,
      CHEWY_COMPONENT_CONFIG_DIR_NAME,
      CHEWY_COMPONENT_LINKS_FILE_NAME
    ),
    yaml
  );
}

/**
 * Creates an empty config file for a component.
 */
function createEmptyConfigFile(projectRoot: string, componentPath: string) {
  createFileSync(
    resolve(
      projectRoot,
      componentPath,
      CHEWY_COMPONENT_CONFIG_DIR_NAME,
      CHEWY_COMPONENT_CONFIG_FILE_NAME
    )
  );
}

/**
 * Creates the configuration directory for the component. This is where all files that
 * determine how a component runs are stored.
 *
 * @param projectRoot The project root
 * @param componentPath The relative path to the component
 */
function createConfigDir(projectRoot: string, componentPath: string) {
  mkdirSync(
    resolve(projectRoot, componentPath, CHEWY_COMPONENT_CONFIG_DIR_NAME),
    {
      recursive: true,
    }
  );
}

/**
 * Each component requires a configuration file, a links file, and a directory to hold them.
 *
 * @param validName The name of the component
 * @param projectRoot The project root
 * @param componentPath The relative path to the component
 */
function setupConfiguration(
  validName: string,
  projectRoot: string,
  componentPath: string
) {
  log('Setting up configuration files...', {
    level: 'info',
    source: validName,
    subtle: true,
  });
  createConfigDir(projectRoot, componentPath);
  createEmptyConfigFile(projectRoot, componentPath);
  createEmptyLinksFile(projectRoot, componentPath);
}
