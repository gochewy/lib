import { outputFileSync } from 'fs-extra';
import path from 'path';
import { getDevVolumesDir } from '../../files';

export default function createDevVolumesGitignore() {
  const gitignorePath = path.resolve(getDevVolumesDir(), '.gitignore');
  const gitignoreContent = `*`;
  console.log('@@ volumes gitignore:', gitignorePath);
  outputFileSync(gitignorePath, gitignoreContent);
}
