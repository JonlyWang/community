function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
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
import { BasePlugin } from "../base/index.mjs";
import Hooks from "../../pluginHooks.mjs";
import { offset, outerHeight, outerWidth } from "../../helpers/dom/element.mjs";
import { arrayEach, arrayMap } from "../../helpers/array.mjs";
import EventManager from "../../eventManager.mjs";
import { getDeltas, getDragDirectionAndRange, DIRECTIONS, getMappedFillHandleSetting } from "./utils.mjs";
Hooks.getSingleton().register('modifyAutofillRange');
Hooks.getSingleton().register('beforeAutofill');
Hooks.getSingleton().register('afterAutofill');
export var PLUGIN_KEY = 'autofill';
export var PLUGIN_PRIORITY = 20;
var SETTING_KEYS = ['fillHandle'];
var INSERT_ROW_ALTER_ACTION_NAME = 'insert_row_below';
var INTERVAL_FOR_ADDING_ROW = 200;

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * This plugin provides "drag-down" and "copy-down" functionalities, both operated using the small square in the right
 * bottom of the cell selection.
 *
 * "Drag-down" expands the value of the selected cells to the neighbouring cells when you drag the small
 * square in the corner.
 *
 * "Copy-down" copies the value of the selection to all empty cells below when you double click the small square.
 *
 * @class Autofill
 * @plugin Autofill
 */

