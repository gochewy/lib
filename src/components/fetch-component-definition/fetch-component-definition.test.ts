import { componentSources } from '../../config/component';
import { CHEWY_VERSION } from '../../constants';
import fetchComponentDefinition from './fetch-component-definition';

describe('fetchComponentDefinition', () => {
  it('fetches the component definition', async () => {
    const definition = await fetchComponentDefinition(
      componentSources.hasura,
      CHEWY_VERSION,
      'branch'
    );
    expect(definition.name).toEqual('hasura');
  });

  it('throws an appropriate error for bad versions', async () => {
    try {
      await fetchComponentDefinition(
        componentSources.hasura,
        'bad-version',
        'tag'
      );
    } catch (e) {
      expect((e as any).message).toEqual(
        'No matching version found for component. (branch/tag/commit)'
      );
    }
  });
});
