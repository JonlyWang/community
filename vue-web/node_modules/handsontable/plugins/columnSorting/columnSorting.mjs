function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
var _excluded = ["column"],
  _excluded2 = ["column"];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.number.is-integer.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
import { addClass, removeClass } from "../../helpers/dom/element.mjs";
import { isUndefined, isDefined } from "../../helpers/mixed.mjs";
import { isObject } from "../../helpers/object.mjs";
import { isFunction } from "../../helpers/function.mjs";
import { arrayMap } from "../../helpers/array.mjs";
import { BasePlugin } from "../base/index.mjs";
import { IndexesSequence, PhysicalIndexToValueMap as IndexToValueMap } from "../../translations/index.mjs";
import Hooks from "../../pluginHooks.mjs";
import { ColumnStatesManager } from "./columnStatesManager.mjs";
import { getNextSortOrder, areValidSortStates, getHeaderSpanElement, isFirstLevelColumnHeader, wasHeaderClickedProperly } from "./utils.mjs";
import { getClassesToRemove, getClassesToAdd } from "./domHelpers.mjs";
import { rootComparator } from "./rootComparator.mjs";
import { registerRootComparator, sort } from "./sortService/index.mjs";
export var PLUGIN_KEY = 'columnSorting';
export var PLUGIN_PRIORITY = 50;
var APPEND_COLUMN_CONFIG_STRATEGY = 'append';
var REPLACE_COLUMN_CONFIG_STRATEGY = 'replace';
registerRootComparator(PLUGIN_KEY, rootComparator);
Hooks.getSingleton().register('beforeColumnSort');
Hooks.getSingleton().register('afterColumnSort');

// DIFF - MultiColumnSorting & ColumnSorting: changed configuration documentation.
/**
 * @plugin ColumnSorting
 * @class ColumnSorting
 *
 * @description
 * This plugin sorts the view by columns (but does not sort the data source!). To enable the plugin, set the
 * {@link Options#columnSorting} property to the correct value (see the examples below).
 *
 * @example
 * ```js
 * // as boolean
 * columnSorting: true
 *
 * // as an object with initial sort config (sort ascending for column at index 1)
 * columnSorting: {
 *   initialConfig: {
 *     column: 1,
 *     sortOrder: 'asc'
 *   }
 * }
 *
 * // as an object which define specific sorting options for all columns
 * columnSorting: {
 *   sortEmptyCells: true, // true = the table sorts empty cells, false = the table moves all empty cells to the end of the table (by default)
 *   indicator: true, // true = shows indicator for all columns (by default), false = don't show indicator for columns
 *   headerAction: true, // true = allow to click on the headers to sort (by default), false = turn off possibility to click on the headers to sort
 *   compareFunctionFactory: function(sortOrder, columnMeta) {
 *     return function(value, nextValue) {
 *       // Some value comparisons which will return -1, 0 or 1...
 *     }
 *   }
 * }
 *
 * // as an object passed to the `column` property, allows specifying a custom options for the desired column.
 * // please take a look at documentation of `column` property: https://handsontable.com/docs/Options.html#columns
 * columns: [{
 *   columnSorting: {
 *     indicator: false, // disable indicator for the first column,
 *     sortEmptyCells: true,
 *     headerAction: false, // clicks on the first column won't sort
 *     compareFunctionFactory: function(sortOrder, columnMeta) {
 *       return function(value, nextValue) {
 *         return 0; // Custom compare function for the first column (don't sort)
 *       }
 *     }
 *   }
 * }]
 * ```
 */
