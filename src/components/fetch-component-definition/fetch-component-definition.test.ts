import { componentSources } from '../../config/component';
import { CHEWY_VERSION } from '../../constants';
import fetchComponentDefinition from './fetch-component-definition';

describe('fetchComponentDefinition', () => {
  it('fetches the component definition', async () => {
    const definition = await fetchComponentDefinition(
      componentSources['ory-kratos'],
      CHEWY_VERSION,
      'branch'
    );
    expect(definition.name).toEqual('ory-kratos');
  });

  it('throws an appropriate error for bad versions', async () => {
    const version = 'bad-version';
    const source = componentSources['ory-kratos'];
    try {
      await fetchComponentDefinition(source, version, 'tag');
    } catch (e) {
      expect((e as any).message).toEqual(
        `No match found for version ${version} of component ${source}`
      );
    }
  });
});
