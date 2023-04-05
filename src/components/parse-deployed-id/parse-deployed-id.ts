import { CHEWY_ID_SEPARATOR } from '../../constants';

export default function parseDeployedId(deployedComponentId: string) {
  const parts = deployedComponentId.split(CHEWY_ID_SEPARATOR)[0];
  if (parts.length !== 3) throw Error('Invalid deployed component id.');
  return {
    environment: parts[0],
    type: parts[1],
    name: parts[2],
  };
}
