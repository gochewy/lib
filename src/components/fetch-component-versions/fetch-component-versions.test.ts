import { componentSources } from '../../config/component';
import fetchComponentVersions from './fetch-component-versions';

describe('fetchComponentVersions', () => {
  it('should fetch component versions', async () => {
    const versions = await fetchComponentVersions(
      componentSources['ory-kratos']
    );
    const refs = versions.map(({ ref }) => ref);
    expect(refs).toContain('0.1.1-branch');
  });
});
