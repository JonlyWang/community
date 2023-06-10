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
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.exec.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import { hasClass, index, offset, removeClass, removeTextNodes, overlayContainsElement, closest, outerHeight, outerWidth, innerHeight, isVisible as _isVisible } from "../../../helpers/dom/element.mjs";
import { isFunction } from "../../../helpers/function.mjs";
import ColumnFilter from "./filter/column.mjs";
import RowFilter from "./filter/row.mjs";
import { Renderer } from "./renderer/index.mjs";
import ColumnUtils from "./utils/column.mjs";
import RowUtils from "./utils/row.mjs";
import { CLONE_TOP, CLONE_BOTTOM, CLONE_INLINE_START, CLONE_TOP_INLINE_START_CORNER, CLONE_BOTTOM_INLINE_START_CORNER } from "./overlay/index.mjs"; /**
                                                                                                                                                     * @todo These mixes are never added to the class Table, however their members are used here.
                                                                                                                                                     * @todo Continue: Potentially it works only, because some of these mixes are added to every inherited class.
                                                                                                                                                     * @todo Refactoring, move code from `if(this.isMaster)` into MasterTable, and others like that.
                                                                                                                                                     * @mixes stickyColumnsStart
                                                                                                                                                     * @mixes stickyRowsBottom
                                                                                                                                                     * @mixes stickyRowsTop
                                                                                                                                                     * @mixes calculatedRows
                                                                                                                                                     * @mixes calculatedColumns
                                                                                                                                                     * @abstract
                                                                                                                                                     */
