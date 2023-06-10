"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
exports.__esModule = true;
exports.ColumnStatesManager = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.map.js");
var _object = require("../../helpers/object");
var _translations = require("../../translations");
var _mixed = require("../../helpers/mixed");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var inheritedColumnProperties = ['sortEmptyCells', 'indicator', 'headerAction', 'compareFunctionFactory'];
var SORT_EMPTY_CELLS_DEFAULT = false;
var SHOW_SORT_INDICATOR_DEFAULT = true;
var HEADER_ACTION_DEFAULT = true;

/**
 * Store and manages states of sorted columns.
 *
 * @private
 * @class ColumnStatesManager
 */
var ColumnStatesManager = /*#__PURE__*/function () {
  function ColumnStatesManager(hot, mapName) {
    _classCallCheck(this, ColumnStatesManager);
    /**
     * Handsontable instance.
     *
     * @type {Core}
     */
    this.hot = hot;
    /**
     * Index map storing sorting states for every column. ColumnStatesManager write and read to/from this element.
     *
     * @type {LinkedPhysicalIndexToValueMap}
     */
    this.sortingStates = new _translations.LinkedPhysicalIndexToValueMap();
    /**
     * Determines whether we should sort empty cells.
     *
     * @type {boolean}
     */
    this.sortEmptyCells = SORT_EMPTY_CELLS_DEFAULT;
    /**
     * Determines whether indicator should be visible (for sorted columns).
     *
     * @type {boolean}
     */
    this.indicator = SHOW_SORT_INDICATOR_DEFAULT;
    /**
     * Determines whether click on the header perform sorting.
     *
     * @type {boolean}
     */
    this.headerAction = HEADER_ACTION_DEFAULT;
    /**
     * Determines compare function factory. Method get as parameters `sortOder` and `columnMeta` and return compare function.
     */
    this.compareFunctionFactory = void 0;
    /**
     * Name of map storing sorting states. Required for unique name (PR #7440 introduced it). It's needed as
     * both ColumnSorting and MultiColumnSorting plugins create state manager and as a consequence register maps.
     * Objects are destroyed in strange order as the updateSettings doesn't work well.
     */
    this.mapName = mapName;
    this.hot.columnIndexMapper.registerMap(mapName, this.sortingStates);
  }

  /**
   * Update column properties which affect the sorting result.
   *
   * **Note**: All column properties can be overwritten by {@link Options#columns} option.
   *
   * @param {object} allSortSettings Column sorting plugin's configuration object.
   */
  _createClass(ColumnStatesManager, [{
    key: "updateAllColumnsProperties",
    value: function updateAllColumnsProperties(allSortSettings) {
      var _this = this;
      if (!(0, _object.isObject)(allSortSettings)) {
        return;
      }
      (0, _object.objectEach)(allSortSettings, function (newValue, propertyName) {
        if (inheritedColumnProperties.includes(propertyName)) {
          _this[propertyName] = newValue;
        }
      });
    }

    /**
     * Get all column properties which affect the sorting result.
     *
     * @returns {object}
     */
  }, {
    key: "getAllColumnsProperties",
    value: function getAllColumnsProperties() {
      var columnProperties = {
        sortEmptyCells: this.sortEmptyCells,
        indicator: this.indicator,
        headerAction: this.headerAction
      };
      if (typeof this.compareFunctionFactory === 'function') {
        columnProperties.compareFunctionFactory = this.compareFunctionFactory;
      }
      return columnProperties;
    }

    /**
     * Get sort order of column.
     *
     * @param {number} searchedColumn Visual column index.
     * @returns {string|undefined} Sort order (`asc` for ascending, `desc` for descending and undefined for not sorted).
     */
  }, {
    key: "getSortOrderOfColumn",
    value: function getSortOrderOfColumn(searchedColumn) {
      var _this$sortingStates$g;
      return (_this$sortingStates$g = this.sortingStates.getValueAtIndex(this.hot.toPhysicalColumn(searchedColumn))) === null || _this$sortingStates$g === void 0 ? void 0 : _this$sortingStates$g.sortOrder;
    }

    /**
     * Get order of particular column in the states queue.
     *
     * @param {number} column Visual column index.
     * @returns {number}
     */
  }, {
    key: "getIndexOfColumnInSortQueue",
    value: function getIndexOfColumnInSortQueue(column) {
      column = this.hot.toPhysicalColumn(column);
      return this.sortingStates.getEntries().findIndex(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          physicalColumn = _ref2[0];
        return physicalColumn === column;
      });
    }

    /**
     * Get number of sorted columns.
     *
     * @returns {number}
     */
  }, {
    key: "getNumberOfSortedColumns",
    value: function getNumberOfSortedColumns() {
      return this.sortingStates.getLength();
    }

    /**
     * Get if list of sorted columns is empty.
     *
     * @returns {boolean}
     */
  }, {
    key: "isListOfSortedColumnsEmpty",
    value: function isListOfSortedColumnsEmpty() {
      return this.getNumberOfSortedColumns() === 0;
    }

    /**
     * Get if particular column is sorted.
     *
     * @param {number} column Visual column index.
     * @returns {boolean}
     */
  }, {
    key: "isColumnSorted",
    value: function isColumnSorted(column) {
      return (0, _object.isObject)(this.sortingStates.getValueAtIndex(this.hot.toPhysicalColumn(column)));
    }

    /**
     * Queue of sort states containing sorted columns and their orders (Array of objects containing `column` and `sortOrder` properties).
     *
     * **Note**: Please keep in mind that returned objects expose **visual** column index under the `column` key.
     *
     * @returns {Array<object>}
     */
  }, {
    key: "getSortStates",
    value: function getSortStates() {
      var _this2 = this;
      if (this.sortingStates === null) {
        return [];
      }
      var sortingStatesQueue = this.sortingStates.getEntries();
      return sortingStatesQueue.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          physicalColumn = _ref4[0],
          value = _ref4[1];
        return _objectSpread({
          column: _this2.hot.toVisualColumn(physicalColumn)
        }, value);
      });
    }

    /**
     * Get sort state for particular column. Object contains `column` and `sortOrder` properties.
     *
     * **Note**: Please keep in mind that returned objects expose **visual** column index under the `column` key.
     *
     * @param {number} column Visual column index.
     * @returns {object|undefined}
     */
  }, {
    key: "getColumnSortState",
    value: function getColumnSortState(column) {
      var sortOrder = this.getSortOrderOfColumn(column);
      if ((0, _mixed.isDefined)(sortOrder)) {
        return {
          column: column,
          sortOrder: sortOrder
        };
      }
    }

    /**
     * Set all column states.
     *
     * @param {Array} sortStates Sort states.
     */
  }, {
    key: "setSortStates",
    value: function setSortStates(sortStates) {
      this.sortingStates.clear();
      for (var i = 0; i < sortStates.length; i += 1) {
        this.sortingStates.setValueAtIndex(this.hot.toPhysicalColumn(sortStates[i].column), {
          sortOrder: sortStates[i].sortOrder
        });
      }
    }

    /**
     * Destroy the state manager.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.hot.columnIndexMapper.unregisterMap(this.mapName);
      this.sortingStates = null;
    }
  }]);
  return ColumnStatesManager;
}();
exports.ColumnStatesManager = ColumnStatesManager;