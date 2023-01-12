import { GitProcess } from 'dugite';
import { createFileSync, mkdirSync, writeFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { join, resolve } from 'path';
import { z } from 'zod';
import ComponentDefinition from '../../config/component/component-definition';
import componentLinksSchema from '../../config/component/component-links-schema';
import {
  CHEWY_COMPONENT_CONFIG_DIR_NAME,
  CHEWY_COMPONENT_CONFIG_FILE_NAME,
  CHEWY_COMPONENT_LINKS_FILE_NAME,
} from '../../constants';
import getProjectRootDir from '../../files/get-project-root-dir/get-project-root-dir';
import { setLocalGit, unsetLocalGit } from '../../state/local-git/local-git';
import { resourceNameSchema } from '../../utils';
import fetchComponentDefinition from '../fetch-component-definition/fetch-component-definition';
import fetchComponentVersions from '../fetch-component-versions/fetch-component-versions';
import linkComponents from '../link-components/link-components';

function createEmptyLinksFile(root: string, path: string) {
  const emptyLinks = componentLinksSchema.parse({
    links: [],
  });

  const yaml = jsyaml.dump(emptyLinks);

  writeFileSync(
    resolve(
      root,
      path,
      CHEWY_COMPONENT_CONFIG_DIR_NAME,
      CHEWY_COMPONENT_LINKS_FILE_NAME
    ),
    yaml
  );
}

function createEmptyConfigFile(root: string, path: string) {
  createFileSync(
    resolve(
      root,
      path,
      CHEWY_COMPONENT_CONFIG_DIR_NAME,
      CHEWY_COMPONENT_CONFIG_FILE_NAME
    )
  );
}

function createConfigDir(root: string, path: string) {
  mkdirSync(resolve(root, path, CHEWY_COMPONENT_CONFIG_DIR_NAME), {
    recursive: true,
  });
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
  const root = getProjectRootDir();
  const validUrl = z.string().parse(url);
  const validVersion = await fetchUsableVersion(validUrl, version);
  const definition = await fetchComponentDefinition(url, validVersion.ref);
  let tmpName = name ?? definition.name;
  if (dependent && !name) {
    tmpName = `${dependent.name}-${dependent.role}-${definition.name}`;
  }
  const validName = resourceNameSchema.parse(tmpName);
  const path = join(definition.type, validName);

  await setLocalGit();

  const exec = ['subtree', 'add', '--prefix', path, validUrl, validVersion.sha];
  const output = await GitProcess.exec(exec, root);

  if (output.exitCode !== 0) {
    throw new Error(`Failed to add subtree for ${validName}: ${output.stderr}`);
  }

  unsetLocalGit();

  createConfigDir(root, path);
  createEmptyConfigFile(root, path);
  createEmptyLinksFile(root, path);

  const dependencyDefinitions: InstallComponentOutput[] = [];

  if (autoInstallDependencies) {
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
