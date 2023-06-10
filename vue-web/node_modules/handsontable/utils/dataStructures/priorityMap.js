"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.DESC = exports.ASC = void 0;
exports.createPriorityMap = createPriorityMap;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
var _number = require("../../helpers/number");
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
var ASC = 'asc';
exports.ASC = ASC;
var DESC = 'desc';
exports.DESC = DESC;
var ORDER_MAP = new Map([[ASC, [-1, 1]], [DESC, [1, -1]]]);
var DEFAULT_ERROR_PRIORITY_EXISTS = function DEFAULT_ERROR_PRIORITY_EXISTS(priority) {
  return "The priority '".concat(priority, "' is already declared in a map.");
};
var DEFAULT_ERROR_PRIORITY_NAN = function DEFAULT_ERROR_PRIORITY_NAN(priority) {
  return "The priority '".concat(priority, "' is not a number.");
};

/**
 * @typedef {object} PriorityMap
 * @property {Function} addItem Adds items to the priority map.
 * @property {Function} getItems Gets items from the passed map in a ASC or DESC order of priorities.
 */
/**
 * Creates a new priority map.
 *
 * @param {object} config The config for priority map.
 * @param {Function} config.errorPriorityExists The function to generate a custom error message if priority is already taken.
 * @param {Function} config.errorPriorityNaN The function to generate a custom error message if priority is not a number.
 * @returns {PriorityMap}
 */
function createPriorityMap() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    errorPriorityExists = _ref.errorPriorityExists,
    errorPriorityNaN = _ref.errorPriorityNaN;
  var priorityMap = new Map();
  errorPriorityExists = (0, _function.isFunction)(errorPriorityExists) ? errorPriorityExists : DEFAULT_ERROR_PRIORITY_EXISTS;
  errorPriorityNaN = (0, _function.isFunction)(errorPriorityNaN) ? errorPriorityNaN : DEFAULT_ERROR_PRIORITY_NAN;

  /**
   * Adds items to priority map. Throws an error if `priority` is not a number or if is already added.
   *
   * @param {number} priority The priority for adding item.
   * @param {*} item The adding item.
   */
  function addItem(priority, item) {
    if (!(0, _number.isNumeric)(priority)) {
      throw new Error(errorPriorityNaN(priority));
    }
    if (priorityMap.has(priority)) {
      throw new Error(errorPriorityExists(priority));
    }
    priorityMap.set(priority, item);
  }

  /**
   * Gets items from the passed map in a ASC or DESC order of priorities.
   *
   * @param {string} [order] The order for getting items. ASC is an default.
   * @returns {*}
   */
  function getItems() {
    var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ASC;
    var _ref2 = ORDER_MAP.get(order) || ORDER_MAP.get(ASC),
      _ref3 = _slicedToArray(_ref2, 2),
      left = _ref3[0],
      right = _ref3[1];
    return _toConsumableArray(priorityMap) // we want to be sure we sort over a priority key
    // if we are sure we can remove custom compare function
    // then we should replace next line with a default `.sort()`
    .sort(function (a, b) {
      return a[0] < b[0] ? left : right;
    }).map(function (item) {
      return item[1];
    });
  }
  return {
    addItem: addItem,
    getItems: getItems
  };
}