import { outputFileSync } from 'fs-extra';
import path from 'path';
import { getDevVolumesDir } from '../../files';

export default function createDevVolumesGitignore() {
  const gitignorePath = path.resolve(getDevVolumesDir(), '.gitignore');
  const gitignoreContent = `*`;
  outputFileSync(gitignorePath, gitignoreContent);
}
