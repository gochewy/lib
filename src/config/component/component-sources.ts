import { IS_CHEWY_CONTRIBUTOR } from '../global/constants';

interface ChewyComponents {
  hasura: string;
  nextjs: string;
  nestjs: string;
  'ory-kratos': string;
  'ory-oathkeeper': string;
}

const componentSources: ChewyComponents = IS_CHEWY_CONTRIBUTOR
  ? {
      hasura: '/workspace/chewy-global/components/hasura',
      nextjs: '/workspace/chewy-global/components/nextjs',
      nestjs: '/workspace/chewy-global/components/nestjs',
      'ory-kratos': '/workspace/chewy-global/components/ory-kratos',
      'ory-oathkeeper': '/workspace/chewy-global/components/ory-oathkeeper',
    }
  : {
      hasura: 'https://github.com/gochewy/hasura.git',
      nextjs: 'https://github.com/gochewy/nextjs.git',
      nestjs: 'https://github.com/gochewy/nestjs.git',
      'ory-kratos': '/workspace/chewy-global/components/ory-kratos',
      'ory-oathkeeper': '/workspace/chewy-global/components/ory-oathkeeper',
    };

export default componentSources;
