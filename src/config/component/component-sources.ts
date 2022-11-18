import { IS_CHEWY_CONTRIBUTOR } from "../chewy/constants";

interface ChewyComponents {
    hasura: string;
    nextjs: string;
}

export const components: ChewyComponents = IS_CHEWY_CONTRIBUTOR ? {
    'hasura': '/workspace/chewy-global/components/hasura',
    'nextjs': '/workspace/chewy-global/components/nextjs',
} : {
    'hasura': 'https://github.com/gochewy/hasura.git',
    'nextjs': 'https://github.com/gochewy/nextjs.git',
};
