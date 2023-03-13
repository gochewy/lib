import { sep } from 'path';
import getComponentDir from '../../files/get-component-dir/get-component-dir';

export default function getComponentName(
  ...params: Parameters<typeof getComponentDir>
) {
  return getComponentDir(...params)
    .split(sep)
    .pop();
}
