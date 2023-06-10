function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
import { BasePlugin } from "../base/index.mjs";
import Hooks from "../../pluginHooks.mjs";
import MergedCellsCollection from "./cellsCollection.mjs";
import MergedCellCoords from "./cellCoords.mjs";
import AutofillCalculations from "./calculations/autofill.mjs";
import SelectionCalculations from "./calculations/selection.mjs";
import toggleMergeItem from "./contextMenuItem/toggleMerge.mjs";
import { arrayEach } from "../../helpers/array.mjs";
import { isObject, clone } from "../../helpers/object.mjs";
import { warn } from "../../helpers/console.mjs";
import { rangeEach } from "../../helpers/number.mjs";
import { applySpanProperties } from "./utils.mjs";
Hooks.getSingleton().register('beforeMergeCells');
Hooks.getSingleton().register('afterMergeCells');
Hooks.getSingleton().register('beforeUnmergeCells');
Hooks.getSingleton().register('afterUnmergeCells');
export var PLUGIN_KEY = 'mergeCells';
export var PLUGIN_PRIORITY = 150;
var privatePool = new WeakMap();
var SHORTCUTS_GROUP = PLUGIN_KEY;

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin MergeCells
 * @class MergeCells
 *
 * @description
 * Plugin, which allows merging cells in the table (using the initial configuration, API or context menu).
 *
 * @example
 *
 * ::: only-for javascript
 * ```js
 * const hot = new Handsontable(document.getElementById('example'), {
 *  data: getData(),
 *  mergeCells: [
 *    {row: 0, col: 3, rowspan: 3, colspan: 3},
 *    {row: 2, col: 6, rowspan: 2, colspan: 2},
 *    {row: 4, col: 8, rowspan: 3, colspan: 3}
 *  ],
 * ```
 * :::
 *
 * ::: only-for react
 * ```jsx
 * <HotTable
 *   data={getData()}
 *   // enable plugin
 *   mergeCells={[
 *    {row: 0, col: 3, rowspan: 3, colspan: 3},
 *    {row: 2, col: 6, rowspan: 2, colspan: 2},
 *    {row: 4, col: 8, rowspan: 3, colspan: 3}
 *   ]}
 * />
 * ```
 * :::
 */
