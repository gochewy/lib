import childProcess from 'child_process';
import { GitProcess } from 'dugite';
import { createFileSync, existsSync, mkdirSync, writeFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { join, resolve } from 'path';
import { z } from 'zod';
import ComponentDefinition from '../../config/component/component-definition';
import componentLinksSchema from '../../config/component/component-links-schema';
import {
  CHEWY_COMPONENT_COMMANDS_DIRECTORY,
  CHEWY_COMPONENT_CONFIG_DIR_NAME,
  CHEWY_COMPONENT_CONFIG_FILE_NAME,
  CHEWY_COMPONENT_DEFINITION_DIR_NAME,
  CHEWY_COMPONENT_LINKS_FILE_NAME,
} from '../../constants';
import getProjectRootDir from '../../files/get-project-root-dir/get-project-root-dir';
import { setLocalGit, unsetLocalGit } from '../../state/local-git/local-git';
import { resourceNameSchema } from '../../utils';
import fetchComponentDefinition from '../fetch-component-definition/fetch-component-definition';
import fetchComponentVersions from '../fetch-component-versions/fetch-component-versions';
import linkComponents from '../link-components/link-components';
import { promisify } from 'util';
import colorette from 'colorette';

const exec = promisify(childProcess.exec);

async function initializeComponentCommands(
  projectRoot: string,
  componentPath: string
) {
  const cwd = join(
    projectRoot,
    componentPath,
    CHEWY_COMPONENT_DEFINITION_DIR_NAME,
    CHEWY_COMPONENT_COMMANDS_DIRECTORY
  );

  // check if the commands directory exists
  if (!existsSync(cwd)) {
    return;
  }

  try {
    await exec('yarn install', { cwd });
    await exec('yarn build', { cwd });
  } catch (e) {
    console.error(
      'Failed to initialize component commands. ' +
        'You may need to run `yarn install` and `yarn build` manually in the component commands directory for ' +
        componentPath
    );
  }
}

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

function createConfigDir(projectRoot: string, componentPath: string) {
  mkdirSync(
    resolve(projectRoot, componentPath, CHEWY_COMPONENT_CONFIG_DIR_NAME),
    {
      recursive: true,
    }
  );
}

async function fetchUsableVersion(url: string, version: string) {
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
      colorette.red(`Failed to add subtree for ${validName}: ${output.stderr}`)
    );
  }

  unsetLocalGit();

  console.log(
    `${colorette.green(colorette.bold(validName))} ${colorette.gray(
      'Setting up configuration files...'
    )}`
  );
  createConfigDir(projectRoot, componentPath);
  createEmptyConfigFile(projectRoot, componentPath);
  createEmptyLinksFile(projectRoot, componentPath);

  console.log(
    `${colorette.green(colorette.bold(validName))} ${colorette.gray(
      'Installing commands...'
    )}`
  );
  await initializeComponentCommands(projectRoot, componentPath);

  const dependencyDefinitions: InstallComponentOutput[] = [];

  if (autoInstallDependencies && definition.dependencies?.length) {
    console.log(
      `${colorette.green(colorette.bold(validName))} ${colorette.gray(
        'Installing dependencies...'
      )}`
    );
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

  return {
    name: validName,
    definition,
    dependencyDefinitions,
  };
}
