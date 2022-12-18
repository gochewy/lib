import environmentDefinitionSchema from './environment-definition-schema';

type EnvironmentDefinition = z.TypeOf<typeof environmentDefinitionSchema>;

export default EnvironmentDefinition;
