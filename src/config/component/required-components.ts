import componentSources from './component-sources';

type ComponentNames = keyof typeof componentSources;

const requiredComponents: ComponentNames[] = [
  'postgres',
  'hasura',
  'nextjs',
  'nestjs',
  'ory-kratos',
  'ory-oathkeeper',
];

export default requiredComponents;
