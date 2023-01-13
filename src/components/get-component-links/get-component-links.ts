import { readFileSync } from 'fs-extra';
import jsyaml from 'js-yaml';
import componentLinksSchema from '../../config/component/component-links-schema';
import getComponentLinksFile from '../../files/get-component-links-file/get-component-links-file';

export default function getComponentLinks(
  ...opts: Parameters<typeof getComponentLinksFile>
) {
  const componentLinksFile = getComponentLinksFile(...opts);
  const fileContents = readFileSync(componentLinksFile, 'utf8');
  const componentLinks = jsyaml.load(fileContents);
  const validLinks = componentLinksSchema.parse(componentLinks);
  return validLinks || [];
}
