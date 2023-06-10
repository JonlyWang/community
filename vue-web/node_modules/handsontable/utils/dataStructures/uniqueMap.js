"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.createUniqueMap = createUniqueMap;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.find.js");
var _function = require("../../helpers/function");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var DEFAULT_ERROR_ID_EXISTS = function DEFAULT_ERROR_ID_EXISTS(id) {
  return "The id '".concat(id, "' is already declared in a map.");
};

/**
 * @typedef {object} UniqueMap
 * @property {Function} addItem Adds a new item to the unique map.
 * @property {Function} clear Clears the map.
 * @property {Function} getId Returns ID for the passed item.
 * @property {Function} getItem Gets item from the passed ID.
 * @property {Function} getItems Gets all items from the map.
 * @property {Function} hasItem Verifies if the passed ID exists in a map.
 * @property {Function} removeItem Removes item from the passed id if exists.
 */
/**
 * Creates a new unique map.
 *
 * @param {object} config The config for priority queue.
 * @param {Function} config.errorIdExists The function to generate custom message if ID is already taken.
 * @returns {UniqueMap}
 */
function createUniqueMap() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    errorIdExists = _ref.errorIdExists;
  var uniqueMap = new Map();
  errorIdExists = (0, _function.isFunction)(errorIdExists) ? errorIdExists : DEFAULT_ERROR_ID_EXISTS;

  /**
   * Adds a new item to the unique map. Throws error if `id` is already added.
   *
   * @param {*} id The ID of the adding item.
   * @param {*} item The adding item.
   */
  function addItem(id, item) {
    if (hasItem(id)) {
      throw new Error(errorIdExists(id));
    }
    uniqueMap.set(id, item);
  }

  /**
   * Removes item from the passed id if exists.
   *
   * @param {*} id The ID to remove.
   * @returns {boolean}
   */
  function removeItem(id) {
    return uniqueMap.delete(id);
  }

  /**
   * Clears the map.
   */
  function clear() {
    uniqueMap.clear();
  }

  /**
   * Returns ID for the passed item.
   *
   * @param {*} item The item of the getting ID.
   * @returns {*}
   */
  function getId(item) {
    var _ref2 = getItems().find(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          id = _ref5[0],
          element = _ref5[1];
        if (item === element) {
          return id;
        }
        return false;
      }) || [null],
      _ref3 = _slicedToArray(_ref2, 1),
      itemId = _ref3[0];
    return itemId;
  }

  /**
   * Returns item from the passed ID.
   *
   * @param {*} id The ID of the getting item.
   * @returns {*}
   */
  function getItem(id) {
    return uniqueMap.get(id);
  }

  /**
   * Gets all items from the map.
   *
   * @returns {Array}
   */
  function getItems() {
    return _toConsumableArray(uniqueMap);
  }

  /**
   * Verifies if the passed ID exists in a map.
   *
   * @param {*} id The ID to check if registered.
   * @returns {boolean}
   */
  function hasItem(id) {
    return uniqueMap.has(id);
  }
  return {
    addItem: addItem,
    clear: clear,
    getId: getId,
    getItem: getItem,
    getItems: getItems,
    hasItem: hasItem,
    removeItem: removeItem
  };
}