var Table = /*#__PURE__*/function () {
  /**
   * The walkontable settings.
   *
   * @protected
   * @type {Settings}
   */

  /**
   * Indicates if the table has height bigger than 0px.
   *
   * @type {boolean}
   */

  /**
   * Indicates if the table has width bigger than 0px.
   *
   * @type {boolean}
   */

  /**
   * Indicates if the table is visible. By visible, it means that the holder
   * element has CSS 'display' property different than 'none'.
   *
   * @type {boolean}
   */

  /**
   *
   * @abstract
   * @param {TableDao} dataAccessObject The data access object.
   * @param {FacadeGetter} facadeGetter Function which return proper facade.
   * @param {DomBindings} domBindings Bindings into DOM.
   * @param {Settings} wtSettings The Walkontable settings.
   * @param {'master'|CLONE_TYPES_ENUM} name Overlay name.
   */
  function Table(dataAccessObject, facadeGetter, domBindings, wtSettings, name) {
    var _this = this;
    _classCallCheck(this, Table);
    _defineProperty(this, "wtSettings", null);
    _defineProperty(this, "domBindings", void 0);
    _defineProperty(this, "TBODY", null);
    _defineProperty(this, "THEAD", null);
    _defineProperty(this, "COLGROUP", null);
    _defineProperty(this, "hasTableHeight", true);
    _defineProperty(this, "hasTableWidth", true);
    _defineProperty(this, "isTableVisible", false);
    _defineProperty(this, "tableOffset", 0);
    _defineProperty(this, "holderOffset", 0);
    this.domBindings = domBindings;
    /**
     * Indicates if this instance is of type `MasterTable` (i.e. It is NOT an overlay).
     *
     * @type {boolean}
     */
    this.isMaster = name === 'master';
    this.name = name;
    this.dataAccessObject = dataAccessObject;
    this.facadeGetter = facadeGetter;
    this.wtSettings = wtSettings;

    // legacy support
    this.instance = this.dataAccessObject.wot; // TODO refactoring: it might be removed here, and provides legacy support through facade.
    this.wot = this.dataAccessObject.wot;
    this.TABLE = domBindings.rootTable;
    removeTextNodes(this.TABLE);

    // TODO refactoring, to recognize the legitimacy of moving them into domBidings
    this.spreader = this.createSpreader(this.TABLE);
    this.hider = this.createHider(this.spreader);
    this.holder = this.createHolder(this.hider);
    this.wtRootElement = this.holder.parentNode;
    if (this.isMaster) {
      this.alignOverlaysWithTrimmingContainer(); // todo wow, It calls method from child class (MasterTable).
    }

    this.fixTableDomTree();
    this.rowFilter = null; // TODO refactoring, eliminate all (re)creations of this object, then updates state when needed.
    this.columnFilter = null; // TODO refactoring, eliminate all (re)creations of this object, then updates state when needed.
    this.correctHeaderWidth = false;
    var origRowHeaderWidth = this.wtSettings.getSettingPure('rowHeaderWidth');

    // Fix for jumping row headers (https://github.com/handsontable/handsontable/issues/3850)
    this.wtSettings.update('rowHeaderWidth', function () {
      return _this._modifyRowHeaderWidth(origRowHeaderWidth);
    });
    this.rowUtils = new RowUtils(this.dataAccessObject, this.wtSettings); // TODO refactoring, It can be passed through IOC.
    this.columnUtils = new ColumnUtils(this.dataAccessObject, this.wtSettings); // TODO refactoring, It can be passed through IOC.

    this.tableRenderer = new Renderer({
      // TODO refactoring, It can be passed through IOC.
      TABLE: this.TABLE,
      THEAD: this.THEAD,
      COLGROUP: this.COLGROUP,
      TBODY: this.TBODY,
      rowUtils: this.rowUtils,
      columnUtils: this.columnUtils,
      cellRenderer: this.wtSettings.getSettingPure('cellRenderer')
    });
  }

  /**
   * Returns a boolean that is true if this Table represents a specific overlay, identified by the overlay name.
   * For MasterTable, it returns false.
   *
   * @param {string} overlayTypeName The overlay type.
   * @returns {boolean}
   */
  _createClass(Table, [{
    key: "is",
    value: function is(overlayTypeName) {
      // todo refactoring: eliminate all protected and private usages
      return this.name === overlayTypeName;
    }

    /**
     *
     */
  }, {
    key: "fixTableDomTree",
    value: function fixTableDomTree() {
      var rootDocument = this.domBindings.rootDocument;
      this.TBODY = this.TABLE.querySelector('tbody');
      if (!this.TBODY) {
        this.TBODY = rootDocument.createElement('tbody');
        this.TABLE.appendChild(this.TBODY);
      }
      this.THEAD = this.TABLE.querySelector('thead');
      if (!this.THEAD) {
        this.THEAD = rootDocument.createElement('thead');
        this.TABLE.insertBefore(this.THEAD, this.TBODY);
      }
      this.COLGROUP = this.TABLE.querySelector('colgroup');
      if (!this.COLGROUP) {
        this.COLGROUP = rootDocument.createElement('colgroup');
        this.TABLE.insertBefore(this.COLGROUP, this.THEAD);
      }
    }

    /**
     * @param {HTMLTableElement} table An element to process.
     * @returns {HTMLElement}
     */
  }, {
    key: "createSpreader",
    value: function createSpreader(table) {
      var parent = table.parentNode;
      var spreader;
      if (!parent || parent.nodeType !== Node.ELEMENT_NODE || !hasClass(parent, 'wtHolder')) {
        spreader = this.domBindings.rootDocument.createElement('div');
        spreader.className = 'wtSpreader';
        if (parent) {
          // if TABLE is detached (e.g. in Jasmine test), it has no parentNode so we cannot attach holder to it
          parent.insertBefore(spreader, table);
        }
        spreader.appendChild(table);
      }
      spreader.style.position = 'relative';
      return spreader;
    }

    /**
     * @param {HTMLElement} spreader An element to the hider element is injected.
     * @returns {HTMLElement}
     */
  }, {
    key: "createHider",
    value: function createHider(spreader) {
      var parent = spreader.parentNode;
      var hider;
      if (!parent || parent.nodeType !== Node.ELEMENT_NODE || !hasClass(parent, 'wtHolder')) {
        hider = this.domBindings.rootDocument.createElement('div');
        hider.className = 'wtHider';
        if (parent) {
          // if TABLE is detached (e.g. in Jasmine test), it has no parentNode so we cannot attach holder to it
          parent.insertBefore(hider, spreader);
        }
        hider.appendChild(spreader);
      }
      return hider;
    }

    /**
     *
     * @param {HTMLElement} hider An element to the holder element is injected.
     * @returns {HTMLElement}
     */
  }, {
    key: "createHolder",
    value: function createHolder(hider) {
      var parent = hider.parentNode;
      var holder;
      if (!parent || parent.nodeType !== Node.ELEMENT_NODE || !hasClass(parent, 'wtHolder')) {
        holder = this.domBindings.rootDocument.createElement('div');
        holder.style.position = 'relative';
        holder.className = 'wtHolder';
        if (parent) {
          // if TABLE is detached (e.g. in Jasmine test), it has no parentNode so we cannot attach holder to it
          parent.insertBefore(holder, hider);
        }
        if (this.isMaster) {
          holder.parentNode.className += 'ht_master handsontable';
          holder.parentNode.setAttribute('dir', this.wtSettings.getSettingPure('rtlMode') ? 'rtl' : 'ltr');
        }
        holder.appendChild(hider);
      }
      return holder;
    }

    /**
     * Redraws the table.
     *
     * @param {boolean} [fastDraw=false] If TRUE, will try to avoid full redraw and only update the border positions.
     *                                   If FALSE or UNDEFINED, will perform a full redraw.
     * @returns {Table}
     */
  }, {
    key: "draw",
    value: function draw() {
      var fastDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var wtSettings = this.wtSettings;
      var _this$dataAccessObjec = this.dataAccessObject,
        wtOverlays = _this$dataAccessObjec.wtOverlays,
        wtViewport = _this$dataAccessObjec.wtViewport;
      var totalRows = wtSettings.getSetting('totalRows');
      var totalColumns = wtSettings.getSetting('totalColumns');
      var rowHeaders = wtSettings.getSetting('rowHeaders');
      var rowHeadersCount = rowHeaders.length;
      var columnHeaders = wtSettings.getSetting('columnHeaders');
      var columnHeadersCount = columnHeaders.length;
      var syncScroll = false;
      var runFastDraw = fastDraw;
      if (this.isMaster) {
        this.holderOffset = offset(this.holder);
        runFastDraw = wtViewport.createRenderCalculators(runFastDraw);
        if (rowHeadersCount && !wtSettings.getSetting('fixedColumnsStart')) {
          var leftScrollPos = wtOverlays.inlineStartOverlay.getScrollPosition();
          var previousState = this.correctHeaderWidth;
          this.correctHeaderWidth = leftScrollPos !== 0;
          if (previousState !== this.correctHeaderWidth) {
            runFastDraw = false;
          }
        }
      }
      if (this.isMaster) {
        syncScroll = wtOverlays.updateStateOfRendering();
      }
      if (runFastDraw) {
        if (this.isMaster) {
          // in case we only scrolled without redraw, update visible rows information in oldRowsCalculator
          wtViewport.createVisibleCalculators();
        }
        if (wtOverlays) {
          wtOverlays.refresh(true);
        }
      } else {
        if (this.isMaster) {
          this.tableOffset = offset(this.TABLE);
        } else {
          this.tableOffset = this.dataAccessObject.parentTableOffset;
        }
        var startRow = totalRows > 0 ? this.getFirstRenderedRow() : 0;
        var startColumn = totalColumns > 0 ? this.getFirstRenderedColumn() : 0;
        this.rowFilter = new RowFilter(startRow, totalRows, columnHeadersCount);
        this.columnFilter = new ColumnFilter(startColumn, totalColumns, rowHeadersCount);
        var performRedraw = true;

        // Only master table rendering can be skipped
        if (this.isMaster) {
          this.alignOverlaysWithTrimmingContainer(); // todo It calls method from child class (MasterTable).
          var skipRender = {};
          this.wtSettings.getSetting('beforeDraw', true, skipRender);
          performRedraw = skipRender.skipRender !== true;
        }
        if (performRedraw) {
          this.tableRenderer.setHeaderContentRenderers(rowHeaders, columnHeaders);
          if (this.is(CLONE_BOTTOM) || this.is(CLONE_BOTTOM_INLINE_START_CORNER)) {
            // do NOT render headers on the bottom or bottom-left corner overlay
            this.tableRenderer.setHeaderContentRenderers(rowHeaders, []);
          }
          this.resetOversizedRows();
          this.tableRenderer.setViewportSize(this.getRenderedRowsCount(), this.getRenderedColumnsCount()).setFilters(this.rowFilter, this.columnFilter).render();
          var workspaceWidth;
          if (this.isMaster) {
            workspaceWidth = this.dataAccessObject.workspaceWidth;
            this.dataAccessObject.wtViewport.containerWidth = null;
            this.markOversizedColumnHeaders();
          }
          this.adjustColumnHeaderHeights();
          if (this.isMaster || this.is(CLONE_BOTTOM)) {
            this.markOversizedRows();
          }
          if (this.isMaster) {
            this.dataAccessObject.wtViewport.createVisibleCalculators();
            this.dataAccessObject.wtOverlays.refresh(false);
            this.dataAccessObject.wtOverlays.applyToDOM();
            var hiderWidth = outerWidth(this.hider);
            var tableWidth = outerWidth(this.TABLE);
            if (hiderWidth !== 0 && tableWidth !== hiderWidth) {
              // Recalculate the column widths, if width changes made in the overlays removed the scrollbar, thus changing the viewport width.
              this.columnUtils.calculateWidths();
              this.tableRenderer.renderer.colGroup.render();
            }
            if (workspaceWidth !== this.dataAccessObject.wtViewport.getWorkspaceWidth()) {
              // workspace width changed though to shown/hidden vertical scrollbar. Let's reapply stretching
              this.dataAccessObject.wtViewport.containerWidth = null;
              this.columnUtils.calculateWidths();
              this.tableRenderer.renderer.colGroup.render();
            }
            this.wtSettings.getSetting('onDraw', true);
          } else if (this.is(CLONE_BOTTOM)) {
            this.dataAccessObject.cloneSource.wtOverlays.adjustElementsSize();
          }
        }
      }
      var positionChanged = false;
      if (this.isMaster) {
        positionChanged = wtOverlays.topOverlay.resetFixedPosition();
        if (wtOverlays.bottomOverlay.clone) {
          positionChanged = wtOverlays.bottomOverlay.resetFixedPosition() || positionChanged;
        }
        positionChanged = wtOverlays.inlineStartOverlay.resetFixedPosition() || positionChanged;
        if (wtOverlays.topInlineStartCornerOverlay) {
          wtOverlays.topInlineStartCornerOverlay.resetFixedPosition();
        }
        if (wtOverlays.bottomInlineStartCornerOverlay && wtOverlays.bottomInlineStartCornerOverlay.clone) {
          wtOverlays.bottomInlineStartCornerOverlay.resetFixedPosition();
        }
      }
      if (positionChanged) {
        // It refreshes the cells borders caused by a 1px shift (introduced by overlays which add or
        // remove `innerBorderTop` and `innerBorderInlineStart` CSS classes to the DOM element. This happens
        // when there is a switch between rendering from 0 to N rows/columns and vice versa).
        wtOverlays.refreshAll(); // `refreshAll()` internally already calls `refreshSelections()` method
        wtOverlays.adjustElementsSize();
      } else {
        this.refreshSelections(runFastDraw);
      }
      if (syncScroll) {
        wtOverlays.syncScrollWithMaster();
      }
      this.dataAccessObject.drawn = true;
      return this;
    }

    /**
     * @param {number} col The visual column index.
     */
  }, {
    key: "markIfOversizedColumnHeader",
    value: function markIfOversizedColumnHeader(col) {
      var sourceColIndex = this.columnFilter.renderedToSource(col);
      var level = this.wtSettings.getSetting('columnHeaders').length;
      var defaultRowHeight = this.wtSettings.getSetting('defaultRowHeight');
      var previousColHeaderHeight;
      var currentHeader;
      var currentHeaderHeight;
      var columnHeaderHeightSetting = this.wtSettings.getSetting('columnHeaderHeight') || [];
      while (level) {
        level -= 1;
        previousColHeaderHeight = this.getColumnHeaderHeight(level);
        currentHeader = this.getColumnHeader(sourceColIndex, level);
        if (!currentHeader) {
          /* eslint-disable no-continue */
          continue;
        }
        currentHeaderHeight = innerHeight(currentHeader);
        if (!previousColHeaderHeight && defaultRowHeight < currentHeaderHeight || previousColHeaderHeight < currentHeaderHeight) {
          this.dataAccessObject.wtViewport.oversizedColumnHeaders[level] = currentHeaderHeight;
        }
        if (Array.isArray(columnHeaderHeightSetting)) {
          if (columnHeaderHeightSetting[level] !== null && columnHeaderHeightSetting[level] !== void 0) {
            this.dataAccessObject.wtViewport.oversizedColumnHeaders[level] = columnHeaderHeightSetting[level];
          }
        } else if (!isNaN(columnHeaderHeightSetting)) {
          this.dataAccessObject.wtViewport.oversizedColumnHeaders[level] = columnHeaderHeightSetting;
        }
        if (this.dataAccessObject.wtViewport.oversizedColumnHeaders[level] < (columnHeaderHeightSetting[level] || columnHeaderHeightSetting)) {
          this.dataAccessObject.wtViewport.oversizedColumnHeaders[level] = columnHeaderHeightSetting[level] || columnHeaderHeightSetting; // eslint-disable-line max-len
        }
      }
    }

    /**
     *
     */
  }, {
    key: "adjustColumnHeaderHeights",
    value: function adjustColumnHeaderHeights() {
      var wtSettings = this.wtSettings;
      var children = this.THEAD.childNodes;
      var oversizedColumnHeaders = this.dataAccessObject.wtViewport.oversizedColumnHeaders;
      var columnHeaders = wtSettings.getSetting('columnHeaders');
      for (var i = 0, len = columnHeaders.length; i < len; i++) {
        if (oversizedColumnHeaders[i]) {
          if (!children[i] || children[i].childNodes.length === 0) {
            return;
          }
          children[i].childNodes[0].style.height = "".concat(oversizedColumnHeaders[i], "px");
        }
      }
    }

    /**
     * Resets cache of row heights. The cache should be cached for each render cycle in a case
     * when new cell values have content which increases/decreases cell height.
     */
  }, {
    key: "resetOversizedRows",
    value: function resetOversizedRows() {
      var wtSettings = this.wtSettings;
      var wtViewport = this.dataAccessObject.wtViewport;
      if (!this.isMaster && !this.is(CLONE_BOTTOM)) {
        return;
      }
      if (!wtSettings.getSetting('externalRowCalculator')) {
        var rowsToRender = this.getRenderedRowsCount();

        // Reset the oversized row cache for rendered rows
        for (var visibleRowIndex = 0; visibleRowIndex < rowsToRender; visibleRowIndex++) {
          var sourceRow = this.rowFilter.renderedToSource(visibleRowIndex);
          if (wtViewport.oversizedRows && wtViewport.oversizedRows[sourceRow]) {
            wtViewport.oversizedRows[sourceRow] = void 0;
          }
        }
      }
    }

    /**
     * @param {string} className The CSS class name to remove from the table cells.
     */
  }, {
    key: "removeClassFromCells",
    value: function removeClassFromCells(className) {
      var nodes = this.TABLE.querySelectorAll(".".concat(className));
      for (var i = 0, len = nodes.length; i < len; i++) {
        removeClass(nodes[i], className);
      }
    }

    /**
     * Refresh the table selection by re-rendering Selection instances connected with that instance.
     *
     * @param {boolean} fastDraw If fast drawing is enabled than additionally className clearing is applied.
     */
  }, {
    key: "refreshSelections",
    value: function refreshSelections(fastDraw) {
      var wtSettings = this.wtSettings;
      var selections = this.dataAccessObject.selections;
      if (!selections) {
        return;
      }
      var highlights = Array.from(selections);
      var len = highlights.length;
      if (fastDraw) {
        var classesToRemove = [];
        for (var i = 0; i < len; i++) {
          var _highlights$i$setting = highlights[i].settings,
            highlightHeaderClassName = _highlights$i$setting.highlightHeaderClassName,
            highlightRowClassName = _highlights$i$setting.highlightRowClassName,
            highlightColumnClassName = _highlights$i$setting.highlightColumnClassName;
          var classNames = highlights[i].classNames;
          var classNamesLength = classNames.length;
          for (var j = 0; j < classNamesLength; j++) {
            if (!classesToRemove.includes(classNames[j])) {
              classesToRemove.push(classNames[j]);
            }
          }
          if (highlightHeaderClassName && !classesToRemove.includes(highlightHeaderClassName)) {
            classesToRemove.push(highlightHeaderClassName);
          }
          if (highlightRowClassName && !classesToRemove.includes(highlightRowClassName)) {
            classesToRemove.push(highlightRowClassName);
          }
          if (highlightColumnClassName && !classesToRemove.includes(highlightColumnClassName)) {
            classesToRemove.push(highlightColumnClassName);
          }
        }
        var additionalClassesToRemove = wtSettings.getSetting('onBeforeRemoveCellClassNames');
        if (Array.isArray(additionalClassesToRemove)) {
          for (var _i = 0; _i < additionalClassesToRemove.length; _i++) {
            classesToRemove.push(additionalClassesToRemove[_i]);
          }
        }
        var classesToRemoveLength = classesToRemove.length;
        for (var _i2 = 0; _i2 < classesToRemoveLength; _i2++) {
          // there was no rerender, so we need to remove classNames by ourselves
          this.removeClassFromCells(classesToRemove[_i2]);
        }
      }
      for (var _i3 = 0; _i3 < len; _i3++) {
        highlights[_i3].draw(this.facadeGetter(), fastDraw);
      }
    }

    /**
     * Get cell element at coords.
     * Negative coords.row or coords.col are used to retrieve header cells. If there are multiple header levels, the
     * negative value corresponds to the distance from the working area. For example, when there are 3 levels of column
     * headers, coords.col=-1 corresponds to the most inner header element, while coords.col=-3 corresponds to the
     * outmost header element.
     *
     * In case an element for the coords is not rendered, the method returns an error code.
     * To produce the error code, the input parameters are validated in the order in which they
     * are given. Thus, if both the row and the column coords are out of the rendered bounds,
     * the method returns the error code for the row.
     *
     * @param {CellCoords} coords The cell coordinates.
     * @returns {HTMLElement|number} HTMLElement on success or Number one of the exit codes on error:
     *  -1 row before viewport
     *  -2 row after viewport
     *  -3 column before viewport
     *  -4 column after viewport.
     */
  }, {
    key: "getCell",
    value: function getCell(coords) {
      var row = coords.row;
      var column = coords.col;
      var hookResult = this.wtSettings.getSetting('onModifyGetCellCoords', row, column);
      if (hookResult && Array.isArray(hookResult)) {
        var _hookResult = _slicedToArray(hookResult, 2);
        row = _hookResult[0];
        column = _hookResult[1];
      }
      if (this.isRowBeforeRenderedRows(row)) {
        // row before rendered rows
        return -1;
      } else if (this.isRowAfterRenderedRows(row)) {
        // row after rendered rows
        return -2;
      } else if (this.isColumnBeforeRenderedColumns(column)) {
        // column before rendered columns
        return -3;
      } else if (this.isColumnAfterRenderedColumns(column)) {
        // column after rendered columns
        return -4;
      }
      var TR;
      if (row < 0) {
        TR = this.THEAD.childNodes[this.rowFilter.sourceRowToVisibleColHeadedRow(row)];
      } else {
        TR = this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
      }
      if (!TR && row >= 0) {
        throw new Error('TR was expected to be rendered but is not');
      }
      var TD = TR.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(column)];
      if (!TD && column >= 0) {
        throw new Error('TD or TH was expected to be rendered but is not');
      }
      return TD;
    }

    /**
     * GetColumnHeader.
     *
     * @param {number} col Column index.
     * @param {number} [level=0] Header level (0 = most distant to the table).
     * @returns {object} HTMLElement on success or undefined on error.
     */
  }, {
    key: "getColumnHeader",
    value: function getColumnHeader(col) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var TR = this.THEAD.childNodes[level];
      return TR === null || TR === void 0 ? void 0 : TR.childNodes[this.columnFilter.sourceColumnToVisibleRowHeadedColumn(col)];
    }

    /**
     * Gets all columns headers (TH elements) from the table.
     *
     * @param {number} column A source column index.
     * @returns {HTMLTableCellElement[]}
     */
  }, {
    key: "getColumnHeaders",
    value: function getColumnHeaders(column) {
      var THs = [];
      var visibleColumn = this.columnFilter.sourceColumnToVisibleRowHeadedColumn(column);
      this.THEAD.childNodes.forEach(function (TR) {
        var TH = TR.childNodes[visibleColumn];
        if (TH) {
          THs.push(TH);
        }
      });
      return THs;
    }

    /**
     * GetRowHeader.
     *
     * @param {number} row Row index.
     * @param {number} [level=0] Header level (0 = most distant to the table).
     * @returns {HTMLElement} HTMLElement on success or Number one of the exit codes on error: `null table doesn't have row headers`.
     */
  }, {
    key: "getRowHeader",
    value: function getRowHeader(row) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (this.columnFilter.sourceColumnToVisibleRowHeadedColumn(0) === 0) {
        return;
      }
      var rowHeadersCount = this.wtSettings.getSetting('rowHeaders').length;
      if (level >= rowHeadersCount) {
        return;
      }
      var TR = this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
      return TR === null || TR === void 0 ? void 0 : TR.childNodes[level];
    }

    /**
     * Gets all rows headers (TH elements) from the table.
     *
     * @param {number} row A source row index.
     * @returns {HTMLTableCellElement[]}
     */
  }, {
    key: "getRowHeaders",
    value: function getRowHeaders(row) {
      if (this.columnFilter.sourceColumnToVisibleRowHeadedColumn(0) === 0) {
        return [];
      }
      var THs = [];
      var rowHeadersCount = this.wtSettings.getSetting('rowHeaders').length;
      for (var renderedRowIndex = 0; renderedRowIndex < rowHeadersCount; renderedRowIndex++) {
        var TR = this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
        var TH = TR === null || TR === void 0 ? void 0 : TR.childNodes[renderedRowIndex];
        if (TH) {
          THs.push(TH);
        }
      }
      return THs;
    }

    /**
     * Returns cell coords object for a given TD (or a child element of a TD element).
     *
     * @param {HTMLTableCellElement} TD A cell DOM element (or a child of one).
     * @returns {CellCoords|null} The coordinates of the provided TD element (or the closest TD element) or null, if the provided element is not applicable.
     */
  }, {
    key: "getCoords",
    value: function getCoords(TD) {
      var cellElement = TD;
      if (cellElement.nodeName !== 'TD' && cellElement.nodeName !== 'TH') {
        cellElement = closest(cellElement, ['TD', 'TH']);
      }
      if (cellElement === null) {
        return null;
      }
      var TR = cellElement.parentNode;
      var CONTAINER = TR.parentNode;
      var row = index(TR);
      var col = cellElement.cellIndex;
      if (overlayContainsElement(CLONE_TOP_INLINE_START_CORNER, cellElement, this.wtRootElement) || overlayContainsElement(CLONE_TOP, cellElement, this.wtRootElement)) {
        if (CONTAINER.nodeName === 'THEAD') {
          row -= CONTAINER.childNodes.length;
        }
      } else if (overlayContainsElement(CLONE_BOTTOM_INLINE_START_CORNER, cellElement, this.wtRootElement) || overlayContainsElement(CLONE_BOTTOM, cellElement, this.wtRootElement)) {
        var totalRows = this.wtSettings.getSetting('totalRows');
        row = totalRows - CONTAINER.childNodes.length + row;
      } else if (CONTAINER === this.THEAD) {
        row = this.rowFilter.visibleColHeadedRowToSourceRow(row);
      } else {
        row = this.rowFilter.renderedToSource(row);
      }
      if (overlayContainsElement(CLONE_TOP_INLINE_START_CORNER, cellElement, this.wtRootElement) || overlayContainsElement(CLONE_INLINE_START, cellElement, this.wtRootElement) || overlayContainsElement(CLONE_BOTTOM_INLINE_START_CORNER, cellElement, this.wtRootElement)) {
        col = this.columnFilter.offsettedTH(col);
      } else {
        col = this.columnFilter.visibleRowHeadedColumnToSourceColumn(col);
      }
      return this.wot.createCellCoords(row, col);
    }

    /**
     * Check if any of the rendered rows is higher than expected, and if so, cache them.
     */
  }, {
    key: "markOversizedRows",
    value: function markOversizedRows() {
      if (this.wtSettings.getSetting('externalRowCalculator')) {
        return;
      }
      var rowCount = this.TBODY.childNodes.length;
      var expectedTableHeight = rowCount * this.wtSettings.getSetting('defaultRowHeight');
      var actualTableHeight = innerHeight(this.TBODY) - 1;
      var previousRowHeight;
      var rowInnerHeight;
      var sourceRowIndex;
      var currentTr;
      var rowHeader;
      if (expectedTableHeight === actualTableHeight && !this.wtSettings.getSetting('fixedRowsBottom')) {
        // If the actual table height equals rowCount * default single row height, no row is oversized -> no need to iterate over them
        return;
      }
      while (rowCount) {
        rowCount -= 1;
        sourceRowIndex = this.rowFilter.renderedToSource(rowCount);
        previousRowHeight = this.getRowHeight(sourceRowIndex);
        currentTr = this.getTrForRow(sourceRowIndex);
        rowHeader = currentTr.querySelector('th');
        if (rowHeader) {
          rowInnerHeight = innerHeight(rowHeader);
        } else {
          rowInnerHeight = innerHeight(currentTr) - 1;
        }
        if (!previousRowHeight && this.wtSettings.getSetting('defaultRowHeight') < rowInnerHeight || previousRowHeight < rowInnerHeight) {
          rowInnerHeight += 1;
          this.dataAccessObject.wtViewport.oversizedRows[sourceRowIndex] = rowInnerHeight;
        }
      }
    }

    /**
     * @param {number} row The visual row index.
     * @returns {HTMLTableElement}
     */
  }, {
    key: "getTrForRow",
    value: function getTrForRow(row) {
      return this.TBODY.childNodes[this.rowFilter.sourceToRendered(row)];
    }

    /**
     * Checks if the column index (negative value from -1 to N) is rendered.
     *
     * @param {number} column The column index (negative value from -1 to N).
     * @returns {boolean}
     */
  }, {
    key: "isColumnHeaderRendered",
    value: function isColumnHeaderRendered(column) {
      if (column >= 0) {
        return false;
      }
      var rowHeaders = this.wtSettings.getSetting('rowHeaders');
      var rowHeadersCount = rowHeaders.length;
      return Math.abs(column) <= rowHeadersCount;
    }

    /**
     * Checks if the row index (negative value from -1 to N) is rendered.
     *
     * @param {number} row The row index (negative value from -1 to N).
     * @returns {boolean}
     */
  }, {
    key: "isRowHeaderRendered",
    value: function isRowHeaderRendered(row) {
      if (row >= 0) {
        return false;
      }
      var columnHeaders = this.wtSettings.getSetting('columnHeaders');
      var columnHeadersCount = columnHeaders.length;
      return Math.abs(row) <= columnHeadersCount;
    }

    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Check if the given row index is lower than the index of the first row that
     * is currently rendered and return TRUE in that case, or FALSE otherwise.
     *
     * Negative row index is used to check the columns' headers.
     *
     *  Headers
     *           +--------------+                                     │
     *       -3  │    │    │    │                                     │
     *           +--------------+                                     │
     *       -2  │    │    │    │                                     │ TRUE
     *           +--------------+                                     │
     *       -1  │    │    │    │                                     │
     *  Cells  +==================+                                   │
     *        0  ┇    ┇    ┇    ┇ <--- For fixedRowsTop: 1            │
     *           +--------------+      the master overlay do       ---+ first rendered row (index 1)
     *        1  │ A2 │ B2 │ C2 │      not render the first row.      │
     *           +--------------+                                     │ FALSE
     *        2  │ A3 │ B3 │ C3 │                                     │
     *           +--------------+                                  ---+ last rendered row
     *                                                                │
     *                                                                │ FALSE
     *
     * @param {number} row The visual row index.
     * @memberof Table#
     * @function isRowBeforeRenderedRows
     * @returns {boolean}
     */
    /* eslint-enable jsdoc/require-description-complete-sentence */
  }, {
    key: "isRowBeforeRenderedRows",
    value: function isRowBeforeRenderedRows(row) {
      var first = this.getFirstRenderedRow();

      // Check the headers only in case when the first rendered row is -1 or 0.
      // This is an indication that the overlay is placed on the most top position.
      if (row < 0 && first <= 0) {
        return !this.isRowHeaderRendered(row);
      }
      return row < first;
    }

    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Check if the given column index is greater than the index of the last column that
     * is currently rendered and return TRUE in that case, or FALSE otherwise.
     *
     * The negative row index is used to check the columns' headers. However,
     * keep in mind that for negative indexes, the method always returns FALSE as
     * it is not possible to render headers partially. The "after" index can not be
     * lower than -1.
     *
     *  Headers
     *           +--------------+                                     │
     *       -3  │    │    │    │                                     │
     *           +--------------+                                     │
     *       -2  │    │    │    │                                     │ FALSE
     *           +--------------+                                     │
     *       -1  │    │    │    │                                     │
     *  Cells  +==================+                                   │
     *        0  ┇    ┇    ┇    ┇ <--- For fixedRowsTop: 1            │
     *           +--------------+      the master overlay do       ---+ first rendered row (index 1)
     *        1  │ A2 │ B2 │ C2 │      not render the first rows      │
     *           +--------------+                                     │ FALSE
     *        2  │ A3 │ B3 │ C3 │                                     │
     *           +--------------+                                  ---+ last rendered row
     *                                                                │
     *                                                                │ TRUE
     *
     * @param {number} row The visual row index.
     * @memberof Table#
     * @function isRowAfterRenderedRows
     * @returns {boolean}
     */
    /* eslint-enable jsdoc/require-description-complete-sentence */
  }, {
    key: "isRowAfterRenderedRows",
    value: function isRowAfterRenderedRows(row) {
      return row > this.getLastRenderedRow();
    }

    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Check if the given column index is lower than the index of the first column that
     * is currently rendered and return TRUE in that case, or FALSE otherwise.
     *
     * Negative column index is used to check the rows' headers.
     *
     *                            For fixedColumnsStart: 1 the master overlay
     *                            do not render this first columns.
     *  Headers    -3   -2   -1    |
     *           +----+----+----║┄ ┄ +------+------+
     *           │    │    │    ║    │  B1  │  C1  │
     *           +--------------║┄ ┄ --------------│
     *           │    │    │    ║    │  B2  │  C2  │
     *           +--------------║┄ ┄ --------------│
     *           │    │    │    ║    │  B3  │  C3  │
     *           +----+----+----║┄ ┄ +------+------+
     *                               ╷             ╷
     *      -------------------------+-------------+---------------->
     *          TRUE             first    FALSE   last         FALSE
     *                           rendered         rendered
     *                           column           column
     *
     * @param {number} column The visual column index.
     * @memberof Table#
     * @function isColumnBeforeRenderedColumns
     * @returns {boolean}
     */
    /* eslint-enable jsdoc/require-description-complete-sentence */
  }, {
    key: "isColumnBeforeRenderedColumns",
    value: function isColumnBeforeRenderedColumns(column) {
      var first = this.getFirstRenderedColumn();

      // Check the headers only in case when the first rendered column is -1 or 0.
      // This is an indication that the overlay is placed on the most left position.
      if (column < 0 && first <= 0) {
        return !this.isColumnHeaderRendered(column);
      }
      return column < first;
    }

    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Check if the given column index is greater than the index of the last column that
     * is currently rendered and return TRUE in that case, or FALSE otherwise.
     *
     * The negative column index is used to check the rows' headers. However,
     * keep in mind that for negative indexes, the method always returns FALSE as
     * it is not possible to render headers partially. The "after" index can not be
     * lower than -1.
     *
     *                            For fixedColumnsStart: 1 the master overlay
     *                            do not render this first columns.
     *  Headers    -3   -2   -1    |
     *           +----+----+----║┄ ┄ +------+------+
     *           │    │    │    ║    │  B1  │  C1  │
     *           +--------------║┄ ┄ --------------│
     *           │    │    │    ║    │  B2  │  C2  │
     *           +--------------║┄ ┄ --------------│
     *           │    │    │    ║    │  B3  │  C3  │
     *           +----+----+----║┄ ┄ +------+------+
     *                               ╷             ╷
     *      -------------------------+-------------+---------------->
     *          FALSE             first    FALSE   last         TRUE
     *                           rendered         rendered
     *                           column           column
     *
     * @param {number} column The visual column index.
     * @memberof Table#
     * @function isColumnAfterRenderedColumns
     * @returns {boolean}
     */
    /* eslint-enable jsdoc/require-description-complete-sentence */
  }, {
    key: "isColumnAfterRenderedColumns",
    value: function isColumnAfterRenderedColumns(column) {
      return this.columnFilter && column > this.getLastRenderedColumn();
    }
  }, {
    key: "isColumnAfterViewport",
    value: function isColumnAfterViewport(column) {
      return this.columnFilter && column > this.getLastVisibleColumn();
    }
  }, {
    key: "isRowAfterViewport",
    value: function isRowAfterViewport(row) {
      return this.rowFilter && row > this.getLastVisibleRow();
    }
  }, {
    key: "isColumnBeforeViewport",
    value: function isColumnBeforeViewport(column) {
      return this.columnFilter && this.columnFilter.sourceToRendered(column) < 0 && column >= 0;
    }
  }, {
    key: "isLastRowFullyVisible",
    value: function isLastRowFullyVisible() {
      return this.getLastVisibleRow() === this.getLastRenderedRow();
    }
  }, {
    key: "isLastColumnFullyVisible",
    value: function isLastColumnFullyVisible() {
      return this.getLastVisibleColumn() === this.getLastRenderedColumn();
    }
  }, {
    key: "allRowsInViewport",
    value: function allRowsInViewport() {
      return this.wtSettings.getSetting('totalRows') === this.getVisibleRowsCount();
    }
  }, {
    key: "allColumnsInViewport",
    value: function allColumnsInViewport() {
      return this.wtSettings.getSetting('totalColumns') === this.getVisibleColumnsCount();
    }

    /**
     * Checks if any of the row's cells content exceeds its initial height, and if so, returns the oversized height.
     *
     * @param {number} sourceRow The physical row index.
     * @returns {number}
     */
  }, {
    key: "getRowHeight",
    value: function getRowHeight(sourceRow) {
      return this.rowUtils.getHeight(sourceRow);
    }

    /**
     * @param {number} level The column level.
     * @returns {number}
     */
  }, {
    key: "getColumnHeaderHeight",
    value: function getColumnHeaderHeight(level) {
      return this.columnUtils.getHeaderHeight(level);
    }

    /**
     * @param {number} sourceColumn The physical column index.
     * @returns {number}
     */
  }, {
    key: "getColumnWidth",
    value: function getColumnWidth(sourceColumn) {
      return this.columnUtils.getWidth(sourceColumn);
    }

    /**
     * @param {number} sourceColumn The physical column index.
     * @returns {number}
     */
  }, {
    key: "getStretchedColumnWidth",
    value: function getStretchedColumnWidth(sourceColumn) {
      return this.columnUtils.getStretchedColumnWidth(sourceColumn);
    }

    /**
     * Checks if the table has defined size. It returns `true` when the table has width and height
     * set bigger than `0px`.
     *
     * @returns {boolean}
     */
  }, {
    key: "hasDefinedSize",
    value: function hasDefinedSize() {
      return this.hasTableHeight && this.hasTableWidth;
    }

    /**
     * Gets table's width. The returned width is the width of the rendered cells that fit in the
     * current viewport. The value may change depends on the viewport position (scroll position).
     *
     * @returns {number}
     */
  }, {
    key: "getWidth",
    value: function getWidth() {
      return outerWidth(this.TABLE);
    }

    /**
     * Gets table's height. The returned height is the height of the rendered cells that fit in the
     * current viewport. The value may change depends on the viewport position (scroll position).
     *
     * @returns {number}
     */
  }, {
    key: "getHeight",
    value: function getHeight() {
      return outerHeight(this.TABLE);
    }

    /**
     * Gets table's total width. The returned width is the width of all rendered cells (including headers)
     * that can be displayed in the table.
     *
     * @returns {number}
     */
  }, {
    key: "getTotalWidth",
    value: function getTotalWidth() {
      var width = outerWidth(this.hider);

      // when the overlay's table does not have any cells the hider returns 0, get then width from the table element
      return width !== 0 ? width : this.getWidth();
    }

    /**
     * Gets table's total height. The returned height is the height of all rendered cells (including headers)
     * that can be displayed in the table.
     *
     * @returns {number}
     */
  }, {
    key: "getTotalHeight",
    value: function getTotalHeight() {
      var height = outerHeight(this.hider);

      // when the overlay's table does not have any cells the hider returns 0, get then height from the table element
      return height !== 0 ? height : this.getHeight();
    }

    /**
     * Checks if the table is visible. It returns `true` when the holder element (or its parents)
     * has CSS 'display' property different than 'none'.
     *
     * @returns {boolean}
     */
  }, {
    key: "isVisible",
    value: function isVisible() {
      return _isVisible(this.TABLE);
    }

    /**
     * Modify row header widths provided by user in class contructor.
     *
     * @private
     * @param {Function} rowHeaderWidthFactory The function which can provide default width values for rows..
     * @returns {number}
     */
  }, {
    key: "_modifyRowHeaderWidth",
    value: function _modifyRowHeaderWidth(rowHeaderWidthFactory) {
      var widths = isFunction(rowHeaderWidthFactory) ? rowHeaderWidthFactory() : null;
      if (Array.isArray(widths)) {
        widths = _toConsumableArray(widths);
        widths[widths.length - 1] = this._correctRowHeaderWidth(widths[widths.length - 1]);
      } else {
        widths = this._correctRowHeaderWidth(widths);
      }
      return widths;
    }

    /**
     * Correct row header width if necessary.
     *
     * @private
     * @param {number} width The width to process.
     * @returns {number}
     */
  }, {
    key: "_correctRowHeaderWidth",
    value: function _correctRowHeaderWidth(width) {
      var rowHeaderWidth = width;
      if (typeof width !== 'number') {
        rowHeaderWidth = this.wtSettings.getSetting('defaultColumnWidth');
      }
      if (this.correctHeaderWidth) {
        rowHeaderWidth += 1;
      }
      return rowHeaderWidth;
    }
  }]);
  return Table;
}();
export default Table;