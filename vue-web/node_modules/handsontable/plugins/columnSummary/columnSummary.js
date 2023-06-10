"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
exports.__esModule = true;
exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = exports.ColumnSummary = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.get-prototype-of.js");
var _base = require("../base");
var _object = require("../../helpers/object");
var _endpoints = _interopRequireDefault(require("./endpoints"));
var _templateLiteralTag = require("../../helpers/templateLiteralTag");
var _utils = require("./utils");
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
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
var PLUGIN_KEY = 'columnSummary';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 220;

/**
 * @plugin ColumnSummary
 * @class ColumnSummary
 *
 * @description
 * The `ColumnSummary` plugin lets you [easily summarize your columns](@/guides/columns/column-summary.md).
 *
 * You can use the [built-in summary functions](@/guides/columns/column-summary.md#built-in-summary-functions),
 * or implement a [custom summary function](@/guides/columns/column-summary.md#implementing-a-custom-summary-function).
 *
 * For each column summary, you can set the following configuration options:
 *
 * | Option | Required | Type | Default | Description |
 * |---|---|---|---|---|
 * | `sourceColumn` | No | Number | Same as `destinationColumn` | [Selects a column to summarize](@/guides/columns/column-summary.md#step-2-select-cells-that-you-want-to-summarize) |
 * | `ranges` | No | Array | - | [Selects ranges of rows to summarize](@/guides/columns/column-summary.md#step-2-select-cells-that-you-want-to-summarize) |
 * | `type` | Yes | String | - | [Sets a summary function](@/guides/columns/column-summary.md#step-3-calculate-your-summary) |
 * | `destinationRow` | Yes | Number | - | [Sets the destination cell's row coordinate](@/guides/columns/column-summary.md#step-4-provide-the-destination-cell-s-coordinates) |
 * | `destinationColumn` | Yes | Number | - | [Sets the destination cell's column coordinate](@/guides/columns/column-summary.md#step-4-provide-the-destination-cell-s-coordinates) |
 * | `forceNumeric` | No | Boolean | `false` | [Forces the summary to treat non-numerics as numerics](@/guides/columns/column-summary.md#forcing-numeric-values) |
 * | `reversedRowCoords` | No | Boolean | `false` | [Reverses row coordinates](@/guides/columns/column-summary.md#step-5-make-room-for-the-destination-cell) |
 * | `suppressDataTypeErrors` | No | Boolean | `true` | [Suppresses data type errors](@/guides/columns/column-summary.md#throwing-data-type-errors) |
 * | `readOnly` | No | Boolean | `true` | Makes summary cell read-only |
 * | `roundFloat` | No | Number | - | [Rounds summary result](@/guides/columns/column-summary.md#rounding-a-column-summary-result) |
 * | `customFunction` | No | Function | - | [Lets you add a custom summary function](@/guides/columns/column-summary.md#implementing-a-custom-summary-function) |
 *
 * @example
 * ::: only-for javascript
 * ```js
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: getData(),
 *   colHeaders: true,
 *   rowHeaders: true,
 *   columnSummary: [
 *     {
 *       type: 'min',
 *       destinationRow: 4,
 *       destinationColumn: 1,
 *     },
 *     {
 *       type: 'max',
 *       destinationRow: 0,
 *       destinationColumn: 3,
 *       reversedRowCoords: true
 *     },
 *     {
 *       type: 'sum',
 *       destinationRow: 4,
 *       destinationColumn: 5,
 *       forceNumeric: true
 *     }
 *   ]
 * });
 * ```
 * :::
 *
 * ::: only-for react
 * ```jsx
 * <HotTable
 *   data={getData()}
 *   colHeaders={true}
 *   rowHeaders={true}
 *   columnSummary={[
 *     {
 *       type: 'min',
 *       destinationRow: 4,
 *       destinationColumn: 1,
 *     },
 *     {
 *       type: 'max',
 *       destinationRow: 0,
 *       destinationColumn: 3,
 *       reversedRowCoords: true
 *     },
 *     {
 *       type: 'sum',
 *       destinationRow: 4,
 *       destinationColumn: 5,
 *       forceNumeric: true
 *     }
 *   ]}
 * />
 * ```
 * :::
 */
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var ColumnSummary = /*#__PURE__*/function (_BasePlugin) {
  _inherits(ColumnSummary, _BasePlugin);
  var _super = _createSuper(ColumnSummary);
  function ColumnSummary(hotInstance) {
    var _this;
    _classCallCheck(this, ColumnSummary);
    _this = _super.call(this, hotInstance);
    /**
     * The Endpoints class instance. Used to make all endpoint-related operations.
     *
     * @private
     * @type {null|Endpoints}
     */
    _this.endpoints = null;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link ColumnSummary#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(ColumnSummary, [{
    key: "isEnabled",
    value: function isEnabled() {
      return !!this.hot.getSettings()[PLUGIN_KEY];
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
      this.settings = this.hot.getSettings()[PLUGIN_KEY];
      this.endpoints = new _endpoints.default(this, this.settings);
      this.addHook('afterInit', function () {
        return _this2.onAfterInit.apply(_this2, arguments);
      });
      this.addHook('afterChange', function () {
        return _this2.onAfterChange.apply(_this2, arguments);
      });
      this.addHook('beforeCreateRow', function (index, amount, source) {
        return _this2.endpoints.resetSetupBeforeStructureAlteration('insert_row', index, amount, null, source);
      }); // eslint-disable-line max-len
      this.addHook('beforeCreateCol', function (index, amount, source) {
        return _this2.endpoints.resetSetupBeforeStructureAlteration('insert_col', index, amount, null, source);
      }); // eslint-disable-line max-len
      this.addHook('beforeRemoveRow', function () {
        var _this2$endpoints;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return (_this2$endpoints = _this2.endpoints).resetSetupBeforeStructureAlteration.apply(_this2$endpoints, ['remove_row'].concat(args));
      });
      this.addHook('beforeRemoveCol', function () {
        var _this2$endpoints2;
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return (_this2$endpoints2 = _this2.endpoints).resetSetupBeforeStructureAlteration.apply(_this2$endpoints2, ['remove_col'].concat(args));
      });
      this.addHook('afterCreateRow', function (index, amount, source) {
        return _this2.endpoints.resetSetupAfterStructureAlteration('insert_row', index, amount, null, source);
      }); // eslint-disable-line max-len
      this.addHook('afterCreateCol', function (index, amount, source) {
        return _this2.endpoints.resetSetupAfterStructureAlteration('insert_col', index, amount, null, source);
      }); // eslint-disable-line max-len
      this.addHook('afterRemoveRow', function () {
        var _this2$endpoints3;
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        return (_this2$endpoints3 = _this2.endpoints).resetSetupAfterStructureAlteration.apply(_this2$endpoints3, ['remove_row'].concat(args));
      });
      this.addHook('afterRemoveCol', function () {
        var _this2$endpoints4;
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return (_this2$endpoints4 = _this2.endpoints).resetSetupAfterStructureAlteration.apply(_this2$endpoints4, ['remove_col'].concat(args));
      });
      this.addHook('afterRowMove', function () {
        return _this2.onAfterRowMove.apply(_this2, arguments);
      });
      _get(_getPrototypeOf(ColumnSummary.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.endpoints = null;
      this.settings = null;
      this.currentEndpoint = null;
    }

    /**
     * Calculates math for a single endpoint.
     *
     * @private
     * @param {object} endpoint Contains information about the endpoint.
     */
  }, {
    key: "calculate",
    value: function calculate(endpoint) {
      switch (endpoint.type.toLowerCase()) {
        case 'sum':
          endpoint.result = this.calculateSum(endpoint);
          break;
        case 'min':
          endpoint.result = this.calculateMinMax(endpoint, endpoint.type);
          break;
        case 'max':
          endpoint.result = this.calculateMinMax(endpoint, endpoint.type);
          break;
        case 'count':
          endpoint.result = this.countEntries(endpoint);
          break;
        case 'average':
          endpoint.result = this.calculateAverage(endpoint);
          break;
        case 'custom':
          endpoint.result = endpoint.customFunction.call(this, endpoint);
          break;
        default:
          break;
      }
    }

    /**
     * Calculates sum of the values contained in ranges provided in the plugin config.
     *
     * @private
     * @param {object} endpoint Contains the endpoint information.
     * @returns {number} Sum for the selected range.
     */
  }, {
    key: "calculateSum",
    value: function calculateSum(endpoint) {
      var _this3 = this;
      var sum = 0;
      (0, _object.objectEach)(endpoint.ranges, function (range) {
        sum += _this3.getPartialSum(range, endpoint.sourceColumn);
      });
      return sum;
    }

    /**
     * Returns partial sum of values from a single row range.
     *
     * @private
     * @param {Array} rowRange Range for the sum.
     * @param {number} col Column index.
     * @returns {number} The partial sum.
     */
  }, {
    key: "getPartialSum",
    value: function getPartialSum(rowRange, col) {
      var sum = 0;
      var i = rowRange[1] || rowRange[0];
      var cellValue = null;
      var biggestDecimalPlacesCount = 0;
      do {
        cellValue = this.getCellValue(i, col);
        cellValue = (0, _utils.isNullishOrNaN)(cellValue) ? null : cellValue;
        if (cellValue !== null) {
          var decimalPlaces = ("".concat(cellValue).split('.')[1] || []).length || 1;
          if (decimalPlaces > biggestDecimalPlacesCount) {
            biggestDecimalPlacesCount = decimalPlaces;
          }
        }
        sum += cellValue || 0;
        i -= 1;
      } while (i >= rowRange[0]);

      // Workaround for e.g. 802.2 + 1.1 = 803.3000000000001
      return Math.round(sum * Math.pow(10, biggestDecimalPlacesCount)) / Math.pow(10, biggestDecimalPlacesCount);
    }

    /**
     * Calculates the minimal value for the selected ranges.
     *
     * @private
     * @param {object} endpoint Contains the endpoint information.
     * @param {string} type `'min'` or `'max'`.
     * @returns {number} Min or Max value.
     */
  }, {
    key: "calculateMinMax",
    value: function calculateMinMax(endpoint, type) {
      var _this4 = this;
      var result = null;
      (0, _object.objectEach)(endpoint.ranges, function (range) {
        var partialResult = _this4.getPartialMinMax(range, endpoint.sourceColumn, type);
        if (result === null && partialResult !== null) {
          result = partialResult;
        }
        if (partialResult !== null) {
          switch (type) {
            case 'min':
              result = Math.min(result, partialResult);
              break;
            case 'max':
              result = Math.max(result, partialResult);
              break;
            default:
              break;
          }
        }
      });
      return result === null ? 'Not enough data' : result;
    }

    /**
     * Returns a local minimum of the provided sub-range.
     *
     * @private
     * @param {Array} rowRange Range for the calculation.
     * @param {number} col Column index.
     * @param {string} type `'min'` or `'max'`.
     * @returns {number|null} Min or max value.
     */
  }, {
    key: "getPartialMinMax",
    value: function getPartialMinMax(rowRange, col, type) {
      var result = null;
      var i = rowRange[1] || rowRange[0];
      var cellValue;
      do {
        cellValue = this.getCellValue(i, col);
        cellValue = (0, _utils.isNullishOrNaN)(cellValue) ? null : cellValue;
        if (result === null) {
          result = cellValue;
        } else if (cellValue !== null) {
          switch (type) {
            case 'min':
              result = Math.min(result, cellValue);
              break;
            case 'max':
              result = Math.max(result, cellValue);
              break;
            default:
              break;
          }
        }
        i -= 1;
      } while (i >= rowRange[0]);
      return result;
    }

    /**
     * Counts empty cells in the provided row range.
     *
     * @private
     * @param {Array} rowRange Row range for the calculation.
     * @param {number} col Column index.
     * @returns {number} Empty cells count.
     */
  }, {
    key: "countEmpty",
    value: function countEmpty(rowRange, col) {
      var cellValue;
      var counter = 0;
      var i = rowRange[1] || rowRange[0];
      do {
        cellValue = this.getCellValue(i, col);
        cellValue = (0, _utils.isNullishOrNaN)(cellValue) ? null : cellValue;
        if (cellValue === null) {
          counter += 1;
        }
        i -= 1;
      } while (i >= rowRange[0]);
      return counter;
    }

    /**
     * Counts non-empty cells in the provided row range.
     *
     * @private
     * @param {object} endpoint Contains the endpoint information.
     * @returns {number} Entry count.
     */
  }, {
    key: "countEntries",
    value: function countEntries(endpoint) {
      var _this5 = this;
      var result = 0;
      var ranges = endpoint.ranges;
      (0, _object.objectEach)(ranges, function (range) {
        var partial = range[1] === void 0 ? 1 : range[1] - range[0] + 1;
        var emptyCount = _this5.countEmpty(range, endpoint.sourceColumn);
        result += partial;
        result -= emptyCount;
      });
      return result;
    }

    /**
     * Calculates the average value from the cells in the range.
     *
     * @private
     * @param {object} endpoint Contains the endpoint information.
     * @returns {number} Avarage value.
     */
  }, {
    key: "calculateAverage",
    value: function calculateAverage(endpoint) {
      var sum = this.calculateSum(endpoint);
      var entriesCount = this.countEntries(endpoint);
      return sum / entriesCount;
    }

    /**
     * Returns a cell value, taking into consideration a basic validation.
     *
     * @private
     * @param {number} row Row index.
     * @param {number} col Column index.
     * @returns {string} The cell value.
     */
  }, {
    key: "getCellValue",
    value: function getCellValue(row, col) {
      var visualRowIndex = this.hot.toVisualRow(row);
      var visualColumnIndex = this.hot.toVisualColumn(col);
      var cellValue = this.hot.getSourceDataAtCell(row, col);
      var cellClassName = '';
      if (visualRowIndex !== null && visualColumnIndex !== null) {
        cellClassName = this.hot.getCellMeta(visualRowIndex, visualColumnIndex).className || '';
      }
      if (cellClassName.indexOf('columnSummaryResult') > -1) {
        return null;
      }
      if (this.endpoints.currentEndpoint.forceNumeric) {
        if (typeof cellValue === 'string') {
          cellValue = cellValue.replace(/,/, '.');
        }
        cellValue = parseFloat(cellValue);
      }
      if (isNaN(cellValue)) {
        if (!this.endpoints.currentEndpoint.suppressDataTypeErrors) {
          throw new Error((0, _templateLiteralTag.toSingleLine)(_templateObject || (_templateObject = _taggedTemplateLiteral(["ColumnSummary plugin: cell at (", ", ", ") is not in a \n          numeric format. Cannot do the calculation."], ["ColumnSummary plugin: cell at (", ", ", ") is not in a\\x20\n          numeric format. Cannot do the calculation."])), row, col));
        }
      }
      return cellValue;
    }

    /**
     * `afterInit` hook callback.
     *
     * @private
     */
  }, {
    key: "onAfterInit",
    value: function onAfterInit() {
      this.endpoints.endpoints = this.endpoints.parseSettings();
      this.endpoints.refreshAllEndpoints(true);
    }

    /**
     * `afterChange` hook callback.
     *
     * @private
     * @param {Array} changes 2D array containing information about each of the edited cells.
     * @param {string} source The string that identifies source of changes.
     */
  }, {
    key: "onAfterChange",
    value: function onAfterChange(changes, source) {
      if (changes && source !== 'ColumnSummary.reset' && source !== 'ColumnSummary.set' && source !== 'loadData') {
        this.endpoints.refreshChangedEndpoints(changes);
      }
    }

    /**
     * `beforeRowMove` hook callback.
     *
     * @private
     * @param {Array} rows Array of visual row indexes to be moved.
     * @param {number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](@/guides/rows/row-moving.md).
     */
  }, {
    key: "onAfterRowMove",
    value: function onAfterRowMove(rows, finalIndex) {
      this.endpoints.resetSetupBeforeStructureAlteration('move_row', rows[0], rows.length, rows, this.pluginName);
      this.endpoints.resetSetupAfterStructureAlteration('move_row', finalIndex, rows.length, rows, this.pluginName);
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
  return ColumnSummary;
}(_base.BasePlugin);
exports.ColumnSummary = ColumnSummary;