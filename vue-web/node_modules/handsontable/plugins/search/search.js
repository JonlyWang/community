"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
exports.__esModule = true;
exports.Search = exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = void 0;
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.array.join.js");
var _base = require("../base");
var _object = require("../../helpers/object");
var _number = require("../../helpers/number");
var _mixed = require("../../helpers/mixed");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
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
var PLUGIN_KEY = 'search';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 190;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var DEFAULT_SEARCH_RESULT_CLASS = 'htSearchResult';
var DEFAULT_CALLBACK = function DEFAULT_CALLBACK(instance, row, col, data, testResult) {
  instance.getCellMeta(row, col).isSearchResult = testResult;
};
var DEFAULT_QUERY_METHOD = function DEFAULT_QUERY_METHOD(query, value, cellProperties) {
  if ((0, _mixed.isUndefined)(query) || query === null || !query.toLocaleLowerCase || query.length === 0) {
    return false;
  }
  if ((0, _mixed.isUndefined)(value) || value === null) {
    return false;
  }
  return value.toString().toLocaleLowerCase(cellProperties.locale).indexOf(query.toLocaleLowerCase(cellProperties.locale)) !== -1;
};

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin Search
 * @class Search
 *
 * @description
 * The search plugin provides an easy interface to search data across Handsontable.
 *
 * In order to enable search mechanism, {@link Options#search} option must be set to `true`.
 *
 * @example
 * ```js
 * // as boolean
 * search: true
 * // as a object with one or more options
 * search: {
 *   callback: myNewCallbackFunction,
 *   queryMethod: myNewQueryMethod,
 *   searchResultClass: 'customClass'
 * }
 *
 * // Access to search plugin instance:
 * const searchPlugin = hot.getPlugin('search');
 *
 * // Set callback programmatically:
 * searchPlugin.setCallback(myNewCallbackFunction);
 * // Set query method programmatically:
 * searchPlugin.setQueryMethod(myNewQueryMethod);
 * // Set search result cells class programmatically:
 * searchPlugin.setSearchResultClass(customClass);
 * ```
 */
var Search = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Search, _BasePlugin);
  var _super = _createSuper(Search);
  function Search(hotInstance) {
    var _this;
    _classCallCheck(this, Search);
    _this = _super.call(this, hotInstance);
    /**
     * Function called during querying for each cell from the {@link DataMap}.
     *
     * @private
     * @type {Function}
     */
    _this.callback = DEFAULT_CALLBACK;
    /**
     * Query function is responsible for determining whether a query matches the value stored in a cell.
     *
     * @private
     * @type {Function}
     */
    _this.queryMethod = DEFAULT_QUERY_METHOD;
    /**
     * Class name added to each cell that belongs to the searched query.
     *
     * @private
     * @type {string}
     */
    _this.searchResultClass = DEFAULT_SEARCH_RESULT_CLASS;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link AutoRowSize#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(Search, [{
    key: "isEnabled",
    value: function isEnabled() {
      return this.hot.getSettings()[PLUGIN_KEY];
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
      var searchSettings = this.hot.getSettings()[PLUGIN_KEY];
      this.updatePluginSettings(searchSettings);
      this.addHook('beforeRenderer', function () {
        return _this2.onBeforeRenderer.apply(_this2, arguments);
      });
      _get(_getPrototypeOf(Search.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var _this3 = this;
      var beforeRendererCallback = function beforeRendererCallback() {
        return _this3.onBeforeRenderer.apply(_this3, arguments);
      };
      this.hot.addHook('beforeRenderer', beforeRendererCallback);
      this.hot.addHookOnce('afterViewRender', function () {
        _this3.hot.removeHook('beforeRenderer', beforeRendererCallback);
      });
      _get(_getPrototypeOf(Search.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`search`](@/api/options.md#search)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(Search.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Makes the query.
     *
     * @param {string} queryStr Value to be search.
     * @param {Function} [callback] Callback function performed on cells with values which matches to the searched query.
     * @param {Function} [queryMethod] Query function responsible for determining whether a query matches the value stored in a cell.
     * @returns {object[]} Return an array of objects with `row`, `col`, `data` properties or empty array.
     */
  }, {
    key: "query",
    value: function query(queryStr) {
      var _this4 = this;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getCallback();
      var queryMethod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getQueryMethod();
      var rowCount = this.hot.countRows();
      var colCount = this.hot.countCols();
      var queryResult = [];
      var instance = this.hot;
      (0, _number.rangeEach)(0, rowCount - 1, function (rowIndex) {
        (0, _number.rangeEach)(0, colCount - 1, function (colIndex) {
          var cellData = _this4.hot.getDataAtCell(rowIndex, colIndex);
          var cellProperties = _this4.hot.getCellMeta(rowIndex, colIndex);
          var cellCallback = cellProperties.search.callback || callback;
          var cellQueryMethod = cellProperties.search.queryMethod || queryMethod;
          var testResult = cellQueryMethod(queryStr, cellData, cellProperties);
          if (testResult) {
            var singleResult = {
              row: rowIndex,
              col: colIndex,
              data: cellData
            };
            queryResult.push(singleResult);
          }
          if (cellCallback) {
            cellCallback(instance, rowIndex, colIndex, cellData, testResult);
          }
        });
      });
      return queryResult;
    }

    /**
     * Gets the callback function.
     *
     * @returns {Function} Return the callback function.
     */
  }, {
    key: "getCallback",
    value: function getCallback() {
      return this.callback;
    }

    /**
     * Sets the callback function. This function will be called during querying for each cell.
     *
     * @param {Function} newCallback A callback function.
     */
  }, {
    key: "setCallback",
    value: function setCallback(newCallback) {
      this.callback = newCallback;
    }

    /**
     * Gets the query method function.
     *
     * @returns {Function} Return the query method.
     */
  }, {
    key: "getQueryMethod",
    value: function getQueryMethod() {
      return this.queryMethod;
    }

    /**
     * Sets the query method function. The function is responsible for determining whether a query matches the value stored in a cell.
     *
     * @param {Function} newQueryMethod A function with specific match logic.
     */
  }, {
    key: "setQueryMethod",
    value: function setQueryMethod(newQueryMethod) {
      this.queryMethod = newQueryMethod;
    }

    /**
     * Gets search result cells class name.
     *
     * @returns {string} Return the cell class name.
     */
  }, {
    key: "getSearchResultClass",
    value: function getSearchResultClass() {
      return this.searchResultClass;
    }

    /**
     * Sets search result cells class name. This class name will be added to each cell that belongs to the searched query.
     *
     * @param {string} newElementClass CSS class name.
     */
  }, {
    key: "setSearchResultClass",
    value: function setSearchResultClass(newElementClass) {
      this.searchResultClass = newElementClass;
    }

    /**
     * Updates the settings of the plugin.
     *
     * @param {object} searchSettings The plugin settings, taken from Handsontable configuration.
     * @private
     */
  }, {
    key: "updatePluginSettings",
    value: function updatePluginSettings(searchSettings) {
      if ((0, _object.isObject)(searchSettings)) {
        if (searchSettings.searchResultClass) {
          this.setSearchResultClass(searchSettings.searchResultClass);
        }
        if (searchSettings.queryMethod) {
          this.setQueryMethod(searchSettings.queryMethod);
        }
        if (searchSettings.callback) {
          this.setCallback(searchSettings.callback);
        }
      }
    }

    /**
     * The `beforeRenderer` hook callback.
     *
     * @private
     * @param {HTMLTableCellElement} TD The rendered `TD` element.
     * @param {number} row Visual row index.
     * @param {number} col Visual column index.
     * @param {string|number} prop Column property name or a column index, if datasource is an array of arrays.
     * @param {string} value Value of the rendered cell.
     * @param {object} cellProperties Object containing the cell's properties.
     */
  }, {
    key: "onBeforeRenderer",
    value: function onBeforeRenderer(TD, row, col, prop, value, cellProperties) {
      // TODO: #4972
      var className = cellProperties.className || [];
      var classArray = [];
      if (typeof className === 'string') {
        classArray = className.split(' ');
      } else {
        var _classArray;
        (_classArray = classArray).push.apply(_classArray, _toConsumableArray(className));
      }
      if (this.isEnabled() && cellProperties.isSearchResult) {
        if (!classArray.includes(this.searchResultClass)) {
          classArray.push("".concat(this.searchResultClass));
        }
      } else if (classArray.includes(this.searchResultClass)) {
        classArray.splice(classArray.indexOf(this.searchResultClass), 1);
      }
      cellProperties.className = classArray.join(' ');
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(Search.prototype), "destroy", this).call(this);
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
  return Search;
}(_base.BasePlugin);
exports.Search = Search;