"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.MultiColumnSorting = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _columnSorting = require("../columnSorting");
var _sortService = require("../columnSorting/sortService");
var _utils = require("../columnSorting/utils");
var _element = require("../../helpers/dom/element");
var _rootComparator = require("./rootComparator");
var _utils2 = require("./utils");
var _domHelpers = require("./domHelpers");
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
var PLUGIN_KEY = 'multiColumnSorting';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 170;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var APPEND_COLUMN_CONFIG_STRATEGY = 'append';
var CONFLICTED_PLUGIN_KEY = 'columnSorting';
(0, _sortService.registerRootComparator)(PLUGIN_KEY, _rootComparator.rootComparator);

/**
 * @plugin MultiColumnSorting
 * @class MultiColumnSorting
 *
 * @description
 * This plugin sorts the view by columns (but does not sort the data source!). To enable the plugin, set the
 * {@link Options#multiColumnSorting} property to the correct value (see the examples below).
 *
 * @example
 * ```js
 * // as boolean
 * multiColumnSorting: true
 *
 * // as an object with initial sort config (sort ascending for column at index 1 and then sort descending for column at index 0)
 * multiColumnSorting: {
 *   initialConfig: [{
 *     column: 1,
 *     sortOrder: 'asc'
 *   }, {
 *     column: 0,
 *     sortOrder: 'desc'
 *   }]
 * }
 *
 * // as an object which define specific sorting options for all columns
 * multiColumnSorting: {
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
 * // please take a look at documentation of `column` property: {@link Options#columns}
 * columns: [{
 *   multiColumnSorting: {
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
var MultiColumnSorting = /*#__PURE__*/function (_ColumnSorting) {
  _inherits(MultiColumnSorting, _ColumnSorting);
  var _super = _createSuper(MultiColumnSorting);
  function MultiColumnSorting(hotInstance) {
    var _this;
    _classCallCheck(this, MultiColumnSorting);
    _this = _super.call(this, hotInstance);
    /**
     * Main settings key designed for the plugin.
     *
     * @private
     * @type {string}
     */
    _this.pluginKey = PLUGIN_KEY;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the Handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link MultiColumnSorting#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(MultiColumnSorting, [{
    key: "isEnabled",
    value: function isEnabled() {
      return _get(_getPrototypeOf(MultiColumnSorting.prototype), "isEnabled", this).call(this);
    }

    /**
     * Enables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      if (!this.enabled && this.hot.getSettings()[this.pluginKey] && this.hot.getSettings()[CONFLICTED_PLUGIN_KEY]) {
        (0, _utils2.warnAboutPluginsConflict)();
      }
      _get(_getPrototypeOf(MultiColumnSorting.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      _get(_getPrototypeOf(MultiColumnSorting.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Sorts the table by chosen columns and orders.
     *
     * @param {undefined|object|Array} sortConfig Single column sort configuration or full sort configuration (for all sorted columns).
     * The configuration object contains `column` and `sortOrder` properties. First of them contains visual column index, the second one contains
     * sort order (`asc` for ascending, `desc` for descending).
     *
     * **Note**: Please keep in mind that every call of `sort` function set an entirely new sort order. Previous sort configs aren't preserved.
     *
     * @example
     * ```js
     * // sort ascending first visual column
     * hot.getPlugin('multiColumnSorting').sort({ column: 0, sortOrder: 'asc' });
     *
     * // sort first two visual column in the defined sequence
     * hot.getPlugin('multiColumnSorting').sort([{
     *   column: 1, sortOrder: 'asc'
     * }, {
     *   column: 0, sortOrder: 'desc'
     * }]);
     * ```
     *
     * @fires Hooks#beforeColumnSort
     * @fires Hooks#afterColumnSort
     */
  }, {
    key: "sort",
    value: function sort(sortConfig) {
      _get(_getPrototypeOf(MultiColumnSorting.prototype), "sort", this).call(this, sortConfig);
    }

    /**
     * Clear the sort performed on the table.
     */
  }, {
    key: "clearSort",
    value: function clearSort() {
      _get(_getPrototypeOf(MultiColumnSorting.prototype), "clearSort", this).call(this);
    }

    /**
     * Checks if the table is sorted (any column have to be sorted).
     *
     * @returns {boolean}
     */
  }, {
    key: "isSorted",
    value: function isSorted() {
      return _get(_getPrototypeOf(MultiColumnSorting.prototype), "isSorted", this).call(this);
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
      return _get(_getPrototypeOf(MultiColumnSorting.prototype), "getSortConfig", this).call(this, column);
    }

    /**
     * @description
     * Warn: Useful mainly for providing server side sort implementation (see in the example below). It doesn't sort the data set. It just sets sort configuration for all sorted columns.
     * Note: Please keep in mind that this method doesn't re-render the table.
     *
     * @example
     * ```js
     * beforeColumnSort: function(currentSortConfig, destinationSortConfigs) {
     *   const columnSortPlugin = this.getPlugin('multiColumnSorting');
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
      _get(_getPrototypeOf(MultiColumnSorting.prototype), "setSortConfig", this).call(this, sortConfig);
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
        return sortConfig;
      }
      return [sortConfig];
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
      var _get2;
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      (_get2 = _get(_getPrototypeOf(MultiColumnSorting.prototype), "updateHeaderClasses", this)).call.apply(_get2, [this, headerSpanElement].concat(args));
      (0, _element.removeClass)(headerSpanElement, (0, _domHelpers.getClassesToRemove)(headerSpanElement));
      if (this.enabled !== false) {
        (0, _element.addClass)(headerSpanElement, _domHelpers.getClassesToAdd.apply(void 0, args));
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
      if (this.hot.getSettings()[this.pluginKey] && this.hot.getSettings()[CONFLICTED_PLUGIN_KEY]) {
        (0, _utils2.warnAboutPluginsConflict)();
      }
      _get(_getPrototypeOf(MultiColumnSorting.prototype), "onUpdateSettings", this).call(this, newSettings);
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
      if ((0, _utils.wasHeaderClickedProperly)(coords.row, coords.col, event) === false) {
        return;
      }
      if (this.wasClickableHeaderClicked(event, coords.col)) {
        if (this.hot.getShortcutManager().isCtrlPressed()) {
          this.hot.deselectCell();
          this.hot.selectColumns(coords.col);
          this.sort(this.getNextSortConfig(coords.col, APPEND_COLUMN_CONFIG_STRATEGY));
        } else {
          this.sort(this.getColumnNextConfig(coords.col));
        }
      }
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
  return MultiColumnSorting;
}(_columnSorting.ColumnSorting);
exports.MultiColumnSorting = MultiColumnSorting;