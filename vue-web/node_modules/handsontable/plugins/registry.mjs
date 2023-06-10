function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Utility to register plugins and common namespace for keeping the reference to all plugins classes.
 */import { toUpperCaseFirst } from "../helpers/string.mjs";
import { createPriorityMap } from "../utils/dataStructures/priorityMap.mjs";
import { createUniqueMap } from "../utils/dataStructures/uniqueMap.mjs";
import { createUniqueSet } from "../utils/dataStructures/uniqueSet.mjs";
var ERROR_PLUGIN_REGISTERED = function ERROR_PLUGIN_REGISTERED(pluginName) {
  return "There is already registered \"".concat(pluginName, "\" plugin.");
};
var ERROR_PRIORITY_REGISTERED = function ERROR_PRIORITY_REGISTERED(priority) {
  return "There is already registered plugin on priority \"".concat(priority, "\".");
};
var ERROR_PRIORITY_NAN = function ERROR_PRIORITY_NAN(priority) {
  return "The priority \"".concat(priority, "\" is not a number.");
};

/**
 * Stores plugins' names' queue with their priorities.
 */
var priorityPluginsQueue = createPriorityMap({
  errorPriorityExists: ERROR_PRIORITY_REGISTERED,
  errorPriorityNaN: ERROR_PRIORITY_NAN
});
/**
 * Stores plugins names' queue by registration order.
 */
var uniquePluginsQueue = createUniqueSet({
  errorItemExists: ERROR_PLUGIN_REGISTERED
});
/**
 * Stores plugins references between their name and class.
 */
var uniquePluginsList = createUniqueMap({
  errorIdExists: ERROR_PLUGIN_REGISTERED
});

/**
 * Gets registered plugins' names in the following order:
 * 1) Plugins registered with a defined priority attribute, in the ascending order of priority.
 * 2) Plugins registered without a defined priority attribute, in the registration order.
 *
 * @returns {string[]}
 */
export function getPluginsNames() {
  return [].concat(_toConsumableArray(priorityPluginsQueue.getItems()), _toConsumableArray(uniquePluginsQueue.getItems()));
}

/**
 * Gets registered plugin's class based on the given name.
 *
 * @param {string} pluginName Plugin's name.
 * @returns {BasePlugin}
 */
export function getPlugin(pluginName) {
  var unifiedPluginName = toUpperCaseFirst(pluginName);
  return uniquePluginsList.getItem(unifiedPluginName);
}

/**
 * Checks if the plugin under the name is already registered.
 *
 * @param {string} pluginName Plugin's name.
 * @returns {boolean}
 */
export function hasPlugin(pluginName) {
  /* eslint-disable no-unneeded-ternary */
  return getPlugin(pluginName) ? true : false;
}

/**
 * Registers plugin under the given name only once.
 *
 * @param {string|Function} pluginName The plugin name or plugin class.
 * @param {Function} [pluginClass] The plugin class.
 * @param {number} [priority] The plugin priority.
 */
export function registerPlugin(pluginName, pluginClass, priority) {
  var _unifyPluginArguments = unifyPluginArguments(pluginName, pluginClass, priority);
  var _unifyPluginArguments2 = _slicedToArray(_unifyPluginArguments, 3);
  pluginName = _unifyPluginArguments2[0];
  pluginClass = _unifyPluginArguments2[1];
  priority = _unifyPluginArguments2[2];
  if (getPlugin(pluginName) === void 0) {
    _registerPlugin(pluginName, pluginClass, priority);
  }
}

/**
 * Registers plugin under the given name.
 *
 * @param {string|Function} pluginName The plugin name or plugin class.
 * @param {Function} [pluginClass] The plugin class.
 * @param {number} [priority] The plugin priority.
 */
function _registerPlugin(pluginName, pluginClass, priority) {
  var unifiedPluginName = toUpperCaseFirst(pluginName);
  if (uniquePluginsList.hasItem(unifiedPluginName)) {
    throw new Error(ERROR_PLUGIN_REGISTERED(unifiedPluginName));
  }
  if (priority === void 0) {
    uniquePluginsQueue.addItem(unifiedPluginName);
  } else {
    priorityPluginsQueue.addItem(priority, unifiedPluginName);
  }
  uniquePluginsList.addItem(unifiedPluginName, pluginClass);
}

/**
 * Unifies arguments to register the plugin.
 *
 * @param {string|Function} pluginName The plugin name or plugin class.
 * @param {Function} [pluginClass] The plugin class.
 * @param {number} [priority] The plugin priority.
 * @returns {Array}
 */
function unifyPluginArguments(pluginName, pluginClass, priority) {
  if (typeof pluginName === 'function') {
    pluginClass = pluginName;
    pluginName = pluginClass.PLUGIN_KEY;
    priority = pluginClass.PLUGIN_PRIORITY;
  }
  return [pluginName, pluginClass, priority];
}