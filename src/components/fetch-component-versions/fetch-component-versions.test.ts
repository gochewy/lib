import { componentSources } from '../../config/component';
import { IS_CHEWY_CONTRIBUTOR } from '../../constants';
import fetchComponentVersions from './fetch-component-versions';

describe('fetchComponentVersions', () => {
  it('should fetch component versions', async () => {
    const versions = await fetchComponentVersions(
      componentSources['ory-kratos']
    );
    const refs = versions.map(({ ref }) => ref);
    console.log('@@ refs: ', refs);
    const ref = IS_CHEWY_CONTRIBUTOR ? 'main' : '0.1.1-branch';
    expect(refs).toContain(ref);
  });
});
