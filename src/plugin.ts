import { makeRegistryExtension, CRITERIA_CONFIGURATION } from '@riboseinc/paneron-registry-kit';
import { itemClassConfiguration } from '@/registryConfig';

const defaultClassID = Object.keys(itemClassConfiguration)[0];
const defaultCriteria = CRITERIA_CONFIGURATION['item-class'].toQuery(
  { classID : defaultClassID },
  { itemClasses : itemClassConfiguration },
);

const defaultSearchCriteria = {
  require  : 'all',
  criteria : [{ key : 'item-class', query : defaultCriteria }],
} as const;

export default makeRegistryExtension({
  name                  : 'Written Language Conversion System Registry',
  itemClassConfiguration,
  defaultSearchCriteria : defaultSearchCriteria as any,
  keyExpression         : 'obj.data.identifier || `${obj.data.terms?.[0]?.designation}-${obj.id}` || obj.id',
});