export var ColumnSorting = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ColumnSorting, _BasePlugin);
  var _super = _createSuper(ColumnSorting);
  function ColumnSorting(hotInstance) {
    var _this;
    _classCallCheck(this, ColumnSorting);
    _this = _super.call(this, hotInstance);
    /**
     * Instance of column state manager.
     *
     * @private
     * @type {null|ColumnStatesManager}
     */
    _this.columnStatesManager = null;
    /**
     * Cached column properties from plugin like i.e. `indicator`, `headerAction`.
     *
     * @private
     * @type {null|PhysicalIndexToValueMap}
     */
    _this.columnMetaCache = null;
    /**
     * Main settings key designed for the plugin.
     *
     * @private
     * @type {string}
     */
    _this.pluginKey = PLUGIN_KEY;
    /**
     * Plugin indexes cache.
     *
     * @private
     * @type {null|IndexesSequence}
     */
    _this.indexesSequenceCache = null;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the Handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link ColumnSorting#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(ColumnSorting, [{
    key: "isEnabled",
    value: function isEnabled() {
      return !!this.hot.getSettings()[this.pluginKey];
    }

    /**
     * Enables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;
      if (this.enabled) {
        return;
      }
      this.columnStatesManager = new ColumnStatesManager(this.hot, "".concat(this.pluginKey, ".sortingStates"));
      this.columnMetaCache = new IndexToValueMap(function (physicalIndex) {
        var visualIndex = _this2.hot.toVisualColumn(physicalIndex);
        if (visualIndex === null) {
          visualIndex = physicalIndex;
        }
        return _this2.getMergedPluginSettings(visualIndex);
      });
      this.hot.columnIndexMapper.registerMap("".concat(this.pluginKey, ".columnMeta"), this.columnMetaCache);
      this.addHook('afterGetColHeader', function (column, TH) {
        return _this2.onAfterGetColHeader(column, TH);
      });
      this.addHook('beforeOnCellMouseDown', function () {
        return _this2.onBeforeOnCellMouseDown.apply(_this2, arguments);
      });
      this.addHook('afterOnCellMouseDown', function (event, target) {
        return _this2.onAfterOnCellMouseDown(event, target);
      });
      this.addHook('afterInit', function () {
        return _this2.loadOrSortBySettings();
      });
      this.addHook('afterLoadData', function () {
        return _this2.onAfterLoadData.apply(_this2, arguments);
      });

      // TODO: Workaround? It should be refactored / described.
      if (this.hot.view) {
        this.loadOrSortBySettings();
      }
      _get(_getPrototypeOf(ColumnSorting.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var _this3 = this;
      var clearColHeader = function clearColHeader(column, TH) {
        var headerSpanElement = getHeaderSpanElement(TH);
        if (isFirstLevelColumnHeader(column, TH) === false || headerSpanElement === null) {
          return;
        }
        _this3.updateHeaderClasses(headerSpanElement);
      };

      // Changing header width and removing indicator.
      this.hot.addHook('afterGetColHeader', clearColHeader);
      this.hot.addHookOnce('afterViewRender', function () {
        _this3.hot.removeHook('afterGetColHeader', clearColHeader);
      });
      this.hot.batchExecution(function () {
        if (_this3.indexesSequenceCache !== null) {
          _this3.hot.rowIndexMapper.setIndexesSequence(_this3.indexesSequenceCache.getValues());
          _this3.hot.rowIndexMapper.unregisterMap(_this3.pluginKey);
        }
      }, true);
      this.hot.columnIndexMapper.unregisterMap("".concat(this.pluginKey, ".columnMeta"));
      this.columnStatesManager.destroy();
      this.columnMetaCache = null;
      this.columnStatesManager = null;
      _get(_getPrototypeOf(ColumnSorting.prototype), "disablePlugin", this).call(this);
    }

    // DIFF - MultiColumnSorting & ColumnSorting: changed function documentation.
    /**
     * Sorts the table by chosen columns and orders.
     *
     * @param {undefined|object} sortConfig Single column sort configuration. The configuration object contains `column` and `sortOrder` properties.
     * First of them contains visual column index, the second one contains sort order (`asc` for ascending, `desc` for descending).
     *
     * **Note**: Please keep in mind that every call of `sort` function set an entirely new sort order. Previous sort configs aren't preserved.
     *
     * @example
     * ```js
     * // sort ascending first visual column
     * hot.getPlugin('columnSorting').sort({ column: 0, sortOrder: 'asc' });
     * ```
     *
     * @fires Hooks#beforeColumnSort
     * @fires Hooks#afterColumnSort
     */
  }, {
    key: "sort",
    value: function sort(sortConfig) {
      var currentSortConfig = this.getSortConfig();

      // We always pass configs defined as an array to `beforeColumnSort` and `afterColumnSort` hooks.
      var destinationSortConfigs = this.getNormalizedSortConfigs(sortConfig);
      var sortPossible = this.areValidSortConfigs(destinationSortConfigs);
      var allowSort = this.hot.runHooks('beforeColumnSort', currentSortConfig, destinationSortConfigs, sortPossible);
      if (allowSort === false) {
        return;
      }
      if (currentSortConfig.length === 0 && this.indexesSequenceCache === null) {
        this.indexesSequenceCache = this.hot.rowIndexMapper.registerMap(this.pluginKey, new IndexesSequence());
        this.indexesSequenceCache.setValues(this.hot.rowIndexMapper.getIndexesSequence());
      }
      if (sortPossible) {
        this.columnStatesManager.setSortStates(destinationSortConfigs);
        this.sortByPresetSortStates(destinationSortConfigs);
        this.saveAllSortSettings(destinationSortConfigs);
      }
      this.hot.runHooks('afterColumnSort', currentSortConfig, sortPossible ? destinationSortConfigs : currentSortConfig, sortPossible);
      if (sortPossible) {
        this.hot.render();
        // TODO: Workaround? This triggers fast redraw. One test won't pass after removal.
        // It should be refactored / described.
        this.hot.forceFullRender = false;
        this.hot.view.render();
      }
    }

    /**
     * Clear the sort performed on the table.
     */
  }, {
    key: "clearSort",
    value: function clearSort() {
      this.sort([]);
    }

    /**
     * Checks if the table is sorted (any column have to be sorted).
     *
     * @returns {boolean}
     */
  }, {
    key: "isSorted",
    value: function isSorted() {
      return this.enabled && !this.columnStatesManager.isListOfSortedColumnsEmpty();
    }

    /**
     * Get sort configuration for particular column or for all sorted columns. Objects contain `column` and `sortOrder` properties.
     *
     * **Note**: Please keep in mind that returned objects expose **visual** column index under the `column` key. They are handled by the `sort` function.
     *
     * @param {number} [column] Visual column index.
     * @returns {undefined|object|Array}
     */
  }, {
    key: "getSortConfig",
    value: function getSortConfig(column) {
      if (isDefined(column)) {
        return this.columnStatesManager.getColumnSortState(column);
      }
      return this.columnStatesManager.getSortStates();
    }

    /**
     * @description
     * Warn: Useful mainly for providing server side sort implementation (see in the example below). It doesn't sort the data set. It just sets sort configuration for all sorted columns.
     * Note: Please keep in mind that this method doesn't re-render the table.
     *
     * @example
     * ```js
     * beforeColumnSort: function(currentSortConfig, destinationSortConfigs) {
     *   const columnSortPlugin = this.getPlugin('columnSorting');
     *
     *   columnSortPlugin.setSortConfig(destinationSortConfigs);
     *
     *   // const newData = ... // Calculated data set, ie. from an AJAX call.
     *
     *   this.loadData(newData); // Load new data set and re-render the table.
     *
     *   return false; // The blockade for the default sort action.
     * }
     * ```
     *
     * @param {undefined|object|Array} sortConfig Single column sort configuration or full sort configuration (for all sorted columns).
     * The configuration object contains `column` and `sortOrder` properties. First of them contains visual column index, the second one contains
     * sort order (`asc` for ascending, `desc` for descending).
     */
  }, {
    key: "setSortConfig",
    value: function setSortConfig(sortConfig) {
      // We always set configs defined as an array.
      var destinationSortConfigs = this.getNormalizedSortConfigs(sortConfig);
      if (this.areValidSortConfigs(destinationSortConfigs)) {
        this.columnStatesManager.setSortStates(destinationSortConfigs);
      }
    }

    /**
     * Get normalized sort configs.
     *
     * @private
     * @param {object|Array} [sortConfig=[]] Single column sort configuration or full sort configuration (for all sorted columns).
     * The configuration object contains `column` and `sortOrder` properties. First of them contains visual column index, the second one contains
     * sort order (`asc` for ascending, `desc` for descending).
     * @returns {Array}
     */
  }, {
    key: "getNormalizedSortConfigs",
    value: function getNormalizedSortConfigs() {
      var sortConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (Array.isArray(sortConfig)) {
        return sortConfig.slice(0, 1);
      }
      return [sortConfig];
    }

    /**
     * Get if sort configs are valid.
     *
     * @private
     * @param {Array} sortConfigs Sort configuration for all sorted columns. Objects contain `column` and `sortOrder` properties.
     * @returns {boolean}
     */
  }, {
    key: "areValidSortConfigs",
    value: function areValidSortConfigs(sortConfigs) {
      var numberOfColumns = this.hot.countCols();

      // We don't translate visual indexes to physical indexes.
      return areValidSortStates(sortConfigs) && sortConfigs.every(function (_ref) {
        var column = _ref.column;
        return column <= numberOfColumns && column >= 0;
      });
    }

    /**
     * Saves all sorting settings. Saving works only when {@link Options#persistentState} option is enabled.
     *
     * @param {Array} sortConfigs Sort configuration for all sorted columns. Objects contain `column` and `sortOrder` properties.
     *
     * @private
     * @fires Hooks#persistentStateSave
     */
  }, {
    key: "saveAllSortSettings",
    value: function saveAllSortSettings(sortConfigs) {
      var _this4 = this;
      var allSortSettings = this.columnStatesManager.getAllColumnsProperties();
      var translateColumnToPhysical = function translateColumnToPhysical(_ref2) {
        var visualColumn = _ref2.column,
          restOfProperties = _objectWithoutProperties(_ref2, _excluded);
        return _objectSpread({
          column: _this4.hot.toPhysicalColumn(visualColumn)
        }, restOfProperties);
      };
      allSortSettings.initialConfig = arrayMap(sortConfigs, translateColumnToPhysical);
      this.hot.runHooks('persistentStateSave', 'columnSorting', allSortSettings);
    }

    /**
     * Get all saved sorting settings. Loading works only when {@link Options#persistentState} option is enabled.
     *
     * @private
     * @returns {object} Previously saved sort settings.
     *
     * @fires Hooks#persistentStateLoad
     */
  }, {
    key: "getAllSavedSortSettings",
    value: function getAllSavedSortSettings() {
      var _this5 = this;
      var storedAllSortSettings = {};
      this.hot.runHooks('persistentStateLoad', 'columnSorting', storedAllSortSettings);
      var allSortSettings = storedAllSortSettings.value;
      var translateColumnToVisual = function translateColumnToVisual(_ref3) {
        var physicalColumn = _ref3.column,
          restOfProperties = _objectWithoutProperties(_ref3, _excluded2);
        return _objectSpread({
          column: _this5.hot.toVisualColumn(physicalColumn)
        }, restOfProperties);
      };
      if (isDefined(allSortSettings) && Array.isArray(allSortSettings.initialConfig)) {
        allSortSettings.initialConfig = arrayMap(allSortSettings.initialConfig, translateColumnToVisual);
      }
      return allSortSettings;
    }

    /**
     * Get next sort configuration for particular column. Object contain `column` and `sortOrder` properties.
     *
     * **Note**: Please keep in mind that returned object expose **visual** column index under the `column` key.
     *
     * @private
     * @param {number} column Visual column index.
     * @returns {undefined|object}
     */
  }, {
    key: "getColumnNextConfig",
    value: function getColumnNextConfig(column) {
      var sortOrder = this.columnStatesManager.getSortOrderOfColumn(column);
      if (isDefined(sortOrder)) {
        var nextSortOrder = getNextSortOrder(sortOrder);
        if (isDefined(nextSortOrder)) {
          return {
            column: column,
            sortOrder: nextSortOrder
          };
        }
        return;
      }
      var nrOfColumns = this.hot.countCols();
      if (Number.isInteger(column) && column >= 0 && column < nrOfColumns) {
        return {
          column: column,
          sortOrder: getNextSortOrder()
        };
      }
    }

    /**
     * Get sort configuration with "next order" for particular column.
     *
     * @private
     * @param {number} columnToChange Visual column index of column which order will be changed.
     * @param {string} strategyId ID of strategy. Possible values: 'append' and 'replace'. The first one
     * change order of particular column and change it's position in the sort queue to the last one. The second one
     * just change order of particular column.
     *
     * **Note**: Please keep in mind that returned objects expose **visual** column index under the `column` key.
     *
     * @returns {Array}
     */
  }, {
    key: "getNextSortConfig",
    value: function getNextSortConfig(columnToChange) {
      var strategyId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : APPEND_COLUMN_CONFIG_STRATEGY;
      var indexOfColumnToChange = this.columnStatesManager.getIndexOfColumnInSortQueue(columnToChange);
      var isColumnSorted = indexOfColumnToChange !== -1;
      var currentSortConfig = this.getSortConfig();
      var nextColumnConfig = this.getColumnNextConfig(columnToChange);
      if (isColumnSorted) {
        if (isUndefined(nextColumnConfig)) {
          return [].concat(_toConsumableArray(currentSortConfig.slice(0, indexOfColumnToChange)), _toConsumableArray(currentSortConfig.slice(indexOfColumnToChange + 1)));
        }
        if (strategyId === APPEND_COLUMN_CONFIG_STRATEGY) {
          return [].concat(_toConsumableArray(currentSortConfig.slice(0, indexOfColumnToChange)), _toConsumableArray(currentSortConfig.slice(indexOfColumnToChange + 1)), [nextColumnConfig]);
        } else if (strategyId === REPLACE_COLUMN_CONFIG_STRATEGY) {
          return [].concat(_toConsumableArray(currentSortConfig.slice(0, indexOfColumnToChange)), [nextColumnConfig], _toConsumableArray(currentSortConfig.slice(indexOfColumnToChange + 1)));
        }
      }
      if (isDefined(nextColumnConfig)) {
        return currentSortConfig.concat(nextColumnConfig);
      }
      return currentSortConfig;
    }

    /**
     * Get plugin's column config for the specified column index.
     *
     * @private
     * @param {object} columnConfig Configuration inside `columns` property for the specified column index.
     * @returns {object}
     */
  }, {
    key: "getPluginColumnConfig",
    value: function getPluginColumnConfig(columnConfig) {
      if (isObject(columnConfig)) {
        var pluginColumnConfig = columnConfig[this.pluginKey];
        if (isObject(pluginColumnConfig)) {
          return pluginColumnConfig;
        }
      }
      return {};
    }

    /**
     * Get plugin settings related properties, properly merged from cascade settings.
     *
     * @private
     * @param {number} column Visual column index.
     * @returns {object}
     */
  }, {
    key: "getMergedPluginSettings",
    value: function getMergedPluginSettings(column) {
      var pluginMainSettings = this.hot.getSettings()[this.pluginKey];
      var storedColumnProperties = this.columnStatesManager.getAllColumnsProperties();
      var cellMeta = this.hot.getCellMeta(0, column);
      var columnMeta = Object.getPrototypeOf(cellMeta);
      if (Array.isArray(columnMeta.columns)) {
        return Object.assign(storedColumnProperties, pluginMainSettings, this.getPluginColumnConfig(columnMeta.columns[column]));
      } else if (isFunction(columnMeta.columns)) {
        return Object.assign(storedColumnProperties, pluginMainSettings, this.getPluginColumnConfig(columnMeta.columns(column)));
      }
      return Object.assign(storedColumnProperties, pluginMainSettings);
    }

    /**
     * Get copy of settings for first cell in the column.
     *
     * @private
     * @param {number} column Visual column index.
     * @returns {object}
     */
    // TODO: Workaround. Inheriting of non-primitive cell meta values doesn't work. Instead of getting properties from column meta we call this function.
    // TODO: Remove test named: "should not break the dataset when inserted new row" (#5431).
  }, {
    key: "getFirstCellSettings",
    value: function getFirstCellSettings(column) {
      var cellMeta = this.hot.getCellMeta(0, column);
      var cellMetaCopy = Object.create(cellMeta);
      cellMetaCopy[this.pluginKey] = this.columnMetaCache.getValueAtIndex(this.hot.toPhysicalColumn(column));
      return cellMetaCopy;
    }

    /**
     * Get number of rows which should be sorted.
     *
     * @private
     * @param {number} numberOfRows Total number of displayed rows.
     * @returns {number}
     */
  }, {
    key: "getNumberOfRowsToSort",
    value: function getNumberOfRowsToSort(numberOfRows) {
      var settings = this.hot.getSettings();

      // `maxRows` option doesn't take into account `minSpareRows` option in this case.
      if (settings.maxRows <= numberOfRows) {
        return settings.maxRows;
      }
      return numberOfRows - settings.minSpareRows;
    }

    /**
     * Performs the sorting using a stable sort function basing on internal state of sorting.
     *
     * @param {Array} sortConfigs Sort configuration for all sorted columns. Objects contain `column` and `sortOrder` properties.
     * @private
     */
  }, {
    key: "sortByPresetSortStates",
    value: function sortByPresetSortStates(sortConfigs) {
      var _this6 = this;
      if (sortConfigs.length === 0) {
        this.hot.rowIndexMapper.setIndexesSequence(this.indexesSequenceCache.getValues());
        return;
      }
      var indexesWithData = [];
      var numberOfRows = this.hot.countRows();
      var getDataForSortedColumns = function getDataForSortedColumns(visualRowIndex) {
        return arrayMap(sortConfigs, function (sortConfig) {
          return _this6.hot.getDataAtCell(visualRowIndex, sortConfig.column);
        });
      };
      for (var visualRowIndex = 0; visualRowIndex < this.getNumberOfRowsToSort(numberOfRows); visualRowIndex += 1) {
        indexesWithData.push([this.hot.toPhysicalRow(visualRowIndex)].concat(getDataForSortedColumns(visualRowIndex)));
      }
      var indexesBefore = arrayMap(indexesWithData, function (indexWithData) {
        return indexWithData[0];
      });
      sort(indexesWithData, this.pluginKey, arrayMap(sortConfigs, function (sortConfig) {
        return sortConfig.sortOrder;
      }), arrayMap(sortConfigs, function (sortConfig) {
        return _this6.getFirstCellSettings(sortConfig.column);
      }));

      // Append spareRows
      for (var _visualRowIndex = indexesWithData.length; _visualRowIndex < numberOfRows; _visualRowIndex += 1) {
        indexesWithData.push([_visualRowIndex].concat(getDataForSortedColumns(_visualRowIndex)));
      }
      var indexesAfter = arrayMap(indexesWithData, function (indexWithData) {
        return indexWithData[0];
      });
      var indexMapping = new Map(arrayMap(indexesBefore, function (indexBefore, indexInsideArray) {
        return [indexBefore, indexesAfter[indexInsideArray]];
      }));
      var newIndexesSequence = arrayMap(this.hot.rowIndexMapper.getIndexesSequence(), function (physicalIndex) {
        if (indexMapping.has(physicalIndex)) {
          return indexMapping.get(physicalIndex);
        }
        return physicalIndex;
      });
      this.hot.rowIndexMapper.setIndexesSequence(newIndexesSequence);
    }

    /**
     * Load saved settings or sort by predefined plugin configuration.
     *
     * @private
     */
  }, {
    key: "loadOrSortBySettings",
    value: function loadOrSortBySettings() {
      var storedAllSortSettings = this.getAllSavedSortSettings();
      if (isObject(storedAllSortSettings)) {
        this.sortBySettings(storedAllSortSettings);
      } else {
        var allSortSettings = this.hot.getSettings()[this.pluginKey];
        this.sortBySettings(allSortSettings);
      }
    }

    /**
     * Sort the table by provided configuration.
     *
     * @private
     * @param {object} allSortSettings All sort config settings. Object may contain `initialConfig`, `indicator`,
     * `sortEmptyCells`, `headerAction` and `compareFunctionFactory` properties.
     */
  }, {
    key: "sortBySettings",
    value: function sortBySettings(allSortSettings) {
      if (isObject(allSortSettings)) {
        this.columnStatesManager.updateAllColumnsProperties(allSortSettings);
        var initialConfig = allSortSettings.initialConfig;
        if (Array.isArray(initialConfig) || isObject(initialConfig)) {
          this.sort(initialConfig);
        }
      } else {
        // Extra render for headers. Their width may change.
        this.hot.render();
      }
    }

    /**
     * Callback for the `onAfterGetColHeader` hook. Adds column sorting CSS classes.
     *
     * @private
     * @param {number} column Visual column index.
     * @param {Element} TH TH HTML element.
     */
  }, {
    key: "onAfterGetColHeader",
    value: function onAfterGetColHeader(column, TH) {
      var headerSpanElement = getHeaderSpanElement(TH);
      if (isFirstLevelColumnHeader(column, TH) === false || headerSpanElement === null) {
        return;
      }
      var pluginSettingsForColumn = this.getFirstCellSettings(column)[this.pluginKey];
      var showSortIndicator = pluginSettingsForColumn.indicator;
      var headerActionEnabled = pluginSettingsForColumn.headerAction;
      this.updateHeaderClasses(headerSpanElement, this.columnStatesManager, column, showSortIndicator, headerActionEnabled);
    }

    /**
     * Update header classes.
     *
     * @private
     * @param {HTMLElement} headerSpanElement Header span element.
     * @param {...*} args Extra arguments for helpers.
     */
  }, {
    key: "updateHeaderClasses",
    value: function updateHeaderClasses(headerSpanElement) {
      removeClass(headerSpanElement, getClassesToRemove(headerSpanElement));
      if (this.enabled !== false) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        addClass(headerSpanElement, getClassesToAdd.apply(void 0, args));
      }
    }

    /**
     * Overwriting base plugin's `onUpdateSettings` method. Please keep in mind that `onAfterUpdateSettings` isn't called
     * for `updateSettings` in specific situations.
     *
     * @private
     * @param {object} newSettings New settings object.
     */
  }, {
    key: "onUpdateSettings",
    value: function onUpdateSettings(newSettings) {
      _get(_getPrototypeOf(ColumnSorting.prototype), "onUpdateSettings", this).call(this);
      if (this.columnMetaCache !== null) {
        // Column meta cache base on settings, thus we should re-init the map.
        this.columnMetaCache.init(this.hot.columnIndexMapper.getNumberOfIndexes());
      }
      if (isDefined(newSettings[this.pluginKey])) {
        this.sortBySettings(newSettings[this.pluginKey]);
      }
    }

    /**
     * Callback for the `afterLoadData` hook.
     *
     * @private
     * @param {boolean} initialLoad Flag that determines whether the data has been loaded during the initialization.
     */
  }, {
    key: "onAfterLoadData",
    value: function onAfterLoadData(initialLoad) {
      if (initialLoad === true) {
        // TODO: Workaround? It should be refactored / described.
        if (this.hot.view) {
          this.loadOrSortBySettings();
        }
      }
    }

    /**
     * Indicates if clickable header was clicked.
     *
     * @private
     * @param {MouseEvent} event The `mousedown` event.
     * @param {number} column Visual column index.
     * @returns {boolean}
     */
  }, {
    key: "wasClickableHeaderClicked",
    value: function wasClickableHeaderClicked(event, column) {
      var pluginSettingsForColumn = this.getFirstCellSettings(column)[this.pluginKey];
      var headerActionEnabled = pluginSettingsForColumn.headerAction;
      return headerActionEnabled && event.target.nodeName === 'SPAN';
    }

    /**
     * Changes the behavior of selection / dragging.
     *
     * @private
     * @param {MouseEvent} event The `mousedown` event.
     * @param {CellCoords} coords Visual coordinates.
     * @param {HTMLElement} TD The cell element.
     * @param {object} controller An object with properties `row`, `column` and `cell`. Each property contains
     *                            a boolean value that allows or disallows changing the selection for that particular area.
     */
  }, {
    key: "onBeforeOnCellMouseDown",
    value: function onBeforeOnCellMouseDown(event, coords, TD, controller) {
      if (wasHeaderClickedProperly(coords.row, coords.col, event) === false) {
        return;
      }
      if (this.wasClickableHeaderClicked(event, coords.col) && this.hot.getShortcutManager().isCtrlPressed()) {
        controller.column = true;
      }
    }

    /**
     * Callback for the `onAfterOnCellMouseDown` hook.
     *
     * @private
     * @param {Event} event Event which are provided by hook.
     * @param {CellCoords} coords Visual coords of the selected cell.
     */
  }, {
    key: "onAfterOnCellMouseDown",
    value: function onAfterOnCellMouseDown(event, coords) {
      if (wasHeaderClickedProperly(coords.row, coords.col, event) === false) {
        return;
      }
      if (this.wasClickableHeaderClicked(event, coords.col)) {
        if (this.hot.getShortcutManager().isCtrlPressed()) {
          this.hot.deselectCell();
          this.hot.selectColumns(coords.col);
        }
        this.sort(this.getColumnNextConfig(coords.col));
      }
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var _this$columnStatesMan;
      // TODO: Probably not supported yet by ESLint: https://github.com/eslint/eslint/issues/11045
      // eslint-disable-next-line no-unused-expressions
      (_this$columnStatesMan = this.columnStatesManager) === null || _this$columnStatesMan === void 0 ? void 0 : _this$columnStatesMan.destroy();
      _get(_getPrototypeOf(ColumnSorting.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }]);
  return ColumnSorting;
}(BasePlugin);