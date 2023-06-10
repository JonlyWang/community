import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
import { arrayMap } from "../../../helpers/array.mjs"; /**
                                                        * Transform mappings after removal.
                                                        *
                                                        * @private
                                                        * @param {Array} indexedValues List of values for particular indexes.
                                                        * @param {Array} removedIndexes List of removed indexes.
                                                        * @returns {Array} List with decreased indexes.
                                                        */
export function getDecreasedIndexes(indexedValues, removedIndexes) {
  return arrayMap(indexedValues, function (index) {
    return index - removedIndexes.filter(function (removedIndex) {
      return removedIndex < index;
    }).length;
  });
}

/**
 * Transform mappings after insertion.
 *
 * @private
 * @param {Array} indexedValues List of values for particular indexes.
 * @param {Array} insertedIndexes List of inserted indexes.
 * @returns {Array} List with increased indexes.
 */
export function getIncreasedIndexes(indexedValues, insertedIndexes) {
  var firstInsertedIndex = insertedIndexes[0];
  var amountOfIndexes = insertedIndexes.length;
  return arrayMap(indexedValues, function (index) {
    if (index >= firstInsertedIndex) {
      return index + amountOfIndexes;
    }
    return index;
  });
}