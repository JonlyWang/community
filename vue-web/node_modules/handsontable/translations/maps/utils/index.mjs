import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import { getDecreasedIndexes, getIncreasedIndexes } from "./actionsOnIndexes.mjs";
import { getListWithInsertedItems as sequenceStrategyInsert, getListWithRemovedItems as sequenceStrategyRemove } from "./indexesSequence.mjs";
import { getListWithInsertedItems as physicalStrategyInsert, getListWithRemovedItems as physicalStrategyRemove } from "./physicallyIndexed.mjs";
var alterStrategies = new Map([['indexesSequence', {
  getListWithInsertedItems: sequenceStrategyInsert,
  getListWithRemovedItems: sequenceStrategyRemove
}], ['physicallyIndexed', {
  getListWithInsertedItems: physicalStrategyInsert,
  getListWithRemovedItems: physicalStrategyRemove
}]]);
var alterUtilsFactory = function alterUtilsFactory(indexationStrategy) {
  if (alterStrategies.has(indexationStrategy) === false) {
    throw new Error("Alter strategy with ID '".concat(indexationStrategy, "' does not exist."));
  }
  return alterStrategies.get(indexationStrategy);
};
export { getDecreasedIndexes, getIncreasedIndexes, alterUtilsFactory };