export var Autofill = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Autofill, _BasePlugin);
  var _super = _createSuper(Autofill);
  function Autofill(hotInstance) {
    var _this;
    _classCallCheck(this, Autofill);
    _this = _super.call(this, hotInstance);
    /**
     * Event manager instance.
     *
     * @private
     * @type {EventManager}
     */
    _this.eventManager = new EventManager(_assertThisInitialized(_this));
    /**
     * Specifies if adding new row started.
     *
     * @private
     * @type {boolean}
     */
    _this.addingStarted = false;
    /**
     * Specifies if there was mouse down on the cell corner.
     *
     * @private
     * @type {boolean}
     */
    _this.mouseDownOnCellCorner = false;
    /**
     * Specifies if mouse was dragged outside Handsontable.
     *
     * @private
     * @type {boolean}
     */
    _this.mouseDragOutside = false;
    /**
     * Specifies how many cell levels were dragged using the handle.
     *
     * @private
     * @type {boolean}
     */
    _this.handleDraggedCells = 0;
    /**
     * Specifies allowed directions of drag (`'horizontal'` or '`vertical`').
     *
     * @private
     * @type {string[]}
     */
    _this.directions = [];
    /**
     * Specifies if can insert new rows if needed.
     *
     * @type {boolean}
     */
    _this.autoInsertRow = false;
    return _this;
  }

  /**
   * Checks if the plugin is enabled in the Handsontable settings.
   *
   * @returns {boolean}
   */
  _createClass(Autofill, [{
    key: "isEnabled",
    value: function isEnabled() {
      return this.hot.getSettings().fillHandle;
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
      this.mapSettings();
      this.registerEvents();
      this.addHook('afterOnCellCornerMouseDown', function (event) {
        return _this2.onAfterCellCornerMouseDown(event);
      });
      this.addHook('afterOnCellCornerDblClick', function (event) {
        return _this2.onCellCornerDblClick(event);
      });
      this.addHook('beforeOnCellMouseOver', function (_, coords) {
        return _this2.onBeforeCellMouseOver(coords);
      });
      _get(_getPrototypeOf(Autofill.prototype), "enablePlugin", this).call(this);
    }

    /**
     * Updates the plugin's state.
     *
     * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
     *  - `autofill`
     *  - [`fillHandle`](@/api/options.md#fillhandle)
     */
  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();
      _get(_getPrototypeOf(Autofill.prototype), "updatePlugin", this).call(this);
    }

    /**
     * Disables the plugin functionality for this Handsontable instance.
     */
  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.clearMappedSettings();
      _get(_getPrototypeOf(Autofill.prototype), "disablePlugin", this).call(this);
    }

    /**
     * Gets selection data.
     *
     * @private
     * @returns {object[]} Ranges Array of objects with properties `startRow`, `startCol`, `endRow` and `endCol`.
     */
  }, {
    key: "getSelectionData",
    value: function getSelectionData() {
      var _this3 = this;
      var selection = this.hot.getSelectedRangeLast();
      var _selection$getTopStar = selection.getTopStartCorner(),
        startRow = _selection$getTopStar.row,
        startCol = _selection$getTopStar.col;
      var _selection$getBottomE = selection.getBottomEndCorner(),
        endRow = _selection$getBottomE.row,
        endCol = _selection$getBottomE.col;
      var copyableRanges = this.hot.runHooks('modifyCopyableRange', [{
        startRow: startRow,
        startCol: startCol,
        endRow: endRow,
        endCol: endCol
      }]);
      var copyableRows = [];
      var copyableColumns = [];
      var data = [];
      arrayEach(copyableRanges, function (range) {
        for (var visualRow = range.startRow; visualRow <= range.endRow; visualRow += 1) {
          if (copyableRows.indexOf(visualRow) === -1) {
            copyableRows.push(visualRow);
          }
        }
        for (var visualColumn = range.startCol; visualColumn <= range.endCol; visualColumn += 1) {
          if (copyableColumns.indexOf(visualColumn) === -1) {
            copyableColumns.push(visualColumn);
          }
        }
      });
      arrayEach(copyableRows, function (row) {
        var rowSet = [];
        arrayEach(copyableColumns, function (column) {
          rowSet.push(_this3.hot.getCopyableData(row, column));
        });
        data.push(rowSet);
      });
      return data;
    }

    /**
     * Try to apply fill values to the area in fill border, omitting the selection border.
     *
     * @private
     * @returns {boolean} Reports if fill was applied.
     *
     * @fires Hooks#modifyAutofillRange
     * @fires Hooks#beforeAutofill
     * @fires Hooks#afterAutofill
     */
  }, {
    key: "fillIn",
    value: function fillIn() {
      var _this4 = this;
      if (this.hot.selection.highlight.getFill().isEmpty()) {
        return false;
      }

      // Fill area may starts or ends with invisible cell. There won't be any information about it as highlighted
      // selection store just renderable indexes (It's part of Walkontable). I extrapolate where the start or/and
      // the end is.
      var _this$hot$selection$h = this.hot.selection.highlight.getFill().getVisualCorners(),
        _this$hot$selection$h2 = _slicedToArray(_this$hot$selection$h, 4),
        fillStartRow = _this$hot$selection$h2[0],
        fillStartColumn = _this$hot$selection$h2[1],
        fillEndRow = _this$hot$selection$h2[2],
        fillEndColumn = _this$hot$selection$h2[3];
      var selectionRangeLast = this.hot.getSelectedRangeLast();
      var topStartCorner = selectionRangeLast.getTopStartCorner();
      var bottomEndCorner = selectionRangeLast.getBottomEndCorner();
      this.resetSelectionOfDraggedArea();
      var cornersOfSelectedCells = [topStartCorner.row, topStartCorner.col, bottomEndCorner.row, bottomEndCorner.col];
      var cornersOfSelectionAndDragAreas = this.hot.runHooks('modifyAutofillRange', [Math.min(topStartCorner.row, fillStartRow), Math.min(topStartCorner.col, fillStartColumn), Math.max(bottomEndCorner.row, fillEndRow), Math.max(bottomEndCorner.col, fillEndColumn)], cornersOfSelectedCells);
      var _getDragDirectionAndR = getDragDirectionAndRange(cornersOfSelectedCells, cornersOfSelectionAndDragAreas, function (row, column) {
          return _this4.hot._createCellCoords(row, column);
        }),
        directionOfDrag = _getDragDirectionAndR.directionOfDrag,
        startOfDragCoords = _getDragDirectionAndR.startOfDragCoords,
        endOfDragCoords = _getDragDirectionAndR.endOfDragCoords;
      if (startOfDragCoords && startOfDragCoords.row > -1 && startOfDragCoords.col > -1) {
        var selectionData = this.getSelectionData();
        var sourceRange = selectionRangeLast.clone();
        var targetRange = this.hot._createCellRange(startOfDragCoords, startOfDragCoords, endOfDragCoords);
        var beforeAutofillHookResult = this.hot.runHooks('beforeAutofill', selectionData, sourceRange, targetRange, directionOfDrag);
        if (beforeAutofillHookResult === false) {
          this.hot.selection.highlight.getFill().clear();
          this.hot.render();
          return false;
        }
        var deltas = getDeltas(startOfDragCoords, endOfDragCoords, selectionData, directionOfDrag);
        var fillData = beforeAutofillHookResult;
        var res = beforeAutofillHookResult;
        if (['up', 'left'].indexOf(directionOfDrag) > -1 && !(res.length === 1 && res[0].length === 0)) {
          fillData = [];
          if (directionOfDrag === 'up') {
            var dragLength = endOfDragCoords.row - startOfDragCoords.row + 1;
            var fillOffset = dragLength % res.length;
            for (var i = 0; i < dragLength; i++) {
              fillData.push(res[(i + (res.length - fillOffset)) % res.length]);
            }
          } else {
            var _dragLength = endOfDragCoords.col - startOfDragCoords.col + 1;
            var _fillOffset = _dragLength % res[0].length;
            for (var _i2 = 0; _i2 < res.length; _i2++) {
              fillData.push([]);
              for (var j = 0; j < _dragLength; j++) {
                fillData[_i2].push(res[_i2][(j + (res[_i2].length - _fillOffset)) % res[_i2].length]);
              }
            }
          }
        }
        this.hot.populateFromArray(startOfDragCoords.row, startOfDragCoords.col, fillData, endOfDragCoords.row, endOfDragCoords.col, "".concat(this.pluginName, ".fill"), null, directionOfDrag, deltas);
        this.setSelection(cornersOfSelectionAndDragAreas);
        this.hot.runHooks('afterAutofill', fillData, sourceRange, targetRange, directionOfDrag);
        this.hot.render();
      } else {
        // reset to avoid some range bug
        this.hot._refreshBorders();
      }
      return true;
    }

    /**
     * Reduces the selection area if the handle was dragged outside of the table or on headers.
     *
     * @private
     * @param {CellCoords} coords Indexes of selection corners.
     * @returns {CellCoords}
     */
  }, {
    key: "reduceSelectionAreaIfNeeded",
    value: function reduceSelectionAreaIfNeeded(coords) {
      if (coords.row < 0) {
        coords.row = 0;
      }
      if (coords.col < 0) {
        coords.col = 0;
      }
      return coords;
    }

    /**
     * Gets the coordinates of the drag & drop borders.
     *
     * @private
     * @param {CellCoords} coordsOfSelection `CellCoords` coord object.
     * @returns {CellCoords}
     */
  }, {
    key: "getCoordsOfDragAndDropBorders",
    value: function getCoordsOfDragAndDropBorders(coordsOfSelection) {
      var currentSelection = this.hot.getSelectedRangeLast();
      var bottomRightCorner = currentSelection.getBottomEndCorner();
      var coords = coordsOfSelection;
      if (this.directions.includes(DIRECTIONS.vertical) && this.directions.includes(DIRECTIONS.horizontal)) {
        var topStartCorner = currentSelection.getTopStartCorner();
        if (bottomRightCorner.col <= coordsOfSelection.col || topStartCorner.col >= coordsOfSelection.col) {
          coords = this.hot._createCellCoords(bottomRightCorner.row, coordsOfSelection.col);
        }
        if (bottomRightCorner.row < coordsOfSelection.row || topStartCorner.row > coordsOfSelection.row) {
          coords = this.hot._createCellCoords(coordsOfSelection.row, bottomRightCorner.col);
        }
      } else if (this.directions.includes(DIRECTIONS.vertical)) {
        coords = this.hot._createCellCoords(coordsOfSelection.row, bottomRightCorner.col);
      } else if (this.directions.includes(DIRECTIONS.horizontal)) {
        coords = this.hot._createCellCoords(bottomRightCorner.row, coordsOfSelection.col);
      } else {
        // wrong direction
        return;
      }
      return this.reduceSelectionAreaIfNeeded(coords);
    }

    /**
     * Show the fill border.
     *
     * @private
     * @param {CellCoords} coordsOfSelection `CellCoords` coord object.
     */
  }, {
    key: "showBorder",
    value: function showBorder(coordsOfSelection) {
      var coordsOfDragAndDropBorders = this.getCoordsOfDragAndDropBorders(coordsOfSelection);
      if (coordsOfDragAndDropBorders) {
        this.redrawBorders(coordsOfDragAndDropBorders);
      }
    }

    /**
     * Add new row.
     *
     * @private
     */
  }, {
    key: "addRow",
    value: function addRow() {
      var _this5 = this;
      this.hot._registerTimeout(function () {
        _this5.hot.alter(INSERT_ROW_ALTER_ACTION_NAME, void 0, 1, "".concat(_this5.pluginName, ".fill"));
        _this5.addingStarted = false;
      }, INTERVAL_FOR_ADDING_ROW);
    }

    /**
     * Add new rows if they are needed to continue auto-filling values.
     *
     * @private
     */
  }, {
    key: "addNewRowIfNeeded",
    value: function addNewRowIfNeeded() {
      if (!this.hot.selection.highlight.getFill().isEmpty() && this.addingStarted === false && this.autoInsertRow) {
        var cornersOfSelectedCells = this.hot.getSelectedLast();
        var cornersOfSelectedDragArea = this.hot.selection.highlight.getFill().getVisualCorners();
        var nrOfTableRows = this.hot.countRows();
        if (cornersOfSelectedCells[2] < nrOfTableRows - 1 && cornersOfSelectedDragArea[2] === nrOfTableRows - 1) {
          this.addingStarted = true;
          this.addRow();
        }
      }
    }

    /**
     * Get index of last adjacent filled in row.
     *
     * @private
     * @param {Array} cornersOfSelectedCells Indexes of selection corners.
     * @returns {number} Gives number greater than or equal to zero when selection adjacent can be applied.
     *                   Or -1 when selection adjacent can't be applied.
     */
  }, {
    key: "getIndexOfLastAdjacentFilledInRow",
    value: function getIndexOfLastAdjacentFilledInRow(cornersOfSelectedCells) {
      var data = this.hot.getData();
      var nrOfTableRows = this.hot.countRows();
      var lastFilledInRowIndex;
      for (var rowIndex = cornersOfSelectedCells[2] + 1; rowIndex < nrOfTableRows; rowIndex++) {
        for (var columnIndex = cornersOfSelectedCells[1]; columnIndex <= cornersOfSelectedCells[3]; columnIndex++) {
          var dataInCell = data[rowIndex][columnIndex];
          if (dataInCell) {
            return -1;
          }
        }
        var dataInNextLeftCell = data[rowIndex][cornersOfSelectedCells[1] - 1];
        var dataInNextRightCell = data[rowIndex][cornersOfSelectedCells[3] + 1];
        if (!!dataInNextLeftCell || !!dataInNextRightCell) {
          lastFilledInRowIndex = rowIndex;
        }
      }
      return lastFilledInRowIndex;
    }

    /**
     * Adds a selection from the start area to the specific row index.
     *
     * @private
     * @param {Array} selectStartArea Selection area from which we start to create more comprehensive selection.
     * @param {number} rowIndex The row index into the selection will be added.
     */
  }, {
    key: "addSelectionFromStartAreaToSpecificRowIndex",
    value: function addSelectionFromStartAreaToSpecificRowIndex(selectStartArea, rowIndex) {
      this.hot.selection.highlight.getFill().clear().add(this.hot._createCellCoords(selectStartArea[0], selectStartArea[1])).add(this.hot._createCellCoords(rowIndex, selectStartArea[3])).commit();
    }

    /**
     * Sets selection based on passed corners.
     *
     * @private
     * @param {Array} cornersOfArea An array witch defines selection.
     */
  }, {
    key: "setSelection",
    value: function setSelection(cornersOfArea) {
      var _this$hot;
      (_this$hot = this.hot).selectCell.apply(_this$hot, _toConsumableArray(arrayMap(cornersOfArea, function (index) {
        return Math.max(index, 0);
      })).concat([false, false]));
    }

    /**
     * Try to select cells down to the last row in the left column and then returns if selection was applied.
     *
     * @private
     * @returns {boolean}
     */
  }, {
    key: "selectAdjacent",
    value: function selectAdjacent() {
      var cornersOfSelectedCells = this.hot.getSelectedLast();
      var lastFilledInRowIndex = this.getIndexOfLastAdjacentFilledInRow(cornersOfSelectedCells);
      if (lastFilledInRowIndex === -1 || lastFilledInRowIndex === void 0) {
        return false;
      }
      this.addSelectionFromStartAreaToSpecificRowIndex(cornersOfSelectedCells, lastFilledInRowIndex);
      return true;
    }

    /**
     * Resets selection of dragged area.
     *
     * @private
     */
  }, {
    key: "resetSelectionOfDraggedArea",
    value: function resetSelectionOfDraggedArea() {
      this.handleDraggedCells = 0;
      this.hot.selection.highlight.getFill().clear();
    }

    /**
     * Redraws borders.
     *
     * @private
     * @param {CellCoords} coords `CellCoords` coord object.
     */
  }, {
    key: "redrawBorders",
    value: function redrawBorders(coords) {
      this.hot.selection.highlight.getFill().clear().add(this.hot.getSelectedRangeLast().from).add(this.hot.getSelectedRangeLast().to).add(coords).commit();
      this.hot.view.render();
    }

    /**
     * Get if mouse was dragged outside.
     *
     * @private
     * @param {MouseEvent} event `mousemove` event properties.
     * @returns {boolean}
     */
  }, {
    key: "getIfMouseWasDraggedOutside",
    value: function getIfMouseWasDraggedOutside(event) {
      var documentElement = this.hot.rootDocument.documentElement;
      var tableBottom = offset(this.hot.table).top - (this.hot.rootWindow.pageYOffset || documentElement.scrollTop) + outerHeight(this.hot.table);
      var tableRight = offset(this.hot.table).left - (this.hot.rootWindow.pageXOffset || documentElement.scrollLeft) + outerWidth(this.hot.table);
      return event.clientY > tableBottom && event.clientX <= tableRight;
    }

    /**
     * Bind the events used by the plugin.
     *
     * @private
     */
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this6 = this;
      var documentElement = this.hot.rootDocument.documentElement;
      this.eventManager.addEventListener(documentElement, 'mouseup', function () {
        return _this6.onMouseUp();
      });
      this.eventManager.addEventListener(documentElement, 'mousemove', function (event) {
        return _this6.onMouseMove(event);
      });
    }

    /**
     * On cell corner double click callback.
     *
     * @private
     */
  }, {
    key: "onCellCornerDblClick",
    value: function onCellCornerDblClick() {
      var selectionApplied = this.selectAdjacent();
      if (selectionApplied) {
        this.fillIn();
      }
    }

    /**
     * On after cell corner mouse down listener.
     *
     * @private
     */
  }, {
    key: "onAfterCellCornerMouseDown",
    value: function onAfterCellCornerMouseDown() {
      this.handleDraggedCells = 1;
      this.mouseDownOnCellCorner = true;
    }

    /**
     * On before cell mouse over listener.
     *
     * @private
     * @param {CellCoords} coords `CellCoords` coord object.
     */
  }, {
    key: "onBeforeCellMouseOver",
    value: function onBeforeCellMouseOver(coords) {
      if (this.mouseDownOnCellCorner && !this.hot.view.isMouseDown() && this.handleDraggedCells) {
        this.handleDraggedCells += 1;
        this.showBorder(coords);
        this.addNewRowIfNeeded();
      }
    }

    /**
     * On mouse up listener.
     *
     * @private
     */
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      if (this.handleDraggedCells) {
        if (this.handleDraggedCells > 1) {
          this.fillIn();
        }
        this.handleDraggedCells = 0;
        this.mouseDownOnCellCorner = false;
      }
    }

    /**
     * On mouse move listener.
     *
     * @private
     * @param {MouseEvent} event `mousemove` event properties.
     */
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var mouseWasDraggedOutside = this.getIfMouseWasDraggedOutside(event);
      if (this.addingStarted === false && this.handleDraggedCells > 0 && mouseWasDraggedOutside) {
        this.mouseDragOutside = true;
        this.addingStarted = true;
      } else {
        this.mouseDragOutside = false;
      }
      if (this.mouseDragOutside && this.autoInsertRow) {
        this.addRow();
      }
    }

    /**
     * Clears mapped settings.
     *
     * @private
     */
  }, {
    key: "clearMappedSettings",
    value: function clearMappedSettings() {
      this.directions.length = 0;
      this.autoInsertRow = false;
    }

    /**
     * Map settings.
     *
     * @private
     */
  }, {
    key: "mapSettings",
    value: function mapSettings() {
      var mappedSettings = getMappedFillHandleSetting(this.hot.getSettings().fillHandle);
      this.directions = mappedSettings.directions;
      this.autoInsertRow = mappedSettings.autoInsertRow;
    }

    /**
     * Destroys the plugin instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(Autofill.prototype), "destroy", this).call(this);
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
  }, {
    key: "SETTING_KEYS",
    get: function get() {
      return [PLUGIN_KEY].concat(SETTING_KEYS);
    }
  }]);
  return Autofill;
}(BasePlugin);