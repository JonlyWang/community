import "core-js/modules/es.array.slice.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { rangeEach } from "../../helpers/number.mjs";
import { mixin } from "../../helpers/object.mjs";
import { isFunction } from "../../helpers/function.mjs";
import localHooks from "../../mixins/localHooks.mjs"; /**
                                                       * Map for storing mappings from an index to a value.
                                                       *
                                                       * @class IndexMap
                                                       */
export var IndexMap = /*#__PURE__*/function () {
  function IndexMap() {
    var initValueOrFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, IndexMap);
    /**
     * List of values for particular indexes.
     *
     * @private
     * @type {Array}
     */
    this.indexedValues = [];
    /**
     * Initial value or function for each existing index.
     *
     * @private
     * @type {*}
     */
    this.initValueOrFn = initValueOrFn;
  }

  /**
   * Get full list of values for particular indexes.
   *
   * @returns {Array}
   */
  _createClass(IndexMap, [{
    key: "getValues",
    value: function getValues() {
      return this.indexedValues;
    }

    /**
     * Get value for the particular index.
     *
     * @param {number} index Index for which value is got.
     * @returns {*}
     */
  }, {
    key: "getValueAtIndex",
    value: function getValueAtIndex(index) {
      var values = this.indexedValues;
      if (index < values.length) {
        return values[index];
      }
    }

    /**
     * Set new values for particular indexes.
     *
     * Note: Please keep in mind that `change` hook triggered by the method may not update cache of a collection immediately.
     *
     * @param {Array} values List of set values.
     */
  }, {
    key: "setValues",
    value: function setValues(values) {
      this.indexedValues = values.slice();
      this.runLocalHooks('change');
    }

    /**
     * Set new value for the particular index.
     *
     * @param {number} index The index.
     * @param {*} value The value to save.
     *
     * Note: Please keep in mind that it is not possible to set value beyond the map (not respecting already set
     * map's size). Please use the `setValues` method when you would like to extend the map.
     * Note: Please keep in mind that `change` hook triggered by the method may not update cache of a collection immediately.
     *
     * @returns {boolean}
     */
  }, {
    key: "setValueAtIndex",
    value: function setValueAtIndex(index, value) {
      if (index < this.indexedValues.length) {
        this.indexedValues[index] = value;
        this.runLocalHooks('change');
        return true;
      }
      return false;
    }

    /**
     * Clear all values to the defaults.
     */
  }, {
    key: "clear",
    value: function clear() {
      this.setDefaultValues();
    }

    /**
     * Get length of the index map.
     *
     * @returns {number}
     */
  }, {
    key: "getLength",
    value: function getLength() {
      return this.getValues().length;
    }

    /**
     * Set default values for elements from `0` to `n`, where `n` is equal to the handled variable.
     *
     * Note: Please keep in mind that `change` hook triggered by the method may not update cache of a collection immediately.
     *
     * @private
     * @param {number} [length] Length of list.
     */
  }, {
    key: "setDefaultValues",
    value: function setDefaultValues() {
      var _this = this;
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.indexedValues.length;
      this.indexedValues.length = 0;
      if (isFunction(this.initValueOrFn)) {
        rangeEach(length - 1, function (index) {
          return _this.indexedValues.push(_this.initValueOrFn(index));
        });
      } else {
        rangeEach(length - 1, function () {
          return _this.indexedValues.push(_this.initValueOrFn);
        });
      }
      this.runLocalHooks('change');
    }

    /**
     * Initialize list with default values for particular indexes.
     *
     * @private
     * @param {number} length New length of indexed list.
     * @returns {IndexMap}
     */
  }, {
    key: "init",
    value: function init(length) {
      this.setDefaultValues(length);
      this.runLocalHooks('init');
      return this;
    }

    /**
     * Add values to the list.
     *
     * Note: Please keep in mind that `change` hook triggered by the method may not update cache of a collection immediately.
     *
     * @private
     */
  }, {
    key: "insert",
    value: function insert() {
      this.runLocalHooks('change');
    }

    /**
     * Remove values from the list.
     *
     * Note: Please keep in mind that `change` hook triggered by the method may not update cache of a collection immediately.
     *
     * @private
     */
  }, {
    key: "remove",
    value: function remove() {
      this.runLocalHooks('change');
    }

    /**
     * Destroys the Map instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.clearLocalHooks();
      this.indexedValues = null;
      this.initValueOrFn = null;
    }
  }]);
  return IndexMap;
}();
mixin(IndexMap, localHooks);