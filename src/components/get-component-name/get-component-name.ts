import { getComponentDir } from '../../files';
import { sep } from 'path';

export default function getComponentName(
  ...params: Parameters<typeof getComponentDir>
) {
  return getComponentDir(...params)
    .split(sep)
    .pop();
}
