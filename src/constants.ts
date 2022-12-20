import { homedir } from 'os';

/***********************************************
 * Chewy meta config.
 ***********************************************/

/**
 * The current version of Chewy.
 */
export const CHEWY_VERSION = '0.1.1-branch';

/***********************************************
 * Environment config.
 ***********************************************/

/**
 * Whether the current process is running in a Chewy contributor's environment.
 */
export const IS_CHEWY_CONTRIBUTOR = process.env.IS_CHEWY_CONTRIBUTOR === 'true';

/**
 * Whether the current process is running in a dev environment.
 */
export const IS_CHEWY_DEV_MODE = process.env.IS_CHEWY_DEV_MODE === 'true';

/***********************************************
 * Directories for different parts of Chewy.
 ***********************************************/

/**
 * The directory where the project config file is stored within the project.
 */
export const CHEWY_PROJECT_CONFIG_DIR_NAME =
  process.env.CHEWY_PROJECT_CONFIG_DIR_NAME || '.chewy';

/**
 * The directory where the component config files are stored within the component.
 */
export const CHEWY_COMPONENT_CONFIG_DIR_NAME =
  process.env.CHEWY_PROJECT_CONFIG_DIR_NAME || '.chewy';

/**
 * The directory where infrastructure components are stored within the project.
 */
export const CHEWY_INFRA_DIR_NAME = process.env.CHEWY_INFRA_DIR_NAME || 'infra';

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
  process.env.CHEWY_GLOBAL_CONFIG_DIR_PATH || `${homedir()}/.chewy`;

/**
 * The absolutely path to the directory where the global config file is stored (in the user's home directory).
 */
export const CHEWY_GLOBAL_TMP_COMPONENT_DIR_NAME =
  process.env.CHEWY_GLOBAL_TMP_COMPONENT_DIR_NAME || `component-tmp`;

/**
 * The directory where environment definitions are stored.
 */
export const CHEWY_ENVIRONMENT_DEFINITION_DIR_NAME =
  process.env.CHEWY_ENVIRONMENT_DEFINITION_DIR_NAME || 'environments';

/**
 * Component CLI plugin directory.
 */
export const CHEWY_COMPONENT_CLI_PLUGIN_DIR_NAME =
  process.env.CHEWY_COMPONENT_CLI_PLUGIN_DIR_NAME || 'cli-plugin';

/***********************************************
 * Files for diferent parts of Chewy.
 ***********************************************/

/**
 * The name of the file where the project config is stored.
 */
export const CHEWY_PROJECT_CONFIG_FILE_NAME =
  process.env.CHEWY_PROJECT_CONFIG_FILE_NAME || 'chewy-project.yml';

/**
 * The name of the file where the component definition is stored.
 */
export const CHEWY_COMPONENT_DEFINITION_FILE_NAME =
  process.env.CHEWY_COMPONENT_DEFINITION_FILE_NAME || 'chewy-component.yml';
