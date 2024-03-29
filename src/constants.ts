import { homedir } from 'os';
import path from 'path';

/***********************************************
 * Chewy meta config.
 ***********************************************/

/**
 * The current version of Chewy.
 */
export const CHEWY_VERSION = 'main';

/***********************************************
 * Environment config.
 ***********************************************/

/**
 * Whether the current process is running in a Chewy contributor's environment.
 */
export const IS_CHEWY_CONTRIBUTOR = process.env.IS_CHEWY_CONTRIBUTOR === 'true';

/**
 * Whether the current process is running in a CI environment.
 */
export const IS_CI = process.env.CI === 'true';

/**
 * Whether the current process is running in a test environment.
 */
export const IS_TESTING = process.env.NODE_ENV === 'test';

/**
 * Whether the current process is running in a dev environment.
 */
export const IS_CHEWY_DEV_MODE = process.env.IS_CHEWY_DEV_MODE === 'true';

export const CHEWY_DEV_ENV_NAME = process.env.CHEWY_DEV_ENV_NAME || 'dev';

export const CHEWY_ID_SEPARATOR = process.env.CHEWY_ID_SEPARATOR || '--';

/***********************************************
 * Directories for different parts of Chewy.
 ***********************************************/

/**
 * Chewy base test directory.
 */
export const CHEWY_BASE_TEST_DIR =
  process.env.CHEWY_BASE_TEST_DIR ||
  (IS_CI && process.env.RUNNER_TEMP
    ? // ? path.resolve('testing', 'tests')
      path.resolve(process.env.RUNNER_TEMP, 'chewy-tests', 'tests')
    : path.resolve('/tmp', 'chewy-tests', 'tests'));

/**
 * The directory where the project config file is stored within the project.
 */
export const CHEWY_PROJECT_CONFIG_DIR_NAME =
  process.env.CHEWY_PROJECT_CONFIG_DIR_NAME || '.chewy';

/**
 * The directory where the component definition files are stored within the component.
 */
export const CHEWY_COMPONENT_DEFINITION_DIR_NAME =
  process.env.CHEWY_COMPONENT_DEFINITION_DIR_NAME || '.chewy';

/**
 * The directory where the component config files are stored within the component.
 */
export const CHEWY_COMPONENT_CONFIG_DIR_NAME =
  process.env.CHEWY_COMPONENT_CONFIG_DIR_NAME || '.chewy-config';

/**
 * The directory where infrastructure components are stored within the project.
 */
export const CHEWY_INFRA_DIR_NAME =
  process.env.CHEWY_INFRA_DIR_NAME || 'infrastructure';

/**
 * The directory where service components are stored within the project.
 */
export const CHEWY_SERVICE_DIR_NAME =
  process.env.CHEWY_SERVICE_DIR_NAME || 'service';

/**
 * The directory where source components are stored within the project.
 */
export const CHEWY_SOURCE_DIR_NAME =
  process.env.CHEWY_SOURCE_DIR_NAME || 'source';

/**
 * The absolutely path to the directory where the global config file is stored (in the user's home directory).
 */
export const CHEWY_GLOBAL_CONFIG_DIR_PATH =
  process.env.CHEWY_GLOBAL_CONFIG_DIR_PATH || path.resolve(homedir(), '.chewy');

/**
 * The absolutely path to the directory where the global config file is stored (in the user's home directory).
 */
export const CHEWY_GLOBAL_COMPONENT_CACHE_DIR_NAME =
  process.env.CHEWY_GLOBAL_COMPONENT_CACHE_DIR_NAME || `component-cache`;

/**
 * The name of the directory where environment secrets are stored for the current user.
 */
export const CHEWY_PROJECT_ENVIRONMENT_SECRETS_DIR_NAME =
  process.env.CHEWY_PROJECT_ENVIRONMENT_SECRETS_DIR_NAME ||
  'environment-secrets';

/**
 * The name of the directory where development volumes are stored for the current project.
 */
export const CHEWY_DEV_VOLUMES_DIR_NAME =
  process.env.CHEWY_DEV_VOLUMES_DIR_NAME || 'dev-volumes';

/**
 * Component CLI plugin directory.
 */
export const CHEWY_COMPONENT_CLI_PLUGIN_DIR_NAME =
  process.env.CHEWY_COMPONENT_CLI_PLUGIN_DIR_NAME || 'cli-plugin';

export const CHEWY_COMPONENT_COMMANDS_DIRECTORY =
  process.env.CHEWY_COMPONENT_COMMANDS_DIRECTORY || 'commands';

export const CHEWY_COMPONENT_DEPLOYMENT_DIRECTORY =
  process.env.CHEWY_COMPONENT_DEPLOYMENT_DIRECTORY || 'deployment';

export const CHEWY_COMPONENT_DIRECTORY_NAMES = [
  CHEWY_INFRA_DIR_NAME,
  CHEWY_SERVICE_DIR_NAME,
  CHEWY_SOURCE_DIR_NAME,
];

/***********************************************
 * Files for diferent parts of Chewy.
 ***********************************************/

/**
 * The name of the file where the project config is stored.
 */
export const CHEWY_PROJECT_CONFIG_FILE_NAME =
  process.env.CHEWY_PROJECT_CONFIG_FILE_NAME || 'chewy-project.yml';

export const CHEWY_ENVIRONMENT_FILE_EXTENSION =
  process.env.CHEWY_ENVIRONMENT_FILE_EXTENSION || 'chewy-env.yml';

/**
 * The name of the file where the component definition is stored.
 */
export const CHEWY_COMPONENT_DEFINITION_FILE_NAME =
  process.env.CHEWY_COMPONENT_DEFINITION_FILE_NAME || 'chewy-component.yml';

/**
 * The name of the file where the component config is stored.
 */
export const CHEWY_COMPONENT_CONFIG_FILE_NAME =
  process.env.CHEWY_COMPONENT_CONFIG_FILE_NAME || 'chewy-config.yml';

/**
 * The name of the file where the component links are stored. (links between components)
 */
export const CHEWY_COMPONENT_LINKS_FILE_NAME =
  process.env.CHEWY_COMPONENT_LINKS_FILE_NAME || 'chewy-links.yml';
