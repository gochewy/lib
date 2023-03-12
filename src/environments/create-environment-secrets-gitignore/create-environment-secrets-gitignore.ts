import { outputFileSync } from 'fs-extra';
import getProjectEnvironmentSecretsDir from '../../files/get-project-environment-secrets-dir/get-project-environment-secrets-dir';

/**
 * Creates a .gitignore file in the project's environment secrets directory.
 * This is to prevent the secrets from being accidentally committed to source control.
 * Initially the plan was to keep these completely outside of the project directory,
 * but GitPod doesn't persist files outside of the workspace directory, which makes
 * this impractical, since we're encouraging the use of GitPod.
 */
export default function createEnvironmentSecretsGitignore() {
  const environmentSecretsDir = getProjectEnvironmentSecretsDir();
  const gitignorePath = `${environmentSecretsDir}/.gitignore`;
  const gitignoreContent = `*`;
  outputFileSync(gitignorePath, gitignoreContent);
}
