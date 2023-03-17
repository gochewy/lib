import componentSources from './component-sources';

type ComponentNames = keyof typeof componentSources;

const requiredComponents: ComponentNames[] = [
  'docker-development-host',
  'ory-kratos',
  'nextjs',
  'ory-oathkeeper',
  'hasura',
  'nestjs',
];

export default requiredComponents;
