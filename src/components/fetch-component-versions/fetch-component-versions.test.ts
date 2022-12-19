import { componentSources } from '../../config/component';
import fetchComponentVersions from './fetch-component-versions';

describe('fetchComponentVersions', () => {
  it('should fetch component versions', async () => {
    const versions = await fetchComponentVersions(componentSources.hasura);
    const refs = versions.map(({ ref }) => ref);
    expect(refs).toContain('v0.1.1-beta.22-12-19-10-35');
  });
});
