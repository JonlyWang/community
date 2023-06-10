"use strict";

exports.__esModule = true;
exports.FIRST_BEFORE_SECOND = exports.FIRST_AFTER_SECOND = exports.DO_NOT_SWAP = void 0;
exports.sort = sort;
require("core-js/modules/es.array.sort.js");
var _registry = require("./registry");
var DO_NOT_SWAP = 0;
exports.DO_NOT_SWAP = DO_NOT_SWAP;
var FIRST_BEFORE_SECOND = -1;
exports.FIRST_BEFORE_SECOND = FIRST_BEFORE_SECOND;
var FIRST_AFTER_SECOND = 1;

/**
 * @param {Array} indexesWithData The data to sort.
 * @param {string} rootComparatorId The comparator logic to use.
 * @param {Array} argsForRootComparator Additional arguments for comparator function.
 */
exports.FIRST_AFTER_SECOND = FIRST_AFTER_SECOND;
function sort(indexesWithData, rootComparatorId) {
  var rootComparator = (0, _registry.getRootComparator)(rootComparatorId);
  for (var _len = arguments.length, argsForRootComparator = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    argsForRootComparator[_key - 2] = arguments[_key];
  }
  indexesWithData.sort(rootComparator.apply(void 0, argsForRootComparator));
}