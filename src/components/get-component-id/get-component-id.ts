import { getComponentDir } from '../../files';
import getComponentName from '../get-component-name/get-component-name';
import getInstalledComponentDefinition from '../get-installed-component-definition/get-installed-component-definition';

export default function getComponentId(
  ...params: Parameters<typeof getComponentDir>
) {
  const definition = getInstalledComponentDefinition(...params);
  const componentName = getComponentName(...params);
  if (!componentName) throw Error('Could not get component name.');
  return `${definition.type}-${componentName}`;
}
