import { GitProcess } from 'dugite';
import { createFileSync, mkdirSync, writeFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import { join, resolve } from 'path';
import { z } from 'zod';
import { ComponentDefinition } from '../../config/component';
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
  const refType = version.includes('branch') ? 'branch' : 'tag';
  const versions = await fetchComponentVersions(url, refType);
  console.log(url);
  console.log(version);
  const validVersion = versions.find(({ ref }) => ref === version);

  if (!validVersion) throw new Error('No version found for component.');

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
  const definition = await fetchComponentDefinition(
    url,
    validVersion.sha,
    'commit'
  );
  let tmpName = name ?? definition.name;
  if (dependent && !name) {
    tmpName = `${dependent.name}-${dependent.role}-${definition.name}`;
  }
  const validName = resourceNameSchema.parse(tmpName);
  const path = join(definition.type, validName);

  await setLocalGit();
  await GitProcess.exec(
    ['subtree', 'add', '--prefix', path, validUrl, validVersion.sha],
    root
  );
  unsetLocalGit();

  createConfigDir(root, path);
  createEmptyConfigFile(root, path);
  createEmptyLinksFile(root, path);

  const dependencyDefinitions: InstallComponentOutput[] = [];

  if (autoInstallDependencies) {
    for (let dependency of definition.dependencies || []) {
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
    }
  }

  return {
    definition,
    dependencyDefinitions,
  };
}
