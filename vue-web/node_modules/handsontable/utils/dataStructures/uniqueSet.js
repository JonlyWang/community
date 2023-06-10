"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.createUniqueSet = createUniqueSet;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _function = require("../../helpers/function");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var DEFAULT_ERROR_ITEM_EXISTS = function DEFAULT_ERROR_ITEM_EXISTS(item) {
  return "'".concat(item, "' value is already declared in a unique set.");
};

/**
 * @typedef {object} UniqueSet
 * @property {Function} addItem Adds items to the priority set.
 * @property {Function} getItems Gets items from the set in order of addition.
 */
/**
 * Creates a new unique set.
 *
 * @param {object} config The config for priority set.
 * @param {Function} config.errorItemExists The function to generate custom error message if item is already in the set.
 * @returns {UniqueSet}
 */
function createUniqueSet() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    errorItemExists = _ref.errorItemExists;
  var uniqueSet = new Set();
  errorItemExists = (0, _function.isFunction)(errorItemExists) ? errorItemExists : DEFAULT_ERROR_ITEM_EXISTS;

  /**
   * Adds items to the unique set. Throws an error if `item` is already added.
   *
   * @param {*} item The adding item.
   */
  function addItem(item) {
    if (uniqueSet.has(item)) {
      throw new Error(errorItemExists(item));
    }
    uniqueSet.add(item);
  }

  /**
   * Gets items from the set in order of addition.
   *
   * @returns {*}
   */
  function getItems() {
    return _toConsumableArray(uniqueSet);
  }

  /**
   * Clears the unique set.
   */
  function clear() {
    uniqueSet.clear();
  }
  return {
    addItem: addItem,
    clear: clear,
    getItems: getItems
  };
}