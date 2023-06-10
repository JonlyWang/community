"use strict";

exports.__esModule = true;
exports.getDecreasedIndexes = getDecreasedIndexes;
exports.getIncreasedIndexes = getIncreasedIndexes;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
var _array = require("../../../helpers/array");
/**
 * Transform mappings after removal.
 *
 * @private
 * @param {Array} indexedValues List of values for particular indexes.
 * @param {Array} removedIndexes List of removed indexes.
 * @returns {Array} List with decreased indexes.
 */
function getDecreasedIndexes(indexedValues, removedIndexes) {
  return (0, _array.arrayMap)(indexedValues, function (index) {
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
function getIncreasedIndexes(indexedValues, insertedIndexes) {
  var firstInsertedIndex = insertedIndexes[0];
  var amountOfIndexes = insertedIndexes.length;
  return (0, _array.arrayMap)(indexedValues, function (index) {
    if (index >= firstInsertedIndex) {
      return index + amountOfIndexes;
    }
    return index;
  });
}