/**
 * Environment config.
 */
export const IS_CHEWY_CONTRIBUTOR = process.env.IS_CHEWY_CONTRIBUTOR === "true";
export const IS_CHEWY_DEV_MODE = process.env.IS_CHEWY_DEV_MODE === "true";

/**
 * Directories for different parts of Chewy.
 */
export const CHEWY_PROJECT_CONFIG_DIR_NAME = process.env.CHEWY_PROJECT_CONFIG_DIR_NAME || '.chewy';
export const CHEWY_COMPONENT_CONFIG_DIR_NAME = process.env.CHEWY_PROJECT_CONFIG_DIR_NAME || '.chewy';
export const CHEWY_INFRA_DIR_NAME = process.env.CHEWY_INFRA_DIR_NAME || 'infra';
export const CHEWY_SERVICE_DIR_NAME = process.env.CHEWY_SERVICE_DIR_NAME || 'service';
export const CHEWY_SOURCE_DIR_NAME = process.env.CHEWY_SOURCE_DIR_NAME || 'source';
export const CHEWY_GLOBAL_CONFIG_DIR_NAME = process.env.CHEWY_GLOBAL_CONFIG_DIR_NAME || '~/.chewy';
export const CHEWY_ENVIRONMENT_DEFINITION_DIR_NAME = process.env.CHEWY_ENVIRONMENT_DEFINITION_DIR_NAME || 'environments';

/**
 * Files for diferent parts of Chewy.
 */
export const CHEWY_COMPONENT_DEFINITION_FILE_NAME = process.env.CHEWY_COMPONENT_DEFINITION_FILE_NAME || 'chewy-component.yml';

