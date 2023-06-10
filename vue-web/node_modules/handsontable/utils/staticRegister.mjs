function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
export var collection = new Map();

/**
 * @param {string} namespace The namespace for the storage.
 * @returns {object}
 */
export default function staticRegister() {
  var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'common';
  if (!collection.has(namespace)) {
    collection.set(namespace, new Map());
  }
  var subCollection = collection.get(namespace);

  /**
   * Register an item to the collection. If the item under the same was exist earlier then this item will be replaced with new one.
   *
   * @param {string} name Identification of the item.
   * @param {*} item Item to save in the collection.
   */
  function register(name, item) {
    subCollection.set(name, item);
  }

  /**
   * Retrieve the item from the collection.
   *
   * @param {string} name Identification of the item.
   * @returns {*} Returns item which was saved in the collection.
   */
  function getItem(name) {
    return subCollection.get(name);
  }

  /**
   * Check if item under specified name is exists.
   *
   * @param {string} name Identification of the item.
   * @returns {boolean} Returns `true` or `false` depends on if element exists in the collection.
   */
  function hasItem(name) {
    return subCollection.has(name);
  }

  /**
   * Retrieve list of names registered from the collection.
   *
   * @returns {Array} Returns an array of strings with all names under which objects are stored.
   */
  function getNames() {
    return _toConsumableArray(subCollection.keys());
  }

  /**
   * Retrieve all registered values from the collection.
   *
   * @returns {Array} Returns an array with all values stored in the collection.
   */
  function getValues() {
    return _toConsumableArray(subCollection.values());
  }
  return {
    register: register,
    getItem: getItem,
    hasItem: hasItem,
    getNames: getNames,
    getValues: getValues
  };
}