export var MergeCells = /*#__PURE__*/function (_BasePlugin) {
  _inherits(MergeCells, _BasePlugin);
  var _super = _createSuper(MergeCells);
  function MergeCells(hotInstance) {
    var _this;
    _classCallCheck(this, MergeCells);
    _this = _super.call(this, hotInstance);
    privatePool.set(_assertThisInitialized(_this), {
      lastDesiredCoords: null
    });

    /**
     * A container for all the merged cells.
     *
     * @private
     * @type {MergedCellsCollection}
     */
    _this.mergedCellsCollection = null;
    /**
     * Instance of the class responsible for all the autofill-related calculations.
     *
     * @private
     * @type {AutofillCalculations}
     */
    _this.autofillCalculations = null;
    /**
     * Instance of the class responsible for the selection-related calculations.
     *
     * @private
     * @type {SelectionCalculations}
     */
    _this.selectionCalculations = null;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link MergeCells#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  _createClass(MergeCells, [{
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
      this.mergedCellsCollection = new MergedCellsCollection(this);
      this.autofillCalculations = new AutofillCalculations(this);
      this.selectionCalculations = new SelectionCalculations(this);
      this.addHook('afterInit', function () {
        return _this2.onAfterInit.apply(_this2, arguments);
      });
      this.addHook('modifyTransformStart', function () {
        return _this2.onModifyTransformStart.apply(_this2, arguments);
      });
      this.addHook('afterModifyTransformStart', function () {
        return _this2.onAfterModifyTransformStart.apply(_this2, arguments);
      });
      this.addHook('modifyTransformEnd', function () {
        return _this2.onModifyTransformEnd.apply(_this2, arguments);
      });
      this.addHook('modifyGetCellCoords', function () {
        return _this2.onModifyGetCellCoords.apply(_this2, arguments);
      });
      this.addHook('beforeSetRangeStart', function () {
        return _this2.onBeforeSetRangeStart.apply(_this2, arguments);
      });
      this.addHook('beforeSetRangeStartOnly', function () {
        return _this2.onBeforeSetRangeStart.apply(_this2, arguments);
      });
      this.addHook('beforeSetRangeEnd', function () {
        return _this2.onBeforeSetRangeEnd.apply(_this2, arguments);
      });
      this.addHook('afterIsMultipleSelection', function () {
        return _this2.onAfterIsMultipleSelection.apply(_this2, arguments);
      });
      this.addHook('afterRenderer', function () {
        return _this2.onAfterRenderer.apply(_this2, arguments);
      });
      this.addHook('afterContextMenuDefaultOptions', function () {
        return _this2.addMergeActionsToContextMenu.apply(_this2, arguments);
      });
      this.addHook('afterGetCellMeta', function () {
        return _this2.onAfterGetCellMeta.apply(_this2, arguments);
      });
      this.addHook('afterViewportRowCalculatorOverride', function () {
        return _this2.onAfterViewportRowCalculatorOverride.apply(_this2, arguments);
      });
      this.addHook('afterViewportColumnCalculatorOverride', function () {
        return _this2.onAfterViewportColumnCalculatorOverride.apply(_this2, arguments);
      });
      this.addHook('modifyAutofillRange', function () {
        return _this2.onModifyAutofillRange.apply(_this2, arguments);
      });
      this.addHook('afterCreateCol', function () {
        return _this2.onAfterCreateCol.apply(_this2, arguments);
      });
      this.addHook('afterRemoveCol', function () {
        return _this2.onAfterRemoveCol.apply(_this2, arguments);
      });
      this.addHook('afterCreateRow', function () {
        return _this2.onAfterCreateRow.apply(_this2, arguments);
      });
      this.addHook('afterRemoveRow', function () {
        return _this2.onAfterRemoveRow.apply(_this2, arguments);
      });
      this.addHook('afterChange', function () {
        return _this2.onAfterChange.apply(_this2, arguments);
      });
      this.addHook('beforeDrawBorders', function () {
        return _this2.onBeforeDrawAreaBorders.apply(_this2, arguments);
      });
      this.addHook('afterDrawSelection', function () {
        return _this2.onAfterDrawSelection.apply(_this2, arguments);
      });
      this.addHook('beforeRemoveCellClassNames', function () {
        return _this2.onBeforeRemoveCellClassNames.apply(_this2, arguments);
      });
      this.addHook('beforeUndoStackChange', function (action, source) {
        if (source === 'MergeCells') {
          return false;
        }
      });
      this.registerShortcuts();
      _get(_getPrototypeOf(MergeCells.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.clearCollections();
      this.unregisterShortcuts();
      this.hot.render();
      _get(_getPrototypeOf(MergeCells.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - [`mergeCells`](@/api/options.md#mergecells)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      var settings = this.hot.getSettings()[PLUGIN_KEY];
      this.disablePlugin();
      this.enablePlugin();
      this.generateFromSettings(settings);
      _get(_getPrototypeOf(MergeCells.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Validates a single setting object, represented by a single merged cell information object.
     *
     * @private
     * @param {object} setting An object with `row`, `col`, `rowspan` and `colspan` properties.
     * @returns {boolean}
     */
  }, {
    key: "validateSetting",
    value: function validateSetting(setting) {
      var valid = true;
      if (!setting) {
        return false;
      }
      if (MergedCellCoords.containsNegativeValues(setting)) {
        warn(MergedCellCoords.NEGATIVE_VALUES_WARNING(setting));
        valid = false;
      } else if (MergedCellCoords.isOutOfBounds(setting, this.hot.countRows(), this.hot.countCols())) {
        warn(MergedCellCoords.IS_OUT_OF_BOUNDS_WARNING(setting));
        valid = false;
      } else if (MergedCellCoords.isSingleCell(setting)) {
        warn(MergedCellCoords.IS_SINGLE_CELL(setting));
        valid = false;
      } else if (MergedCellCoords.containsZeroSpan(setting)) {
        warn(MergedCellCoords.ZERO_SPAN_WARNING(setting));
        valid = false;
      }
      return valid;
    }

    /**
     * Generates the merged cells from the settings provided to the plugin.
     *
     * @private
     * @param {Array|boolean} settings The settings provided to the plugin.
     */
  }, {
    key: "generateFromSettings",
    value: function generateFromSettings(settings) {
      var _this3 = this;
      if (Array.isArray(settings)) {
        var populatedNulls = [];
        arrayEach(settings, function (setting) {
          if (!_this3.validateSetting(setting)) {
            return;
          }
          var highlight = _this3.hot._createCellCoords(setting.row, setting.col);
          var rangeEnd = _this3.hot._createCellCoords(setting.row + setting.rowspan - 1, setting.col + setting.colspan - 1);
          var mergeRange = _this3.hot._createCellRange(highlight, highlight, rangeEnd);

          // Merging without data population.
          _this3.mergeRange(mergeRange, true, true);
          rangeEach(setting.row, setting.row + setting.rowspan - 1, function (rowIndex) {
            rangeEach(setting.col, setting.col + setting.colspan - 1, function (columnIndex) {
              // Not resetting a cell representing a merge area's value.
              if ((rowIndex === setting.row && columnIndex === setting.col) === false) {
                populatedNulls.push([rowIndex, columnIndex, null]);
              }
            });
          });
        });

        // There are no merged cells. Thus, no data population is needed.
        if (populatedNulls.length === 0) {
          return;
        }
        this.hot.setDataAtCell(populatedNulls);
      }
    }

    /**
     * Clears the merged cells from the merged cell container.
     */
  }, {
    key: "clearCollections",
    value: function clearCollections() {
      this.mergedCellsCollection.clear();
    }

    /**
     * Returns `true` if a range is mergeable.
     *
     * @private
     * @param {object} newMergedCellInfo Merged cell information object to test.
     * @param {boolean} [auto=false] `true` if triggered at initialization.
     * @returns {boolean}
     */
  }, {
    key: "canMergeRange",
    value: function canMergeRange(newMergedCellInfo) {
      var auto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return auto ? true : this.validateSetting(newMergedCellInfo);
    }

    /**
     * Merge or unmerge, based on last selected range.
     *
     * @private
     */
  }, {
    key: "toggleMergeOnSelection",
    value: function toggleMergeOnSelection() {
      var currentRange = this.hot.getSelectedRangeLast();
      if (!currentRange) {
        return;
      }
      currentRange.setDirection(this.hot.isRtl() ? 'NE-SW' : 'NW-SE');
      var from = currentRange.from,
        to = currentRange.to;
      this.toggleMerge(currentRange);
      this.hot.selectCell(from.row, from.col, to.row, to.col, false);
    }

    /**
     * Merges the selection provided as a cell range.
     *
     * @param {CellRange} [cellRange] Selection cell range.
     */
  }, {
    key: "mergeSelection",
    value: function mergeSelection() {
      var cellRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.hot.getSelectedRangeLast();
      if (!cellRange) {
        return;
      }
      cellRange.setDirection(this.hot.isRtl() ? 'NE-SW' : 'NW-SE');
      var from = cellRange.from,
        to = cellRange.to;
      this.unmergeRange(cellRange, true);
      this.mergeRange(cellRange);
      this.hot.selectCell(from.row, from.col, to.row, to.col, false);
    }

    /**
     * Unmerges the selection provided as a cell range.
     *
     * @param {CellRange} [cellRange] Selection cell range.
     */
  }, {
    key: "unmergeSelection",
    value: function unmergeSelection() {
      var cellRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.hot.getSelectedRangeLast();
      if (!cellRange) {
        return;
      }
      var from = cellRange.from,
        to = cellRange.to;
      this.unmergeRange(cellRange, true);
      this.hot.selectCell(from.row, from.col, to.row, to.col, false);
    }

    /**
     * Merges cells in the provided cell range.
     *
     * @private
     * @param {CellRange} cellRange Cell range to merge.
     * @param {boolean} [auto=false] `true` if is called automatically, e.g. At initialization.
     * @param {boolean} [preventPopulation=false] `true`, if the method should not run `populateFromArray` at the end, but rather return its arguments.
     * @returns {Array|boolean} Returns an array of [row, column, dataUnderCollection] if preventPopulation is set to true. If the the merging process went successful, it returns `true`, otherwise - `false`.
     * @fires Hooks#beforeMergeCells
     * @fires Hooks#afterMergeCells
     */
  }, {
    key: "mergeRange",
    value: function mergeRange(cellRange) {
      var _this4 = this;
      var auto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var preventPopulation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var topStart = cellRange.getTopStartCorner();
      var bottomEnd = cellRange.getBottomEndCorner();
      var mergeParent = {
        row: topStart.row,
        col: topStart.col,
        rowspan: bottomEnd.row - topStart.row + 1,
        colspan: bottomEnd.col - topStart.col + 1
      };
      var clearedData = [];
      var populationInfo = null;
      if (!this.canMergeRange(mergeParent, auto)) {
        return false;
      }
      this.hot.runHooks('beforeMergeCells', cellRange, auto);
      rangeEach(0, mergeParent.rowspan - 1, function (i) {
        rangeEach(0, mergeParent.colspan - 1, function (j) {
          var clearedValue = null;
          if (!clearedData[i]) {
            clearedData[i] = [];
          }
          if (i === 0 && j === 0) {
            clearedValue = _this4.hot.getSourceDataAtCell(_this4.hot.toPhysicalRow(mergeParent.row), _this4.hot.toPhysicalColumn(mergeParent.col));
          } else {
            _this4.hot.setCellMeta(mergeParent.row + i, mergeParent.col + j, 'hidden', true);
          }
          clearedData[i][j] = clearedValue;
        });
      });
      this.hot.setCellMeta(mergeParent.row, mergeParent.col, 'spanned', true);
      var mergedCellAdded = this.mergedCellsCollection.add(mergeParent);
      if (mergedCellAdded) {
        if (preventPopulation) {
          populationInfo = [mergeParent.row, mergeParent.col, clearedData];
        } else {
          this.hot.populateFromArray(mergeParent.row, mergeParent.col, clearedData, void 0, void 0, this.pluginName);
        }
        this.hot.runHooks('afterMergeCells', cellRange, mergeParent, auto);
        return populationInfo;
      }
      return true;
    }

    /**
     * Unmerges the selection provided as a cell range. If no cell range is provided, it uses the current selection.
     *
     * @private
     * @param {CellRange} cellRange Selection cell range.
     * @param {boolean} [auto=false] `true` if called automatically by the plugin.
     *
     * @fires Hooks#beforeUnmergeCells
     * @fires Hooks#afterUnmergeCells
     */
  }, {
    key: "unmergeRange",
    value: function unmergeRange(cellRange) {
      var _this5 = this;
      var auto = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var mergedCells = this.mergedCellsCollection.getWithinRange(cellRange);
      if (!mergedCells) {
        return;
      }
      this.hot.runHooks('beforeUnmergeCells', cellRange, auto);
      arrayEach(mergedCells, function (currentCollection) {
        _this5.mergedCellsCollection.remove(currentCollection.row, currentCollection.col);
        rangeEach(0, currentCollection.rowspan - 1, function (i) {
          rangeEach(0, currentCollection.colspan - 1, function (j) {
            _this5.hot.removeCellMeta(currentCollection.row + i, currentCollection.col + j, 'hidden');
          });
        });
        _this5.hot.removeCellMeta(currentCollection.row, currentCollection.col, 'spanned');
      });
      this.hot.runHooks('afterUnmergeCells', cellRange, auto);
      this.hot.render();
    }

    /**
     * Merges or unmerges, based on the cell range provided as `cellRange`.
     *
     * @private
     * @param {CellRange} cellRange The cell range to merge or unmerged.
     */
  }, {
    key: "toggleMerge",
    value: function toggleMerge(cellRange) {
      var mergedCell = this.mergedCellsCollection.get(cellRange.from.row, cellRange.from.col);
      var mergedCellCoversWholeRange = mergedCell.row === cellRange.from.row && mergedCell.col === cellRange.from.col && mergedCell.row + mergedCell.rowspan - 1 === cellRange.to.row && mergedCell.col + mergedCell.colspan - 1 === cellRange.to.col;
      if (mergedCellCoversWholeRange) {
        this.unmergeRange(cellRange);
      } else {
        this.mergeSelection(cellRange);
      }
    }

    /**
     * Merges the specified range.
     *
     * @param {number} startRow Start row of the merged cell.
     * @param {number} startColumn Start column of the merged cell.
     * @param {number} endRow End row of the merged cell.
     * @param {number} endColumn End column of the merged cell.
     * @fires Hooks#beforeMergeCells
     * @fires Hooks#afterMergeCells
     */
  }, {
    key: "merge",
    value: function merge(startRow, startColumn, endRow, endColumn) {
      var start = this.hot._createCellCoords(startRow, startColumn);
      var end = this.hot._createCellCoords(endRow, endColumn);
      this.mergeRange(this.hot._createCellRange(start, start, end));
    }

    /**
     * Unmerges the merged cell in the provided range.
     *
     * @param {number} startRow Start row of the merged cell.
     * @param {number} startColumn Start column of the merged cell.
     * @param {number} endRow End row of the merged cell.
     * @param {number} endColumn End column of the merged cell.
     * @fires Hooks#beforeUnmergeCells
     * @fires Hooks#afterUnmergeCells
     */
  }, {
    key: "unmerge",
    value: function unmerge(startRow, startColumn, endRow, endColumn) {
      var start = this.hot._createCellCoords(startRow, startColumn);
      var end = this.hot._createCellCoords(endRow, endColumn);
      this.unmergeRange(this.hot._createCellRange(start, start, end));
    }

    /**
     * `afterInit` hook callback.
     *
     * @private
     */
  }, {
    key: "onAfterInit",
    value: function onAfterInit() {
      this.generateFromSettings(this.hot.getSettings()[PLUGIN_KEY]);
      this.hot.render();
    }

    /**
     * Register shortcuts responsible for toggling a merge.
     *
     * @private
     */
  }, {
    key: "registerShortcuts",
    value: function registerShortcuts() {
      var _this6 = this;
      var shortcutManager = this.hot.getShortcutManager();
      var gridContext = shortcutManager.getContext('grid');
      gridContext.addShortcut({
        keys: [['Control', 'm']],
        callback: function callback() {
          _this6.toggleMerge(_this6.hot.getSelectedRangeLast());
          _this6.hot.render();
        },
        runOnlyIf: function runOnlyIf(event) {
          return !event.altKey;
        },
        // right ALT in some systems triggers ALT+CTRL
        group: SHORTCUTS_GROUP
      });
    }

    /**
     * Unregister shortcuts responsible for toggling a merge.
     *
     * @private
     */
  }, {
    key: "unregisterShortcuts",
    value: function unregisterShortcuts() {
      var shortcutManager = this.hot.getShortcutManager();
      var gridContext = shortcutManager.getContext('grid');
      gridContext.removeShortcutsByGroup(SHORTCUTS_GROUP);
    }

    /**
     * Modifies the information on whether the current selection contains multiple cells. The `afterIsMultipleSelection` hook callback.
     *
     * @private
     * @param {boolean} isMultiple Determines whether the current selection contains multiple cells.
     * @returns {boolean}
     */
  }, {
    key: "onAfterIsMultipleSelection",
    value: function onAfterIsMultipleSelection(isMultiple) {
      if (isMultiple) {
        var mergedCells = this.mergedCellsCollection.mergedCells;
        var selectionRange = this.hot.getSelectedRangeLast();
        for (var group = 0; group < mergedCells.length; group += 1) {
          if (selectionRange.from.row === mergedCells[group].row && selectionRange.from.col === mergedCells[group].col && selectionRange.to.row === mergedCells[group].row + mergedCells[group].rowspan - 1 && selectionRange.to.col === mergedCells[group].col + mergedCells[group].colspan - 1) {
            return false;
          }
        }
      }
      return isMultiple;
    }

    /**
     * `modifyTransformStart` hook callback.
     *
     * @private
     * @param {object} delta The transformation delta.
     */
  }, {
    key: "onModifyTransformStart",
    value: function onModifyTransformStart(delta) {
      var priv = privatePool.get(this);
      var currentlySelectedRange = this.hot.getSelectedRangeLast();
      var newDelta = {
        row: delta.row,
        col: delta.col
      };
      var nextPosition = null;
      var currentPosition = this.hot._createCellCoords(currentlySelectedRange.highlight.row, currentlySelectedRange.highlight.col);
      var mergedParent = this.mergedCellsCollection.get(currentPosition.row, currentPosition.col);
      if (!priv.lastDesiredCoords) {
        priv.lastDesiredCoords = this.hot._createCellCoords(null, null);
      }
      if (mergedParent) {
        // only merge selected
        var mergeTopLeft = this.hot._createCellCoords(mergedParent.row, mergedParent.col);
        var mergeBottomRight = this.hot._createCellCoords(mergedParent.row + mergedParent.rowspan - 1, mergedParent.col + mergedParent.colspan - 1);
        var mergeRange = this.hot._createCellRange(mergeTopLeft, mergeTopLeft, mergeBottomRight);
        if (!mergeRange.includes(priv.lastDesiredCoords)) {
          priv.lastDesiredCoords = this.hot._createCellCoords(null, null); // reset outdated version of lastDesiredCoords
        }

        newDelta.row = priv.lastDesiredCoords.row ? priv.lastDesiredCoords.row - currentPosition.row : newDelta.row;
        newDelta.col = priv.lastDesiredCoords.col ? priv.lastDesiredCoords.col - currentPosition.col : newDelta.col;
        if (delta.row > 0) {
          // moving down
          newDelta.row = mergedParent.row + mergedParent.rowspan - 1 - currentPosition.row + delta.row;
        } else if (delta.row < 0) {
          // moving up
          newDelta.row = currentPosition.row - mergedParent.row + delta.row;
        }
        if (delta.col > 0) {
          // moving right
          newDelta.col = mergedParent.col + mergedParent.colspan - 1 - currentPosition.col + delta.col;
        } else if (delta.col < 0) {
          // moving left
          newDelta.col = currentPosition.col - mergedParent.col + delta.col;
        }
      }
      nextPosition = this.hot._createCellCoords(currentlySelectedRange.highlight.row + newDelta.row, currentlySelectedRange.highlight.col + newDelta.col);
      var nextPositionMergedCell = this.mergedCellsCollection.get(nextPosition.row, nextPosition.col);
      if (nextPositionMergedCell) {
        // skipping the invisible cells in the merge range
        var firstRenderableCoords = this.mergedCellsCollection.getFirstRenderableCoords(nextPositionMergedCell.row, nextPositionMergedCell.col);
        priv.lastDesiredCoords = nextPosition;
        newDelta = {
          row: firstRenderableCoords.row - currentPosition.row,
          col: firstRenderableCoords.col - currentPosition.col
        };
      }
      if (newDelta.row !== 0) {
        delta.row = newDelta.row;
      }
      if (newDelta.col !== 0) {
        delta.col = newDelta.col;
      }
    }

    /**
     * `modifyTransformEnd` hook callback. Needed to handle "jumping over" merged merged cells, while selecting.
     *
     * @private
     * @param {object} delta The transformation delta.
     */
  }, {
    key: "onModifyTransformEnd",
    value: function onModifyTransformEnd(delta) {
      var _this7 = this;
      var currentSelectionRange = this.hot.getSelectedRangeLast();
      var newDelta = clone(delta);
      var newSelectionRange = this.selectionCalculations.getUpdatedSelectionRange(currentSelectionRange, delta);
      var tempDelta = clone(newDelta);
      var mergedCellsWithinRange = this.mergedCellsCollection.getWithinRange(newSelectionRange, true);
      do {
        tempDelta = clone(newDelta);
        this.selectionCalculations.getUpdatedSelectionRange(currentSelectionRange, newDelta);
        arrayEach(mergedCellsWithinRange, function (mergedCell) {
          _this7.selectionCalculations.snapDelta(newDelta, currentSelectionRange, mergedCell);
        });
      } while (newDelta.row !== tempDelta.row || newDelta.col !== tempDelta.col);
      delta.row = newDelta.row;
      delta.col = newDelta.col;
    }

    /**
     * `modifyGetCellCoords` hook callback. Swaps the `getCell` coords with the merged parent coords.
     *
     * @private
     * @param {number} row Row index.
     * @param {number} column Visual column index.
     * @returns {Array|undefined} Visual coordinates of the merge.
     */
  }, {
    key: "onModifyGetCellCoords",
    value: function onModifyGetCellCoords(row, column) {
      if (row < 0 || column < 0) {
        return;
      }
      var mergeParent = this.mergedCellsCollection.get(row, column);
      if (!mergeParent) {
        return;
      }
      var mergeRow = mergeParent.row,
        mergeColumn = mergeParent.col,
        colspan = mergeParent.colspan,
        rowspan = mergeParent.rowspan;
      return [
      // Most top-left merged cell coords.
      mergeRow, mergeColumn,
      // Most bottom-right merged cell coords.
      mergeRow + rowspan - 1, mergeColumn + colspan - 1];
    }

    /**
     * `afterContextMenuDefaultOptions` hook callback.
     *
     * @private
     * @param {object} defaultOptions The default context menu options.
     */
  }, {
    key: "addMergeActionsToContextMenu",
    value: function addMergeActionsToContextMenu(defaultOptions) {
      defaultOptions.items.push({
        name: '---------'
      }, toggleMergeItem(this));
    }

    /**
     * `afterRenderer` hook callback.
     *
     * @private
     * @param {HTMLElement} TD The cell to be modified.
     * @param {number} row Row index.
     * @param {number} col Visual column index.
     */
  }, {
    key: "onAfterRenderer",
    value: function onAfterRenderer(TD, row, col) {
      var mergedCell = this.mergedCellsCollection.get(row, col);
      // We shouldn't override data in the collection.
      var mergedCellCopy = isObject(mergedCell) ? clone(mergedCell) : void 0;
      if (isObject(mergedCellCopy)) {
        var _this$hot = this.hot,
          rowMapper = _this$hot.rowIndexMapper,
          columnMapper = _this$hot.columnIndexMapper;
        var mergeRow = mergedCellCopy.row,
          mergeColumn = mergedCellCopy.col,
          colspan = mergedCellCopy.colspan,
          rowspan = mergedCellCopy.rowspan;
        var _this$translateMerged = this.translateMergedCellToRenderable(mergeRow, rowspan, mergeColumn, colspan),
          _this$translateMerged2 = _slicedToArray(_this$translateMerged, 2),
          lastMergedRowIndex = _this$translateMerged2[0],
          lastMergedColumnIndex = _this$translateMerged2[1];
        var renderedRowIndex = rowMapper.getRenderableFromVisualIndex(row);
        var renderedColumnIndex = columnMapper.getRenderableFromVisualIndex(col);
        var maxRowSpan = lastMergedRowIndex - renderedRowIndex + 1; // Number of rendered columns.
        var maxColSpan = lastMergedColumnIndex - renderedColumnIndex + 1; // Number of rendered columns.

        // We just try to determine some values basing on the actual number of rendered indexes (some columns may be hidden).
        mergedCellCopy.row = rowMapper.getNearestNotHiddenIndex(mergedCellCopy.row, 1);
        // We just try to determine some values basing on the actual number of rendered indexes (some columns may be hidden).
        mergedCellCopy.col = columnMapper.getNearestNotHiddenIndex(mergedCellCopy.col, 1);
        // The `rowSpan` property for a `TD` element should be at most equal to number of rendered rows in the merge area.
        mergedCellCopy.rowspan = Math.min(mergedCellCopy.rowspan, maxRowSpan);
        // The `colSpan` property for a `TD` element should be at most equal to number of rendered columns in the merge area.
        mergedCellCopy.colspan = Math.min(mergedCellCopy.colspan, maxColSpan);
      }
      applySpanProperties(TD, mergedCellCopy, row, col);
    }

    /**
     * `beforeSetRangeStart` and `beforeSetRangeStartOnly` hook callback.
     * A selection within merge area should be rewritten to the start of merge area.
     *
     * @private
     * @param {object} coords Cell coords.
     */
  }, {
    key: "onBeforeSetRangeStart",
    value: function onBeforeSetRangeStart(coords) {
      // TODO: It is a workaround, but probably this hook may be needed. Every selection on the merge area
      // could set start point of the selection to the start of the merge area. However, logic inside `expandByRange` need
      // an initial start point. Click on the merge cell when there are some hidden indexes break the logic in some cases.
      // Please take a look at #7010 for more information. I'm not sure if selection directions are calculated properly
      // and what was idea for flipping direction inside `expandByRange` method.
      if (this.mergedCellsCollection.isFirstRenderableMergedCell(coords.row, coords.col)) {
        var mergeParent = this.mergedCellsCollection.get(coords.row, coords.col);
        var _ref = [mergeParent.row, mergeParent.col];
        coords.row = _ref[0];
        coords.col = _ref[1];
      }
    }

    /**
     * `beforeSetRangeEnd` hook callback.
     * While selecting cells with keyboard or mouse, make sure that rectangular area is expanded to the extent of the merged cell.
     *
     * Note: Please keep in mind that callback may modify both start and end range coordinates by the reference.
     *
     * @private
     * @param {object} coords Cell coords.
     */
  }, {
    key: "onBeforeSetRangeEnd",
    value: function onBeforeSetRangeEnd(coords) {
      var selRange = this.hot.getSelectedRangeLast();
      selRange.highlight = this.hot._createCellCoords(selRange.highlight.row, selRange.highlight.col); // clone in case we will modify its reference
      selRange.to = coords;
      var rangeExpanded = false;
      if (this.hot.selection.isSelectedByColumnHeader() || this.hot.selection.isSelectedByRowHeader()) {
        return;
      }
      do {
        rangeExpanded = false;
        for (var i = 0; i < this.mergedCellsCollection.mergedCells.length; i += 1) {
          var cellInfo = this.mergedCellsCollection.mergedCells[i];
          var mergedCellRange = cellInfo.getRange();
          if (selRange.expandByRange(mergedCellRange)) {
            coords.row = selRange.to.row;
            coords.col = selRange.to.col;
            rangeExpanded = true;
          }
        }
      } while (rangeExpanded);
    }

    /**
     * The `afterGetCellMeta` hook callback.
     *
     * @private
     * @param {number} row Row index.
     * @param {number} col Column index.
     * @param {object} cellProperties The cell properties object.
     */
  }, {
    key: "onAfterGetCellMeta",
    value: function onAfterGetCellMeta(row, col, cellProperties) {
      var mergeParent = this.mergedCellsCollection.get(row, col);
      if (mergeParent) {
        if (mergeParent.row !== row || mergeParent.col !== col) {
          cellProperties.copyable = false;
        } else {
          cellProperties.rowspan = mergeParent.rowspan;
          cellProperties.colspan = mergeParent.colspan;
        }
      }
    }

    /**
     * `afterViewportRowCalculatorOverride` hook callback.
     *
     * @private
     * @param {object} calc The row calculator object.
     */
  }, {
    key: "onAfterViewportRowCalculatorOverride",
    value: function onAfterViewportRowCalculatorOverride(calc) {
      var nrOfColumns = this.hot.countCols();
      this.modifyViewportRowStart(calc, nrOfColumns);
      this.modifyViewportRowEnd(calc, nrOfColumns);
    }

    /**
     * Modify viewport start when needed. We extend viewport when merged cells aren't fully visible.
     *
     * @private
     * @param {object} calc The row calculator object.
     * @param {number} nrOfColumns Number of visual columns.
     */
  }, {
    key: "modifyViewportRowStart",
    value: function modifyViewportRowStart(calc, nrOfColumns) {
      var rowMapper = this.hot.rowIndexMapper;
      var visualStartRow = rowMapper.getVisualFromRenderableIndex(calc.startRow);
      for (var visualColumnIndex = 0; visualColumnIndex < nrOfColumns; visualColumnIndex += 1) {
        var mergeParentForViewportStart = this.mergedCellsCollection.get(visualStartRow, visualColumnIndex);
        if (isObject(mergeParentForViewportStart)) {
          var renderableIndexAtMergeStart = rowMapper.getRenderableFromVisualIndex(rowMapper.getNearestNotHiddenIndex(mergeParentForViewportStart.row, 1));

          // Merge start is out of the viewport (i.e. when we scrolled to the bottom and we can see just part of a merge).
          if (renderableIndexAtMergeStart < calc.startRow) {
            // We extend viewport when some rows have been merged.
            calc.startRow = renderableIndexAtMergeStart;
            // We are looking for next merges inside already extended viewport (starting again from row equal to 0).
            this.modifyViewportRowStart(calc, nrOfColumns); // recursively search upwards

            return; // Finish the current loop. Everything will be checked from the beginning by above recursion.
          }
        }
      }
    }

    /**
     *  Modify viewport end when needed. We extend viewport when merged cells aren't fully visible.
     *
     * @private
     * @param {object} calc The row calculator object.
     * @param {number} nrOfColumns Number of visual columns.
     */
  }, {
    key: "modifyViewportRowEnd",
    value: function modifyViewportRowEnd(calc, nrOfColumns) {
      var rowMapper = this.hot.rowIndexMapper;
      var visualEndRow = rowMapper.getVisualFromRenderableIndex(calc.endRow);
      for (var visualColumnIndex = 0; visualColumnIndex < nrOfColumns; visualColumnIndex += 1) {
        var mergeParentForViewportEnd = this.mergedCellsCollection.get(visualEndRow, visualColumnIndex);
        if (isObject(mergeParentForViewportEnd)) {
          var mergeEnd = mergeParentForViewportEnd.row + mergeParentForViewportEnd.rowspan - 1;
          var renderableIndexAtMergeEnd = rowMapper.getRenderableFromVisualIndex(rowMapper.getNearestNotHiddenIndex(mergeEnd, -1));

          // Merge end is out of the viewport.
          if (renderableIndexAtMergeEnd > calc.endRow) {
            // We extend the viewport when some rows have been merged.
            calc.endRow = renderableIndexAtMergeEnd;
            // We are looking for next merges inside already extended viewport (starting again from row equal to 0).
            this.modifyViewportRowEnd(calc, nrOfColumns); // recursively search upwards

            return; // Finish the current loop. Everything will be checked from the beginning by above recursion.
          }
        }
      }
    }

    /**
     * `afterViewportColumnCalculatorOverride` hook callback.
     *
     * @private
     * @param {object} calc The column calculator object.
     */
  }, {
    key: "onAfterViewportColumnCalculatorOverride",
    value: function onAfterViewportColumnCalculatorOverride(calc) {
      var nrOfRows = this.hot.countRows();
      this.modifyViewportColumnStart(calc, nrOfRows);
      this.modifyViewportColumnEnd(calc, nrOfRows);
    }

    /**
     * Modify viewport start when needed. We extend viewport when merged cells aren't fully visible.
     *
     * @private
     * @param {object} calc The column calculator object.
     * @param {number} nrOfRows Number of visual rows.
     */
  }, {
    key: "modifyViewportColumnStart",
    value: function modifyViewportColumnStart(calc, nrOfRows) {
      var columnMapper = this.hot.columnIndexMapper;
      var visualStartCol = columnMapper.getVisualFromRenderableIndex(calc.startColumn);
      for (var visualRowIndex = 0; visualRowIndex < nrOfRows; visualRowIndex += 1) {
        var mergeParentForViewportStart = this.mergedCellsCollection.get(visualRowIndex, visualStartCol);
        if (isObject(mergeParentForViewportStart)) {
          var renderableIndexAtMergeStart = columnMapper.getRenderableFromVisualIndex(columnMapper.getNearestNotHiddenIndex(mergeParentForViewportStart.col, 1));

          // Merge start is out of the viewport (i.e. when we scrolled to the right and we can see just part of a merge).
          if (renderableIndexAtMergeStart < calc.startColumn) {
            // We extend viewport when some columns have been merged.
            calc.startColumn = renderableIndexAtMergeStart;
            // We are looking for next merges inside already extended viewport (starting again from column equal to 0).
            this.modifyViewportColumnStart(calc, nrOfRows); // recursively search upwards

            return; // Finish the current loop. Everything will be checked from the beginning by above recursion.
          }
        }
      }
    }

    /**
     *  Modify viewport end when needed. We extend viewport when merged cells aren't fully visible.
     *
     * @private
     * @param {object} calc The column calculator object.
     * @param {number} nrOfRows Number of visual rows.
     */
  }, {
    key: "modifyViewportColumnEnd",
    value: function modifyViewportColumnEnd(calc, nrOfRows) {
      var columnMapper = this.hot.columnIndexMapper;
      var visualEndCol = columnMapper.getVisualFromRenderableIndex(calc.endColumn);
      for (var visualRowIndex = 0; visualRowIndex < nrOfRows; visualRowIndex += 1) {
        var mergeParentForViewportEnd = this.mergedCellsCollection.get(visualRowIndex, visualEndCol);
        if (isObject(mergeParentForViewportEnd)) {
          var mergeEnd = mergeParentForViewportEnd.col + mergeParentForViewportEnd.colspan - 1;
          var renderableIndexAtMergeEnd = columnMapper.getRenderableFromVisualIndex(columnMapper.getNearestNotHiddenIndex(mergeEnd, -1));

          // Merge end is out of the viewport.
          if (renderableIndexAtMergeEnd > calc.endColumn) {
            // We extend the viewport when some columns have been merged.
            calc.endColumn = renderableIndexAtMergeEnd;
            // We are looking for next merges inside already extended viewport (starting again from column equal to 0).
            this.modifyViewportColumnEnd(calc, nrOfRows); // recursively search upwards

            return; // Finish the current loop. Everything will be checked from the beginning by above recursion.
          }
        }
      }
    }

    /**
     * Translates merged cell coordinates to renderable indexes.
     *
     * @private
     * @param {number} parentRow Visual row index.
     * @param {number} rowspan Rowspan which describes shift which will be applied to parent row
     *                         to calculate renderable index which points to the most bottom
     *                         index position. Pass rowspan as `0` to calculate the most top
     *                         index position.
     * @param {number} parentColumn Visual column index.
     * @param {number} colspan Colspan which describes shift which will be applied to parent column
     *                         to calculate renderable index which points to the most right
     *                         index position. Pass colspan as `0` to calculate the most left
     *                         index position.
     * @returns {number[]}
     */
  }, {
    key: "translateMergedCellToRenderable",
    value: function translateMergedCellToRenderable(parentRow, rowspan, parentColumn, colspan) {
      var _this$hot2 = this.hot,
        rowMapper = _this$hot2.rowIndexMapper,
        columnMapper = _this$hot2.columnIndexMapper;
      var firstNonHiddenRow;
      var firstNonHiddenColumn;
      if (rowspan === 0) {
        firstNonHiddenRow = rowMapper.getNearestNotHiddenIndex(parentRow, 1);
      } else {
        firstNonHiddenRow = rowMapper.getNearestNotHiddenIndex(parentRow + rowspan - 1, -1);
      }
      if (colspan === 0) {
        firstNonHiddenColumn = columnMapper.getNearestNotHiddenIndex(parentColumn, 1);
      } else {
        firstNonHiddenColumn = columnMapper.getNearestNotHiddenIndex(parentColumn + colspan - 1, -1);
      }
      var renderableRow = parentRow >= 0 ? rowMapper.getRenderableFromVisualIndex(firstNonHiddenRow) : parentRow;
      var renderableColumn = parentColumn >= 0 ? columnMapper.getRenderableFromVisualIndex(firstNonHiddenColumn) : parentColumn;
      return [renderableRow, renderableColumn];
    }

    /**
     * The `modifyAutofillRange` hook callback.
     *
     * @private
     * @param {Array} drag The drag area coordinates.
     * @param {Array} select The selection information.
     * @returns {Array} The new drag area.
     */
  }, {
    key: "onModifyAutofillRange",
    value: function onModifyAutofillRange(drag, select) {
      this.autofillCalculations.correctSelectionAreaSize(select);
      var dragDirection = this.autofillCalculations.getDirection(select, drag);
      var dragArea = drag;
      if (this.autofillCalculations.dragAreaOverlapsCollections(select, dragArea, dragDirection)) {
        dragArea = select;
        return dragArea;
      }
      var mergedCellsWithinSelectionArea = this.mergedCellsCollection.getWithinRange({
        from: {
          row: select[0],
          col: select[1]
        },
        to: {
          row: select[2],
          col: select[3]
        }
      });
      if (!mergedCellsWithinSelectionArea) {
        return dragArea;
      }
      dragArea = this.autofillCalculations.snapDragArea(select, dragArea, dragDirection, mergedCellsWithinSelectionArea);
      return dragArea;
    }

    /**
     * `afterCreateCol` hook callback.
     *
     * @private
     * @param {number} column Column index.
     * @param {number} count Number of created columns.
     */
  }, {
    key: "onAfterCreateCol",
    value: function onAfterCreateCol(column, count) {
      this.mergedCellsCollection.shiftCollections('right', column, count);
    }

    /**
     * `afterRemoveCol` hook callback.
     *
     * @private
     * @param {number} column Column index.
     * @param {number} count Number of removed columns.
     */
  }, {
    key: "onAfterRemoveCol",
    value: function onAfterRemoveCol(column, count) {
      this.mergedCellsCollection.shiftCollections('left', column, count);
    }

    /**
     * `afterCreateRow` hook callback.
     *
     * @private
     * @param {number} row Row index.
     * @param {number} count Number of created rows.
     * @param {string} source Source of change.
     */
  }, {
    key: "onAfterCreateRow",
    value: function onAfterCreateRow(row, count, source) {
      if (source === 'auto') {
        return;
      }
      this.mergedCellsCollection.shiftCollections('down', row, count);
    }

    /**
     * `afterRemoveRow` hook callback.
     *
     * @private
     * @param {number} row Row index.
     * @param {number} count Number of removed rows.
     */
  }, {
    key: "onAfterRemoveRow",
    value: function onAfterRemoveRow(row, count) {
      this.mergedCellsCollection.shiftCollections('up', row, count);
    }

    /**
     * `afterChange` hook callback. Used to propagate merged cells after using Autofill.
     *
     * @private
     * @param {Array} changes The changes array.
     * @param {string} source Determines the source of the change.
     */
  }, {
    key: "onAfterChange",
    value: function onAfterChange(changes, source) {
      if (source !== 'Autofill.fill') {
        return;
      }
      this.autofillCalculations.recreateAfterDataPopulation(changes);
    }

    /**
     * `beforeDrawAreaBorders` hook callback.
     *
     * @private
     * @param {Array} corners Visual coordinates of the area corners.
     * @param {string} className Class name for the area.
     */
  }, {
    key: "onBeforeDrawAreaBorders",
    value: function onBeforeDrawAreaBorders(corners, className) {
      if (className && className === 'area') {
        var selectedRange = this.hot.getSelectedRangeLast();
        var mergedCellsWithinRange = this.mergedCellsCollection.getWithinRange(selectedRange);
        arrayEach(mergedCellsWithinRange, function (mergedCell) {
          if (selectedRange.getBottomEndCorner().row === mergedCell.getLastRow() && selectedRange.getBottomEndCorner().col === mergedCell.getLastColumn()) {
            corners[2] = mergedCell.row;
            corners[3] = mergedCell.col;
          }
        });
      }
    }

    /**
     * `afterModifyTransformStart` hook callback. Fixes a problem with navigating through merged cells at the edges of the table
     * with the ENTER/SHIFT+ENTER/TAB/SHIFT+TAB keys.
     *
     * @private
     * @param {CellCoords} coords Coordinates of the to-be-selected cell.
     * @param {number} rowTransformDir Row transformation direction (negative value = up, 0 = none, positive value = down).
     * @param {number} colTransformDir Column transformation direction (negative value = up, 0 = none, positive value = down).
     */
  }, {
    key: "onAfterModifyTransformStart",
    value: function onAfterModifyTransformStart(coords, rowTransformDir, colTransformDir) {
      if (!this.enabled) {
        return;
      }
      var mergedCellAtCoords = this.mergedCellsCollection.get(coords.row, coords.col);
      if (!mergedCellAtCoords) {
        return;
      }
      var goingDown = rowTransformDir > 0;
      var goingUp = rowTransformDir < 0;
      var goingLeft = colTransformDir < 0;
      var goingRight = colTransformDir > 0;
      var mergedCellOnBottomEdge = mergedCellAtCoords.row + mergedCellAtCoords.rowspan - 1 === this.hot.countRows() - 1;
      var mergedCellOnTopEdge = mergedCellAtCoords.row === 0;
      var mergedCellOnRightEdge = mergedCellAtCoords.col + mergedCellAtCoords.colspan - 1 === this.hot.countCols() - 1;
      var mergedCellOnLeftEdge = mergedCellAtCoords.col === 0;
      if (goingDown && mergedCellOnBottomEdge || goingUp && mergedCellOnTopEdge || goingRight && mergedCellOnRightEdge || goingLeft && mergedCellOnLeftEdge) {
        coords.row = mergedCellAtCoords.row;
        coords.col = mergedCellAtCoords.col;
      }
    }

    /**
     * `afterDrawSelection` hook callback. Used to add the additional class name for the entirely-selected merged cells.
     *
     * @private
     * @param {number} currentRow Visual row index of the currently processed cell.
     * @param {number} currentColumn Visual column index of the currently cell.
     * @param {Array} cornersOfSelection Array of the current selection in a form of `[startRow, startColumn, endRow, endColumn]`.
     * @param {number|undefined} layerLevel Number indicating which layer of selection is currently processed.
     * @returns {string|undefined} A `String`, which will act as an additional `className` to be added to the currently processed cell.
     */
  }, {
    key: "onAfterDrawSelection",
    value: function onAfterDrawSelection(currentRow, currentColumn, cornersOfSelection, layerLevel) {
      // Nothing's selected (hook might be triggered by the custom borders)
      if (!cornersOfSelection) {
        return;
      }
      return this.selectionCalculations.getSelectedMergedCellClassName(currentRow, currentColumn, cornersOfSelection, layerLevel);
    }

    /**
     * `beforeRemoveCellClassNames` hook callback. Used to remove additional class name from all cells in the table.
     *
     * @private
     * @returns {string[]} An `Array` of `String`s. Each of these strings will act like class names to be removed from all the cells in the table.
     */
  }, {
    key: "onBeforeRemoveCellClassNames",
    value: function onBeforeRemoveCellClassNames() {
      return this.selectionCalculations.getSelectedMergedCellClassNameToRemove();
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
  return MergeCells;
}(BasePlugin);