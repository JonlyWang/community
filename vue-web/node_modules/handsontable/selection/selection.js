"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
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
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.number.is-integer.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _highlight = _interopRequireDefault(require("./highlight/highlight"));
var _constants = require("./highlight/constants");
var _range = _interopRequireDefault(require("./range"));
var _object = require("./../helpers/object");
var _mixed = require("./../helpers/mixed");
var _array = require("./../helpers/array");
var _localHooks = _interopRequireDefault(require("./../mixins/localHooks"));
var _transformation = _interopRequireDefault(require("./transformation"));
var _utils = require("./utils");
var _templateLiteralTag = require("./../helpers/templateLiteralTag");
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * @class Selection
 * @util
 */var Selection = /*#__PURE__*/function () {
  function Selection(settings, tableProps) {
    var _this = this;
    _classCallCheck(this, Selection);
    /**
     * Handsontable settings instance.
     *
     * @type {GridSettings}
     */
    this.settings = settings;
    /**
     * An additional object with dynamically defined properties which describes table state.
     *
     * @type {object}
     */
    this.tableProps = tableProps;
    /**
     * The flag which determines if the selection is in progress.
     *
     * @type {boolean}
     */
    this.inProgress = false;
    /**
     * The flag indicates that selection was performed by clicking the corner overlay.
     *
     * @type {boolean}
     */
    this.selectedByCorner = false;
    /**
     * The collection of the selection layer levels where the whole row was selected using the row header or
     * the corner header.
     *
     * @type {Set.<number>}
     */
    this.selectedByRowHeader = new Set();
    /**
     * The collection of the selection layer levels where the whole column was selected using the column header or
     * the corner header.
     *
     * @type {Set.<number>}
     */
    this.selectedByColumnHeader = new Set();
    /**
     * Selection data layer (handle visual coordinates).
     *
     * @type {SelectionRange}
     */
    this.selectedRange = new _range.default(function (highlight, from, to) {
      return _this.tableProps.createCellRange(highlight, from, to);
    });
    /**
     * Visualization layer.
     *
     * @type {Highlight}
     */
    this.highlight = new _highlight.default({
      headerClassName: settings.currentHeaderClassName,
      activeHeaderClassName: settings.activeHeaderClassName,
      rowClassName: settings.currentRowClassName,
      columnClassName: settings.currentColClassName,
      disabledCellSelection: function disabledCellSelection(row, column) {
        return _this.tableProps.isDisabledCellSelection(row, column);
      },
      cellCornerVisible: function cellCornerVisible() {
        return _this.isCellCornerVisible.apply(_this, arguments);
      },
      areaCornerVisible: function areaCornerVisible() {
        return _this.isAreaCornerVisible.apply(_this, arguments);
      },
      visualToRenderableCoords: function visualToRenderableCoords(coords) {
        return _this.tableProps.visualToRenderableCoords(coords);
      },
      renderableToVisualCoords: function renderableToVisualCoords(coords) {
        return _this.tableProps.renderableToVisualCoords(coords);
      },
      createCellCoords: function createCellCoords(row, column) {
        return _this.tableProps.createCellCoords(row, column);
      },
      createCellRange: function createCellRange(highlight, from, to) {
        return _this.tableProps.createCellRange(highlight, from, to);
      },
      rowIndexMapper: function rowIndexMapper() {
        return _this.tableProps.rowIndexMapper();
      },
      columnIndexMapper: function columnIndexMapper() {
        return _this.tableProps.columnIndexMapper();
      }
    });
    /**
     * The module for modifying coordinates.
     *
     * @type {Transformation}
     */
    this.transformation = new _transformation.default(this.selectedRange, {
      countRows: function countRows() {
        return _this.tableProps.countRowsTranslated();
      },
      countCols: function countCols() {
        return _this.tableProps.countColsTranslated();
      },
      visualToRenderableCoords: function visualToRenderableCoords(coords) {
        return _this.tableProps.visualToRenderableCoords(coords);
      },
      renderableToVisualCoords: function renderableToVisualCoords(coords) {
        return _this.tableProps.renderableToVisualCoords(coords);
      },
      createCellCoords: function createCellCoords(row, column) {
        return _this.tableProps.createCellCoords(row, column);
      },
      fixedRowsBottom: function fixedRowsBottom() {
        return settings.fixedRowsBottom;
      },
      minSpareRows: function minSpareRows() {
        return settings.minSpareRows;
      },
      minSpareCols: function minSpareCols() {
        return settings.minSpareCols;
      },
      autoWrapRow: function autoWrapRow() {
        return settings.autoWrapRow;
      },
      autoWrapCol: function autoWrapCol() {
        return settings.autoWrapCol;
      }
    });
    this.transformation.addLocalHook('beforeTransformStart', function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _this.runLocalHooks.apply(_this, ['beforeModifyTransformStart'].concat(args));
    });
    this.transformation.addLocalHook('afterTransformStart', function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return _this.runLocalHooks.apply(_this, ['afterModifyTransformStart'].concat(args));
    });
    this.transformation.addLocalHook('beforeTransformEnd', function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return _this.runLocalHooks.apply(_this, ['beforeModifyTransformEnd'].concat(args));
    });
    this.transformation.addLocalHook('afterTransformEnd', function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return _this.runLocalHooks.apply(_this, ['afterModifyTransformEnd'].concat(args));
    });
    this.transformation.addLocalHook('insertRowRequire', function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return _this.runLocalHooks.apply(_this, ['insertRowRequire'].concat(args));
    });
    this.transformation.addLocalHook('insertColRequire', function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      return _this.runLocalHooks.apply(_this, ['insertColRequire'].concat(args));
    });
  }

  /**
   * Get data layer for current selection.
   *
   * @returns {SelectionRange}
   */
  _createClass(Selection, [{
    key: "getSelectedRange",
    value: function getSelectedRange() {
      return this.selectedRange;
    }

    /**
     * Indicate that selection process began. It sets internaly `.inProgress` property to `true`.
     */
  }, {
    key: "begin",
    value: function begin() {
      this.inProgress = true;
    }

    /**
     * Indicate that selection process finished. It sets internaly `.inProgress` property to `false`.
     */
  }, {
    key: "finish",
    value: function finish() {
      this.runLocalHooks('afterSelectionFinished', Array.from(this.selectedRange));
      this.inProgress = false;
    }

    /**
     * Check if the process of selecting the cell/cells is in progress.
     *
     * @returns {boolean}
     */
  }, {
    key: "isInProgress",
    value: function isInProgress() {
      return this.inProgress;
    }

    /**
     * Starts selection range on given coordinate object.
     *
     * @param {CellCoords} coords Visual coords.
     * @param {boolean} [multipleSelection] If `true`, selection will be worked in 'multiple' mode. This option works
     *                                      only when 'selectionMode' is set as 'multiple'. If the argument is not defined
     *                                      the default trigger will be used.
     * @param {boolean} [fragment=false] If `true`, the selection will be treated as a partial selection where the
     *                                   `setRangeEnd` method won't be called on every `setRangeStart` call.
     */
  }, {
    key: "setRangeStart",
    value: function setRangeStart(coords, multipleSelection) {
      var fragment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var isMultipleMode = this.settings.selectionMode === 'multiple';
      var isMultipleSelection = (0, _mixed.isUndefined)(multipleSelection) ? this.tableProps.getShortcutManager().isCtrlPressed() : multipleSelection;
      var isRowNegative = coords.row < 0;
      var isColumnNegative = coords.col < 0;
      var selectedByCorner = isRowNegative && isColumnNegative;
      // We are creating copy. We would like to modify just the start of the selection by below hook. Then original coords
      // should be handled by next methods.
      var coordsClone = coords.clone();
      this.selectedByCorner = selectedByCorner;
      this.runLocalHooks("beforeSetRangeStart".concat(fragment ? 'Only' : ''), coordsClone);
      if (!isMultipleMode || isMultipleMode && !isMultipleSelection && (0, _mixed.isUndefined)(multipleSelection)) {
        this.selectedRange.clear();
      }
      this.selectedRange.add(coordsClone);
      if (this.getLayerLevel() === 0) {
        this.selectedByRowHeader.clear();
        this.selectedByColumnHeader.clear();
      }
      if (!selectedByCorner && isColumnNegative) {
        this.selectedByRowHeader.add(this.getLayerLevel());
      }
      if (!selectedByCorner && isRowNegative) {
        this.selectedByColumnHeader.add(this.getLayerLevel());
      }
      if (!fragment) {
        this.setRangeEnd(coords);
      }
    }

    /**
     * Starts selection range on given coordinate object.
     *
     * @param {CellCoords} coords Visual coords.
     * @param {boolean} [multipleSelection] If `true`, selection will be worked in 'multiple' mode. This option works
     *                                      only when 'selectionMode' is set as 'multiple'. If the argument is not defined
     *                                      the default trigger will be used.
     */
  }, {
    key: "setRangeStartOnly",
    value: function setRangeStartOnly(coords, multipleSelection) {
      this.setRangeStart(coords, multipleSelection, true);
    }

    /**
     * Ends selection range on given coordinate object.
     *
     * @param {CellCoords} coords Visual coords.
     */
  }, {
    key: "setRangeEnd",
    value: function setRangeEnd(coords) {
      if (this.selectedRange.isEmpty()) {
        return;
      }

      // We are creating copy. We would like to modify just the end of the selection by below hook. Then original coords
      // should be handled by next methods.
      var coordsClone = coords.clone();
      this.runLocalHooks('beforeSetRangeEnd', coordsClone);
      this.begin();
      var cellRange = this.selectedRange.current();
      if (this.settings.selectionMode !== 'single') {
        cellRange.setTo(this.tableProps.createCellCoords(coordsClone.row, coordsClone.col));
      }

      // Set up current selection.
      this.highlight.getCell().clear();
      if (this.highlight.isEnabledFor(_constants.CELL_TYPE, cellRange.highlight)) {
        this.highlight.getCell().add(this.selectedRange.current().highlight).commit().syncWith(cellRange);
      }
      var layerLevel = this.getLayerLevel();

      // If the next layer level is lower than previous then clear all area and header highlights. This is the
      // indication that the new selection is performing.
      if (layerLevel < this.highlight.layerLevel) {
        (0, _array.arrayEach)(this.highlight.getAreas(), function (highlight) {
          return void highlight.clear();
        });
        (0, _array.arrayEach)(this.highlight.getHeaders(), function (highlight) {
          return void highlight.clear();
        });
        (0, _array.arrayEach)(this.highlight.getActiveHeaders(), function (highlight) {
          return void highlight.clear();
        });
      }
      this.highlight.useLayerLevel(layerLevel);
      var areaHighlight = this.highlight.createOrGetArea();
      var headerHighlight = this.highlight.createOrGetHeader();
      var activeHeaderHighlight = this.highlight.createOrGetActiveHeader();
      areaHighlight.clear();
      headerHighlight.clear();
      activeHeaderHighlight.clear();
      if (this.highlight.isEnabledFor(_constants.AREA_TYPE, cellRange.highlight) && (this.isMultiple() || layerLevel >= 1)) {
        areaHighlight.add(cellRange.from).add(cellRange.to).commit();
        if (layerLevel === 1) {
          // For single cell selection in the same layer, we do not create area selection to prevent blue background.
          // When non-consecutive selection is performed we have to add that missing area selection to the previous layer
          // based on previous coordinates. It only occurs when the previous selection wasn't select multiple cells.
          var previousRange = this.selectedRange.previous();
          this.highlight.useLayerLevel(layerLevel - 1).createOrGetArea().add(previousRange.from).commit()
          // Range may start with hidden indexes. Commit would not found start point (as we add just the `from` coords).
          .syncWith(previousRange);
          this.highlight.useLayerLevel(layerLevel);
        }
      }
      if (this.highlight.isEnabledFor(_constants.HEADER_TYPE, cellRange.highlight)) {
        // The header selection generally contains cell selection. In a case when all rows (or columns)
        // are hidden that visual coordinates are translated to renderable coordinates that do not exist.
        // Hence no header highlight is generated. In that case, to make a column (or a row) header
        // highlight, the row and column index has to point to the header (the negative value). See #7052.
        var areAnyRowsRendered = this.tableProps.countRowsTranslated() === 0;
        var areAnyColumnsRendered = this.tableProps.countColsTranslated() === 0;
        var headerCellRange = cellRange;
        if (areAnyRowsRendered || areAnyColumnsRendered) {
          headerCellRange = cellRange.clone();
        }
        if (areAnyRowsRendered) {
          headerCellRange.from.row = -1;
        }
        if (areAnyColumnsRendered) {
          headerCellRange.from.col = -1;
        }
        if (this.settings.selectionMode === 'single') {
          if (this.isSelectedByAnyHeader()) {
            headerCellRange.from.normalize();
          }
          headerHighlight.add(headerCellRange.from).commit();
        } else {
          headerHighlight.add(headerCellRange.from).add(headerCellRange.to).commit();
        }
        if (this.isEntireRowSelected()) {
          var isRowSelected = this.tableProps.countCols() === cellRange.getWidth();

          // Make sure that the whole row is selected (in case where selectionMode is set to 'single')
          if (isRowSelected) {
            activeHeaderHighlight.add(this.tableProps.createCellCoords(cellRange.from.row, -1)).add(this.tableProps.createCellCoords(cellRange.to.row, -1)).commit();
          }
        }
        if (this.isEntireColumnSelected()) {
          var isColumnSelected = this.tableProps.countRows() === cellRange.getHeight();

          // Make sure that the whole column is selected (in case where selectionMode is set to 'single')
          if (isColumnSelected) {
            activeHeaderHighlight.add(this.tableProps.createCellCoords(-1, cellRange.from.col)).add(this.tableProps.createCellCoords(-1, cellRange.to.col)).commit();
          }
        }
      }
      this.runLocalHooks('afterSetRangeEnd', coords);
    }

    /**
     * Returns information if we have a multiselection. This method check multiselection only on the latest layer of
     * the selection.
     *
     * @returns {boolean}
     */
  }, {
    key: "isMultiple",
    value: function isMultiple() {
      var isMultipleListener = (0, _object.createObjectPropListener)(!this.selectedRange.current().isSingle());
      this.runLocalHooks('afterIsMultipleSelection', isMultipleListener);
      return isMultipleListener.value;
    }

    /**
     * Selects cell relative to the current cell (if possible).
     *
     * @param {number} rowDelta Rows number to move, value can be passed as negative number.
     * @param {number} colDelta Columns number to move, value can be passed as negative number.
     * @param {boolean} [force=false] If `true` the new rows/columns will be created if necessary. Otherwise, row/column will
     *                        be created according to `minSpareRows/minSpareCols` settings of Handsontable.
     */
  }, {
    key: "transformStart",
    value: function transformStart(rowDelta, colDelta) {
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.setRangeStart(this.transformation.transformStart(rowDelta, colDelta, force));
    }

    /**
     * Sets selection end cell relative to the current selection end cell (if possible).
     *
     * @param {number} rowDelta Rows number to move, value can be passed as negative number.
     * @param {number} colDelta Columns number to move, value can be passed as negative number.
     */
  }, {
    key: "transformEnd",
    value: function transformEnd(rowDelta, colDelta) {
      this.setRangeEnd(this.transformation.transformEnd(rowDelta, colDelta));
    }

    /**
     * Returns currently used layer level.
     *
     * @returns {number} Returns layer level starting from 0. If no selection was added to the table -1 is returned.
     */
  }, {
    key: "getLayerLevel",
    value: function getLayerLevel() {
      return this.selectedRange.size() - 1;
    }

    /**
     * Returns `true` if currently there is a selection on the screen, `false` otherwise.
     *
     * @returns {boolean}
     */
  }, {
    key: "isSelected",
    value: function isSelected() {
      return !this.selectedRange.isEmpty();
    }

    /**
     * Returns `true` if the selection was applied by clicking to the row header. If the `layerLevel`
     * argument is passed then only that layer will be checked. Otherwise, it checks if any row header
     * was clicked on any selection layer level.
     *
     * @param {number} [layerLevel=this.getLayerLevel()] Selection layer level to check.
     * @returns {boolean}
     */
  }, {
    key: "isSelectedByRowHeader",
    value: function isSelectedByRowHeader() {
      var layerLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getLayerLevel();
      return !this.isSelectedByCorner(layerLevel) && this.isEntireRowSelected(layerLevel);
    }

    /**
     * Returns `true` if the selection consists of entire rows (including their headers). If the `layerLevel`
     * argument is passed then only that layer will be checked. Otherwise, it checks the selection for all layers.
     *
     * @param {number} [layerLevel=this.getLayerLevel()] Selection layer level to check.
     * @returns {boolean}
     */
  }, {
    key: "isEntireRowSelected",
    value: function isEntireRowSelected() {
      var layerLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getLayerLevel();
      return layerLevel === -1 ? this.selectedByRowHeader.size > 0 : this.selectedByRowHeader.has(layerLevel);
    }

    /**
     * Returns `true` if the selection was applied by clicking to the column header. If the `layerLevel`
     * argument is passed then only that layer will be checked. Otherwise, it checks if any column header
     * was clicked on any selection layer level.
     *
     * @param {number} [layerLevel=this.getLayerLevel()] Selection layer level to check.
     * @returns {boolean}
     */
  }, {
    key: "isSelectedByColumnHeader",
    value: function isSelectedByColumnHeader() {
      var layerLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getLayerLevel();
      return !this.isSelectedByCorner() && this.isEntireColumnSelected(layerLevel);
    }

    /**
     * Returns `true` if the selection consists of entire columns (including their headers). If the `layerLevel`
     * argument is passed then only that layer will be checked. Otherwise, it checks the selection for all layers.
     *
     * @param {number} [layerLevel=this.getLayerLevel()] Selection layer level to check.
     * @returns {boolean}
     */
  }, {
    key: "isEntireColumnSelected",
    value: function isEntireColumnSelected() {
      var layerLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getLayerLevel();
      return layerLevel === -1 ? this.selectedByColumnHeader.size > 0 : this.selectedByColumnHeader.has(layerLevel);
    }

    /**
     * Returns `true` if the selection was applied by clicking on the row or column header on any layer level.
     *
     * @returns {boolean}
     */
  }, {
    key: "isSelectedByAnyHeader",
    value: function isSelectedByAnyHeader() {
      return this.isSelectedByRowHeader(-1) || this.isSelectedByColumnHeader(-1) || this.isSelectedByCorner();
    }

    /**
     * Returns `true` if the selection was applied by clicking on the left-top corner overlay.
     *
     * @returns {boolean}
     */
  }, {
    key: "isSelectedByCorner",
    value: function isSelectedByCorner() {
      return this.selectedByCorner;
    }

    /**
     * Returns `true` if coords is within selection coords. This method iterates through all selection layers to check if
     * the coords object is within selection range.
     *
     * @param {CellCoords} coords The CellCoords instance with defined visual coordinates.
     * @returns {boolean}
     */
  }, {
    key: "inInSelection",
    value: function inInSelection(coords) {
      return this.selectedRange.includes(coords);
    }

    /**
     * Returns `true` if the cell corner should be visible.
     *
     * @private
     * @returns {boolean} `true` if the corner element has to be visible, `false` otherwise.
     */
  }, {
    key: "isCellCornerVisible",
    value: function isCellCornerVisible() {
      return this.settings.fillHandle && !this.tableProps.isEditorOpened() && !this.isMultiple();
    }

    /**
     * Returns `true` if the area corner should be visible.
     *
     * @param {number} layerLevel The layer level.
     * @returns {boolean} `true` if the corner element has to be visible, `false` otherwise.
     */
  }, {
    key: "isAreaCornerVisible",
    value: function isAreaCornerVisible(layerLevel) {
      if (Number.isInteger(layerLevel) && layerLevel !== this.getLayerLevel()) {
        return false;
      }
      return this.settings.fillHandle && !this.tableProps.isEditorOpened() && this.isMultiple();
    }

    /**
     * Clear the selection by resetting the collected ranges and highlights.
     */
  }, {
    key: "clear",
    value: function clear() {
      // TODO: collections selectedByColumnHeader and selectedByRowHeader should be clear too.
      this.selectedRange.clear();
      this.highlight.clear();
    }

    /**
     * Deselects all selected cells.
     */
  }, {
    key: "deselect",
    value: function deselect() {
      if (!this.isSelected()) {
        return;
      }
      this.inProgress = false;
      this.clear();
      this.runLocalHooks('afterDeselect');
    }

    /**
     * Select all cells.
     *
     * @param {boolean} [includeRowHeaders=false] `true` If the selection should include the row headers, `false`
     * otherwise.
     * @param {boolean} [includeColumnHeaders=false] `true` If the selection should include the column headers, `false`
     * otherwise.
     */
  }, {
    key: "selectAll",
    value: function selectAll() {
      var includeRowHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var includeColumnHeaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var nrOfRows = this.tableProps.countRows();
      var nrOfColumns = this.tableProps.countCols();

      // We can't select cells when there is no data.
      if (!includeRowHeaders && !includeColumnHeaders && (nrOfRows === 0 || nrOfColumns === 0)) {
        return;
      }
      var startCoords = this.tableProps.createCellCoords(includeColumnHeaders ? -1 : 0, includeRowHeaders ? -1 : 0);
      this.clear();
      this.setRangeStartOnly(startCoords);
      this.selectedByRowHeader.add(this.getLayerLevel());
      this.selectedByColumnHeader.add(this.getLayerLevel());
      this.setRangeEnd(this.tableProps.createCellCoords(nrOfRows - 1, nrOfColumns - 1));
      this.finish();
    }

    /**
     * Make multiple, non-contiguous selection specified by `row` and `column` values or a range of cells
     * finishing at `endRow`, `endColumn`. The method supports two input formats, first as an array of arrays such
     * as `[[rowStart, columnStart, rowEnd, columnEnd]]` and second format as an array of CellRange objects.
     * If the passed ranges have another format the exception will be thrown.
     *
     * @param {Array[]|CellRange[]} selectionRanges The coordinates which define what the cells should be selected.
     * @returns {boolean} Returns `true` if selection was successful, `false` otherwise.
     */
  }, {
    key: "selectCells",
    value: function selectCells(selectionRanges) {
      var _this2 = this;
      var selectionType = (0, _utils.detectSelectionType)(selectionRanges);
      if (selectionType === _utils.SELECTION_TYPE_EMPTY) {
        return false;
      } else if (selectionType === _utils.SELECTION_TYPE_UNRECOGNIZED) {
        throw new Error((0, _templateLiteralTag.toSingleLine)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Unsupported format of the selection ranges was passed. To select cells pass \n        the coordinates as an array of arrays ([[rowStart, columnStart/columnPropStart, rowEnd, \n        columnEnd/columnPropEnd]]) or as an array of CellRange objects."], ["Unsupported format of the selection ranges was passed. To select cells pass\\x20\n        the coordinates as an array of arrays ([[rowStart, columnStart/columnPropStart, rowEnd,\\x20\n        columnEnd/columnPropEnd]]) or as an array of CellRange objects."]))));
      }
      var selectionSchemaNormalizer = (0, _utils.normalizeSelectionFactory)(selectionType, {
        propToCol: function propToCol(prop) {
          return _this2.tableProps.propToCol(prop);
        },
        keepDirection: true
      });
      var nrOfRows = this.tableProps.countRows();
      var nrOfColumns = this.tableProps.countCols();

      // Check if every layer of the coordinates are valid.
      var isValid = !selectionRanges.some(function (selection) {
        var _selectionSchemaNorma = selectionSchemaNormalizer(selection),
          _selectionSchemaNorma2 = _slicedToArray(_selectionSchemaNorma, 4),
          rowStart = _selectionSchemaNorma2[0],
          columnStart = _selectionSchemaNorma2[1],
          rowEnd = _selectionSchemaNorma2[2],
          columnEnd = _selectionSchemaNorma2[3];
        var _isValid = (0, _utils.isValidCoord)(rowStart, nrOfRows) && (0, _utils.isValidCoord)(columnStart, nrOfColumns) && (0, _utils.isValidCoord)(rowEnd, nrOfRows) && (0, _utils.isValidCoord)(columnEnd, nrOfColumns);
        return !_isValid;
      });
      if (isValid) {
        this.clear();
        (0, _array.arrayEach)(selectionRanges, function (selection) {
          var _selectionSchemaNorma3 = selectionSchemaNormalizer(selection),
            _selectionSchemaNorma4 = _slicedToArray(_selectionSchemaNorma3, 4),
            rowStart = _selectionSchemaNorma4[0],
            columnStart = _selectionSchemaNorma4[1],
            rowEnd = _selectionSchemaNorma4[2],
            columnEnd = _selectionSchemaNorma4[3];
          _this2.setRangeStartOnly(_this2.tableProps.createCellCoords(rowStart, columnStart), false);
          _this2.setRangeEnd(_this2.tableProps.createCellCoords(rowEnd, columnEnd));
          _this2.finish();
        });
      }
      return isValid;
    }

    /**
     * Select column specified by `startColumn` visual index or column property or a range of columns finishing at
     * `endColumn`.
     *
     * @param {number|string} startColumn Visual column index or column property from which the selection starts.
     * @param {number|string} [endColumn] Visual column index or column property from to the selection finishes.
     * @param {number} [headerLevel=-1] A row header index that triggers the column selection. The value can
     *                                  take -1 to -N, where -1 means the header closest to the cells.
     *
     * @returns {boolean} Returns `true` if selection was successful, `false` otherwise.
     */
  }, {
    key: "selectColumns",
    value: function selectColumns(startColumn) {
      var endColumn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : startColumn;
      var headerLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var start = typeof startColumn === 'string' ? this.tableProps.propToCol(startColumn) : startColumn;
      var end = typeof endColumn === 'string' ? this.tableProps.propToCol(endColumn) : endColumn;
      var nrOfColumns = this.tableProps.countCols();
      var nrOfRows = this.tableProps.countRows();
      var isValid = (0, _utils.isValidCoord)(start, nrOfColumns) && (0, _utils.isValidCoord)(end, nrOfColumns);
      if (isValid) {
        this.setRangeStartOnly(this.tableProps.createCellCoords(headerLevel, start));
        this.setRangeEnd(this.tableProps.createCellCoords(nrOfRows - 1, end));
        this.finish();
      }
      return isValid;
    }

    /**
     * Select row specified by `startRow` visual index or a range of rows finishing at `endRow`.
     *
     * @param {number} startRow Visual row index from which the selection starts.
     * @param {number} [endRow] Visual row index from to the selection finishes.
     * @param {number} [headerLevel=-1] A column header index that triggers the row selection.
     *                                  The value can take -1 to -N, where -1 means the header
     *                                  closest to the cells.
     * @returns {boolean} Returns `true` if selection was successful, `false` otherwise.
     */
  }, {
    key: "selectRows",
    value: function selectRows(startRow) {
      var endRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : startRow;
      var headerLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var nrOfRows = this.tableProps.countRows();
      var nrOfColumns = this.tableProps.countCols();
      var isValid = (0, _utils.isValidCoord)(startRow, nrOfRows) && (0, _utils.isValidCoord)(endRow, nrOfRows);
      if (isValid) {
        this.setRangeStartOnly(this.tableProps.createCellCoords(startRow, headerLevel));
        this.setRangeEnd(this.tableProps.createCellCoords(endRow, nrOfColumns - 1));
        this.finish();
      }
      return isValid;
    }

    /**
     * Rewrite the rendered state of the selection as visual selection may have a new representation in the DOM.
     */
  }, {
    key: "refresh",
    value: function refresh() {
      var customSelections = this.highlight.getCustomSelections();
      customSelections.forEach(function (customSelection) {
        customSelection.commit();
      });
      if (!this.isSelected()) {
        return;
      }
      var cellHighlight = this.highlight.getCell();
      var currentLayer = this.getLayerLevel();
      cellHighlight.commit().syncWith(this.selectedRange.current());

      // Rewriting rendered ranges going through all layers.
      for (var layerLevel = 0; layerLevel < this.selectedRange.size(); layerLevel += 1) {
        this.highlight.useLayerLevel(layerLevel);
        var areaHighlight = this.highlight.createOrGetArea();
        var headerHighlight = this.highlight.createOrGetHeader();
        var activeHeaderHighlight = this.highlight.createOrGetActiveHeader();
        areaHighlight.commit();
        headerHighlight.commit();
        activeHeaderHighlight.commit();
      }

      // Reverting starting layer for the Highlight.
      this.highlight.useLayerLevel(currentLayer);
    }
  }]);
  return Selection;
}();
(0, _object.mixin)(Selection, _localHooks.default);
var _default = Selection;
exports.default = _default;