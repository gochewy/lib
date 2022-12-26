import componentSources from './component-sources';

type ComponentNames = keyof typeof componentSources;

const requiredComponents: ComponentNames[] = [
  'ory-kratos',
  'nextjs',
  'ory-oathkeeper',
  'hasura',
  'nestjs',
];

export default requiredComponents;
