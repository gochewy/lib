import { componentSources } from '../../config/component';
import { CHEWY_VERSION } from '../../constants';
import fetchComponentDefinition from './fetch-component-definition';

describe('fetchComponentDefinition', () => {
  it('fetches the component definition', async () => {
    const definition = await fetchComponentDefinition(
      componentSources['ory-kratos'],
      CHEWY_VERSION
    );
    expect(definition.name).toEqual('ory-kratos');
  });

  it('throws an appropriate error for bad versions', async () => {
    const version = 'bad-version';
    const source = componentSources['ory-kratos'];
    try {
      await fetchComponentDefinition(source, version);
    } catch (e) {
      expect((e as { message: string }).message).toEqual(
        'No version found for component while fetching definition.'
      );
    }
  });
});
