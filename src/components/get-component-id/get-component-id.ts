import { getComponentDir } from '../../files';
import getInstalledComponentDefinition from '../get-installed-component-definition/get-installed-component-definition';

export default function getComponentId(
  ...params: Parameters<typeof getComponentDir>
) {
  const definition = getInstalledComponentDefinition(...params);
  return `${definition.type}-${definition.name}`;
}
