"use strict";

require("core-js/modules/es.array.from.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.index-of.js");
var _array = require("../../helpers/array");
var _utils = require("./utils");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * @class LazyFactoryMap
 *
 * The LazyFactoryMap object holds key-value pairs in the structure similar to the
 * regular Map. Once created, items can be moved around a grid depending on the operations
 * performed on that grid - adding or removing rows. The collection requires "key"
 * to be a zero-based index.
 *
 * It's essential to notice that the "key" index under which the item was created
 * is volatile. After altering the grid, the "key" index can change.
 *
 * Having created N items with corresponding example data where the data has 10
 * holes (`undefined` values) within (that's why internal storage index counts from 10).
 * +------+------+------+------+------+.
 * | 0/10 | 1/11 | 2/12 | 3/13 | 4/14 |  Keys (volatile zero-based index / internal storage index)
 * +------+------+------+------+------+.
 *    │      │      │      │      │
 * +------+------+------+------+------+.
 * | AAA  | BBB  | CCC  | DDD  | EEE  |  Data
 * +------+------+------+------+------+.
 *
 * Map.obtain(0) // returns "AAA"
 * map.obtain(2) // returns "CCC".
 *
 * After inserting 2 new rows, keys that hold the data positioned after the place
 * where the new rows are added are upshifted by 2.
 *               │
 *               │ Insert 2 rows
 *              \│/
 * +------+------+------+------+------+.
 * | 0/10 | 1/11 | 2/12 | 3/13 | 4/14 |  Keys before
 * +------+------+------+------+------+.
 *
 *                / 2 new rows \
 * +------+------+------+------+------+------+------+.
 * | 0/10 | 1/11 | 2/15 | 3/16 | 4/12 | 5/13 | 6/14 |  Keys after
 * +------+------+------+------+------+------+------+.
 *    │       │      │      │      │      │     │
 *    │       │      └──────┼──────┼──────┼┐    │
 *    │       │             └──────┼──────┼┼────┼┐
 *    │       │      ┌─────────────┘      ││    ││
 *    │       │      │      ┌─────────────┘│    ││
 *    │       │      │      │      ┌───────┼────┘│
 *    │       │      │      │      │       │     │
 * +------+------+------+------+------+------+------+.
 * | AAA  | BBB  | CCC  | DDD  | EEE  | FFF  | GGG  |  Data
 * +------+------+------+------+------+------+------+
 *
 * Now at index 2 and 3 we have access to new items.
 *
 * map.obtain(2) // returns new value "FFF" for newly created row.
 * map.obtain(4) // index shifted by 2 has access to the old "CCC" value, as before inserting.
 *
 * after removing 4 rows, keys that hold the data positioned after the place where the
 * rows are removed are downshifted by 4.
 *        │
 *        │ Remove 4 rows
 *        ├───────────────────────────┐
 *       \│/                          │
 * +------+------+------+------+------+------+------+
 * | 0/10 | 1/11 | 2/15 | 3/16 | 4/12 | 5/13 | 6/14 |  Keys after
 * +------+------+------+------+------+------+------+
 *    │       │      │      │      │      │     │
 *    │       │      └──────┼──────┼──────┼┐    │
 *    │       │             └──────┼──────┼┼────┼┐
 *    │       │      ┌─────────────┘      ││    ││
 *    │       │      │      ┌─────────────┘│    ││
 *    │       │      │      │      ┌───────┼────┘│
 *    │       │      │      │      │       │     │
 * +------+------+------+------+------+------+------+
 * | AAA  | BBB  | CCC  | DDD  | EEE  | FFF  | GGG  |  Data
 * +------+------+------+------+------+------+------+
 *
 * +------+------+------+
 * | 0/10 | 1/13 | 2/14 |  Keys after
 * +------+------+------+
 *    │       │      │
 *    │       │      └─────────────┐
 *    │       └────────────┐       │
 *    │                    │       │
 *    │                    │       │
 *    │                    │       │
 *    │                    │       │
 * +------+------+------+------+------+------+------+
 * | AAA  | BBB  | CCC  | DDD  | EEE  | FFF  | GGG  |  Data
 * +------+------+------+------+------+------+------+
 *           /│\   /│\                   /│\   /│\
 *            └──┬──┘                     └──┬──┘
 *           This data is marked as "hole" which
 *           means that can be replaced by new item
 *           when that will be created.
 *
 * map.obtain(2) // returns the value ("EEE") as it should. Access to the value is
 *               // changed (the key was downshifted). However, the internal index has not changed,
 *               // which means that the data does not need to be changed (spliced) too.
 *
 * After previous remove operation which creates some "holes" obtaining new
 * items replaces that "holes" as follows:
 *
 * // Obtains new item
 * map.obtain(90) // Returns "NEW" value
 *
 * +------+------+------+...+------+
 * | 0/10 | 1/13 | 2/14 |   | 90/0 |  Keys after
 * +------+------+------+...+------+
 *    │       │      │          │
 *    │       │      └──────────┼────────────┐
 *    │       └─────────────────┼─────┐      │
 *    └──────────┐              │     │      │
 *               │              │     │      │
 *    ┌──────────┼──────────────┘     │      │
 *    │          │                    │      │
 * +------+...+------+------+------+------+------+-----+
 * | NEW  |   | AAA  | BBB  | CCC  | DDD  | EEE  | FFF |  Data
 * +------+...+------+------+------+------+------+-----+
 *   /│\
 *    │
 * The first "hole" (at index 0) item is permanently removed and replaced by a new item.
 * The hole index is taken from the hole collection which act as FIFO (First In First Out).
 */
/* eslint-enable jsdoc/require-description-complete-sentence */
var LazyFactoryMap = /*#__PURE__*/function (_Symbol$iterator) {
  function LazyFactoryMap(valueFactory) {
    _classCallCheck(this, LazyFactoryMap);
    this.valueFactory = valueFactory;
    /**
     * An array which contains data.
     *
     * @type {Array}
     */
    this.data = [];
    /**
     * An array of indexes where the key of the array is mapped to the value which points to the
     * specific position of the data array.
     *
     * @type {number[]}
     */
    this.index = [];
    /**
     * The collection of indexes that points to the data items which can be replaced by obtaining new
     * ones. The "holes" are an intended effect of deleting entries.
     *
     * The idea of "holes" generally allows us to not modify the "data" structure while removing
     * items from the collection.
     *
     * @type {Set<number>}
     */
    this.holes = new Set();
  }

  /**
   * Gets or if data not exist creates and returns new data.
   *
   * @param {number} key The item key as zero-based index.
   * @returns {*}
   */
  _createClass(LazyFactoryMap, [{
    key: "obtain",
    value: function obtain(key) {
      (0, _utils.assert)(function () {
        return (0, _utils.isUnsignedNumber)(key);
      }, 'Expecting an unsigned number.');
      var dataIndex = this._getStorageIndexByKey(key);
      var result;
      if (dataIndex >= 0) {
        result = this.data[dataIndex];
        if (result === void 0) {
          result = this.valueFactory(key);
          this.data[dataIndex] = result;
        }
      } else {
        result = this.valueFactory(key);
        if (this.holes.size > 0) {
          var reuseIndex = this.holes.values().next().value; // Gets first item from the collection

          this.holes.delete(reuseIndex);
          this.data[reuseIndex] = result;
          this.index[key] = reuseIndex;
        } else {
          this.data.push(result);
          this.index[key] = this.data.length - 1;
        }
      }
      return result;
    }

    /**
     * Inserts an empty data to the map. This method creates an empty space for obtaining
     * new data.
     *
     * @param {number} key The key as volatile zero-based index at which to begin inserting space for new data.
     * @param {number} [amount=1] Ammount of data to insert.
     */
  }, {
    key: "insert",
    value: function insert(key) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      (0, _utils.assert)(function () {
        return (0, _utils.isUnsignedNumber)(key) || (0, _utils.isNullish)(key);
      }, 'Expecting an unsigned number or null/undefined argument.');
      var newIndexes = [];
      var dataLength = this.data.length;
      for (var i = 0; i < amount; i++) {
        newIndexes.push(dataLength + i);
        this.data.push(void 0);
      }
      var insertionIndex = (0, _utils.isNullish)(key) ? this.index.length : key;
      this.index = [].concat(_toConsumableArray(this.index.slice(0, insertionIndex)), newIndexes, _toConsumableArray(this.index.slice(insertionIndex)));
    }

    /**
     * Removes (soft remove) data from "index" and according to the amount of data.
     *
     * @param {number} key The key as volatile zero-based index at which to begin removing the data.
     * @param {number} [amount=1] Ammount data to remove.
     */
  }, {
    key: "remove",
    value: function remove(key) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      (0, _utils.assert)(function () {
        return (0, _utils.isUnsignedNumber)(key) || (0, _utils.isNullish)(key);
      }, 'Expecting an unsigned number or null/undefined argument.');
      var removed = this.index.splice((0, _utils.isNullish)(key) ? this.index.length - amount : key, amount);
      for (var i = 0; i < removed.length; i++) {
        var removedIndex = removed[i];
        if (typeof removedIndex === 'number') {
          this.holes.add(removedIndex);
        }
      }
    }

    /**
     * Returns the size of the data which this map holds.
     *
     * @returns {number}
     */
  }, {
    key: "size",
    value: function size() {
      return this.data.length - this.holes.size;
    }

    /**
     * Returns a new Iterator object that contains the values for each item in the LazyMap object.
     *
     * @returns {Iterator}
     */
  }, {
    key: "values",
    value: function values() {
      var _this = this;
      return (0, _array.arrayFilter)(this.data, function (_, index) {
        return !_this.holes.has(index);
      })[Symbol.iterator]();
    }

    /**
     * Returns a new Iterator object that contains an array of `[index, value]` for each item in the LazyMap object.
     *
     * @returns {Iterator}
     */
  }, {
    key: "entries",
    value: function entries() {
      var validEntries = [];
      for (var i = 0; i < this.data.length; i++) {
        var keyIndex = this._getKeyByStorageIndex(i);
        if (keyIndex !== -1) {
          validEntries.push([keyIndex, this.data[i]]);
        }
      }
      var dataIndex = 0;
      return {
        next: function next() {
          if (dataIndex < validEntries.length) {
            var value = validEntries[dataIndex];
            dataIndex += 1;
            return {
              value: value,
              done: false
            };
          }
          return {
            done: true
          };
        }
      };
    }

    /**
     * Clears the map.
     */
  }, {
    key: "clear",
    value: function clear() {
      this.data = [];
      this.index = [];
      this.holes.clear();
    }

    /**
     * Gets storage index calculated from the key associated with the specified value.
     *
     * @param {number} key Volatile zero-based index.
     * @returns {number} Returns index 0-N or -1 if no storage index found.
     */
  }, {
    key: "_getStorageIndexByKey",
    value: function _getStorageIndexByKey(key) {
      return this.index.length > key ? this.index[key] : -1;
    }

    /**
     * Gets the key associated with the specified value calculated from storage index.
     *
     * @param {number} dataIndex Zero-based storage index.
     * @returns {number} Returns index 0-N or -1 if no key found.
     */
  }, {
    key: "_getKeyByStorageIndex",
    value: function _getKeyByStorageIndex(dataIndex) {
      return this.index.indexOf(dataIndex);
    }

    /**
     * Makes this object iterable.
     *
     * @returns {Iterator}
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return this.entries();
    }
  }]);
  return LazyFactoryMap;
}(Symbol.iterator);
exports.default = LazyFactoryMap;