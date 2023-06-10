"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.getListWithInsertedItems = getListWithInsertedItems;
exports.getListWithRemovedItems = getListWithRemovedItems;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _function = require("../../../helpers/function");
var _array = require("../../../helpers/array");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Insert new items to the list.
 *
 * @private
 * @param {Array} indexedValues List of values for particular indexes.
 * @param {number} insertionIndex Position inside the actual list.
 * @param {Array} insertedIndexes List of inserted indexes.
 * @param {*} insertedValuesMapping Mapping which may provide value or function returning value for the specific parameters.
 * @returns {Array} List with new mappings.
 */
function getListWithInsertedItems(indexedValues, insertionIndex, insertedIndexes, insertedValuesMapping) {
  var firstInsertedIndex = insertedIndexes.length ? insertedIndexes[0] : void 0;
  return [].concat(_toConsumableArray(indexedValues.slice(0, firstInsertedIndex)), _toConsumableArray(insertedIndexes.map(function (insertedIndex, ordinalNumber) {
    if ((0, _function.isFunction)(insertedValuesMapping)) {
      return insertedValuesMapping(insertedIndex, ordinalNumber);
    }
    return insertedValuesMapping;
  })), _toConsumableArray(firstInsertedIndex === void 0 ? [] : indexedValues.slice(firstInsertedIndex)));
}

/**
 * Filter items from the list.
 *
 * @private
 * @param {Array} indexedValues List of values for particular indexes.
 * @param {Array} removedIndexes List of removed indexes.
 * @returns {Array} Reduced list of mappings.
 */
function getListWithRemovedItems(indexedValues, removedIndexes) {
  return (0, _array.arrayFilter)(indexedValues, function (_, index) {
    return removedIndexes.includes(index) === false;
  });
}