import { existsSync, readFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import componentLinksSchema from '../../config/component/component-links-schema';
import getComponentLinksFile from '../../files/get-component-links-file/get-component-links-file';

export default function getComponentLinks(
  ...opts: Parameters<typeof getComponentLinksFile>
) {
  const componentLinksFile = getComponentLinksFile(...opts);
  const fileExists = existsSync(componentLinksFile);
  console.log(`✅ File exists? ${componentLinksFile}`, fileExists);
  const fileContents = readFileSync(componentLinksFile, 'utf8');
  console.log('📄 File contents:', fileContents);
  const componentLinks = jsyaml.load(fileContents);
  console.log(`@@ Component links for ${opts[0]?.name || ''}`, componentLinks);
  const validLinks = componentLinksSchema.parse(componentLinks);
  return validLinks || [];
}
