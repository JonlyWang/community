"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.number.is-integer.js");
require("core-js/modules/es.number.constructor.js");
var _element = require("./helpers/dom/element");
var _eventManager = _interopRequireDefault(require("./eventManager"));
var _event = require("./helpers/dom/event");
var _src = _interopRequireDefault(require("./3rdparty/walkontable/src"));
var _mouseEventHandler = require("./selection/mouseEventHandler");
var _rootInstance = require("./utils/rootInstance");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var privatePool = new WeakMap();

/**
 * @class TableView
 * @private
 */
var TableView = /*#__PURE__*/function () {
  /**
   * @param {Hanstontable} instance Instance of {@link Handsontable}.
   */
  function TableView(instance) {
    _classCallCheck(this, TableView);
    /**
     * Instance of {@link Handsontable}.
     *
     * @private
     * @type {Handsontable}
     */
    this.instance = instance;
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */
    this.eventManager = new _eventManager.default(instance);
    /**
     * Current Handsontable's GridSettings object.
     *
     * @private
     * @type {GridSettings}
     */
    this.settings = instance.getSettings();
    /**
     * Main <THEAD> element.
     *
     * @private
     * @type {HTMLTableSectionElement}
     */
    this.THEAD = void 0;
    /**
     * Main <TBODY> element.
     *
     * @private
     * @type {HTMLTableSectionElement}
     */
    this.TBODY = void 0;
    /**
     * Main Walkontable instance.
     *
     * @private
     * @type {Walkontable}
     */
    this._wt = void 0;
    /**
     * Main Walkontable instance.
     *
     * @private
     * @type {Walkontable}
     */
    this.activeWt = void 0;
    /**
     * The flag determines if the `adjustElementsSize` method call was made during
     * the render suspending. If true, the method has to be triggered once after render
     * resuming.
     *
     * @private
     * @type {boolean}
     */
    this.postponedAdjustElementsSize = false;
    privatePool.set(this, {
      /**
       * Defines if the text should be selected during mousemove.
       *
       * @private
       * @type {boolean}
       */
      selectionMouseDown: false,
      /**
       * @private
       * @type {boolean}
       */
      mouseDown: void 0,
      /**
       * Main <TABLE> element.
       *
       * @private
       * @type {HTMLTableElement}
       */
      table: void 0,
      /**
       * Cached width of the rootElement.
       *
       * @type {number}
       */
      lastWidth: 0,
      /**
       * Cached height of the rootElement.
       *
       * @type {number}
       */
      lastHeight: 0
    });
    this.createElements();
    this.registerEvents();
    this.initializeWalkontable();
  }

  /**
   * Renders WalkontableUI.
   */
  _createClass(TableView, [{
    key: "render",
    value: function render() {
      if (!this.instance.isRenderSuspended()) {
        this.instance.runHooks('beforeRender', this.instance.forceFullRender);
        if (this.postponedAdjustElementsSize) {
          this.postponedAdjustElementsSize = false;
          this.adjustElementsSize(true);
        }
        this._wt.draw(!this.instance.forceFullRender);
        this.instance.runHooks('afterRender', this.instance.forceFullRender);
        this.instance.forceFullRender = false;
        this.instance.renderCall = false;
      }
    }

    /**
     * Adjust overlays elements size and master table size.
     *
     * @param {boolean} [force=false] When `true`, it adjust the DOM nodes sizes for all overlays.
     */
  }, {
    key: "adjustElementsSize",
    value: function adjustElementsSize() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.instance.isRenderSuspended()) {
        this.postponedAdjustElementsSize = true;
      } else {
        this._wt.wtOverlays.adjustElementsSize(force);
      }
    }

    /**
     * Returns td object given coordinates.
     *
     * @param {CellCoords} coords Renderable cell coordinates.
     * @param {boolean} topmost Indicates whether the cell should be calculated from the topmost.
     * @returns {HTMLTableCellElement|null}
     */
  }, {
    key: "getCellAtCoords",
    value: function getCellAtCoords(coords, topmost) {
      var td = this._wt.getCell(coords, topmost);
      if (td < 0) {
        // there was an exit code (cell is out of bounds)
        return null;
      }
      return td;
    }

    /**
     * Scroll viewport to a cell.
     *
     * @param {CellCoords} coords Renderable cell coordinates.
     * @param {boolean} [snapToTop] If `true`, viewport is scrolled to show the cell on the top of the table.
     * @param {boolean} [snapToRight] If `true`, viewport is scrolled to show the cell on the right side of the table.
     * @param {boolean} [snapToBottom] If `true`, viewport is scrolled to show the cell on the bottom side of the table.
     * @param {boolean} [snapToLeft] If `true`, viewport is scrolled to show the cell on the left side of the table.
     * @returns {boolean}
     */
  }, {
    key: "scrollViewport",
    value: function scrollViewport(coords, snapToTop, snapToRight, snapToBottom, snapToLeft) {
      return this._wt.scrollViewport(coords, snapToTop, snapToRight, snapToBottom, snapToLeft);
    }

    /**
     * Scroll viewport to a column.
     *
     * @param {number} column Renderable column index.
     * @param {boolean} [snapToRight] If `true`, viewport is scrolled to show the cell on the right side of the table.
     * @param {boolean} [snapToLeft] If `true`, viewport is scrolled to show the cell on the left side of the table.
     * @returns {boolean}
     */
  }, {
    key: "scrollViewportHorizontally",
    value: function scrollViewportHorizontally(column, snapToRight, snapToLeft) {
      return this._wt.scrollViewportHorizontally(column, snapToRight, snapToLeft);
    }

    /**
     * Scroll viewport to a row.
     *
     * @param {number} row Renderable row index.
     * @param {boolean} [snapToTop] If `true`, viewport is scrolled to show the cell on the top of the table.
     * @param {boolean} [snapToBottom] If `true`, viewport is scrolled to show the cell on the bottom side of the table.
     * @returns {boolean}
     */
  }, {
    key: "scrollViewportVertically",
    value: function scrollViewportVertically(row, snapToTop, snapToBottom) {
      return this._wt.scrollViewportVertically(row, snapToTop, snapToBottom);
    }

    /**
     * Prepares DOMElements and adds correct className to the root element.
     *
     * @private
     */
  }, {
    key: "createElements",
    value: function createElements() {
      var priv = privatePool.get(this);
      var _this$instance = this.instance,
        rootElement = _this$instance.rootElement,
        rootDocument = _this$instance.rootDocument;
      var originalStyle = rootElement.getAttribute('style');
      if (originalStyle) {
        rootElement.setAttribute('data-originalstyle', originalStyle); // needed to retrieve original style in jsFiddle link generator in HT examples. may be removed in future versions
      }

      (0, _element.addClass)(rootElement, 'handsontable');
      priv.table = rootDocument.createElement('TABLE');
      (0, _element.addClass)(priv.table, 'htCore');
      if (this.instance.getSettings().tableClassName) {
        (0, _element.addClass)(priv.table, this.instance.getSettings().tableClassName);
      }
      this.THEAD = rootDocument.createElement('THEAD');
      priv.table.appendChild(this.THEAD);
      this.TBODY = rootDocument.createElement('TBODY');
      priv.table.appendChild(this.TBODY);
      this.instance.table = priv.table;
      this.instance.container.insertBefore(priv.table, this.instance.container.firstChild);
    }

    /**
     * Attaches necessary listeners.
     *
     * @private
     */
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this = this;
      var priv = privatePool.get(this);
      var _this$instance2 = this.instance,
        rootElement = _this$instance2.rootElement,
        rootDocument = _this$instance2.rootDocument,
        selection = _this$instance2.selection;
      var documentElement = rootDocument.documentElement;
      this.eventManager.addEventListener(rootElement, 'mousedown', function (event) {
        priv.selectionMouseDown = true;
        if (!_this.isTextSelectionAllowed(event.target)) {
          var rootWindow = _this.instance.rootWindow;
          (0, _element.clearTextSelection)(rootWindow);
          event.preventDefault();
          rootWindow.focus(); // make sure that window that contains HOT is active. Important when HOT is in iframe.
        }
      });

      this.eventManager.addEventListener(rootElement, 'mouseup', function () {
        priv.selectionMouseDown = false;
      });
      this.eventManager.addEventListener(rootElement, 'mousemove', function (event) {
        if (priv.selectionMouseDown && !_this.isTextSelectionAllowed(event.target)) {
          // Clear selection only when fragmentSelection is enabled, otherwise clearing selection breaks the IME editor.
          if (_this.settings.fragmentSelection) {
            (0, _element.clearTextSelection)(_this.instance.rootWindow);
          }
          event.preventDefault();
        }
      });
      this.eventManager.addEventListener(documentElement, 'keyup', function (event) {
        // TODO: is it the best place and way to finish cell selection?
        if (selection.isInProgress() && !event.shiftKey) {
          selection.finish();
        }
      });
      this.eventManager.addEventListener(documentElement, 'mouseup', function (event) {
        if (selection.isInProgress() && (0, _event.isLeftClick)(event)) {
          // is left mouse button
          selection.finish();
        }
        priv.mouseDown = false;
        if ((0, _element.isOutsideInput)(rootDocument.activeElement) || !selection.isSelected() && !selection.isSelectedByAnyHeader() && !rootElement.contains(event.target) && !(0, _event.isRightClick)(event)) {
          _this.instance.unlisten();
        }
      });
      this.eventManager.addEventListener(documentElement, 'contextmenu', function (event) {
        if (selection.isInProgress() && (0, _event.isRightClick)(event)) {
          selection.finish();
          priv.mouseDown = false;
        }
      });
      this.eventManager.addEventListener(documentElement, 'touchend', function () {
        if (selection.isInProgress()) {
          selection.finish();
        }
        priv.mouseDown = false;
      });
      this.eventManager.addEventListener(documentElement, 'mousedown', function (event) {
        var originalTarget = event.target;
        var eventX = event.x || event.clientX;
        var eventY = event.y || event.clientY;
        var next = event.target;
        if (priv.mouseDown || !rootElement || !_this.instance.view) {
          return; // it must have been started in a cell
        }

        // immediate click on "holder" means click on the right side of vertical scrollbar
        var holder = _this.instance.view._wt.wtTable.holder;
        if (next === holder) {
          var scrollbarWidth = (0, _element.getScrollbarWidth)(rootDocument);
          if (rootDocument.elementFromPoint(eventX + scrollbarWidth, eventY) !== holder || rootDocument.elementFromPoint(eventX, eventY + scrollbarWidth) !== holder) {
            return;
          }
        } else {
          while (next !== documentElement) {
            if (next === null) {
              if (event.isTargetWebComponent) {
                break;
              }

              // click on something that was a row but now is detached (possibly because your click triggered a rerender)
              return;
            }
            if (next === rootElement) {
              // click inside container
              return;
            }
            next = next.parentNode;
          }
        }

        // function did not return until here, we have an outside click!
        var outsideClickDeselects = typeof _this.settings.outsideClickDeselects === 'function' ? _this.settings.outsideClickDeselects(originalTarget) : _this.settings.outsideClickDeselects;
        if (outsideClickDeselects) {
          _this.instance.deselectCell();
        } else {
          _this.instance.destroyEditor(false, false);
        }
      });
      this.eventManager.addEventListener(priv.table, 'selectstart', function (event) {
        if (_this.settings.fragmentSelection || (0, _element.isInput)(event.target)) {
          return;
        }
        // https://github.com/handsontable/handsontable/issues/160
        // Prevent text from being selected when performing drag down.
        event.preventDefault();
      });
    }

    /**
     * Translate renderable cell coordinates to visual coordinates.
     *
     * @param {CellCoords} coords The cell coordinates.
     * @returns {CellCoords}
     */
  }, {
    key: "translateFromRenderableToVisualCoords",
    value: function translateFromRenderableToVisualCoords(_ref) {
      var _this$instance3;
      var row = _ref.row,
        col = _ref.col;
      // TODO: To consider an idea to reusing the CellCoords instance instead creating new one.
      return (_this$instance3 = this.instance)._createCellCoords.apply(_this$instance3, _toConsumableArray(this.translateFromRenderableToVisualIndex(row, col)));
    }

    /**
     * Translate renderable row and column indexes to visual row and column indexes.
     *
     * @param {number} renderableRow Renderable row index.
     * @param {number} renderableColumn Renderable columnIndex.
     * @returns {number[]}
     */
  }, {
    key: "translateFromRenderableToVisualIndex",
    value: function translateFromRenderableToVisualIndex(renderableRow, renderableColumn) {
      // TODO: Some helper may be needed.
      // We perform translation for indexes (without headers).
      var visualRow = renderableRow >= 0 ? this.instance.rowIndexMapper.getVisualFromRenderableIndex(renderableRow) : renderableRow;
      var visualColumn = renderableColumn >= 0 ? this.instance.columnIndexMapper.getVisualFromRenderableIndex(renderableColumn) : renderableColumn;
      if (visualRow === null) {
        visualRow = renderableRow;
      }
      if (visualColumn === null) {
        visualColumn = renderableColumn;
      }
      return [visualRow, visualColumn];
    }

    /**
     * Returns the number of renderable indexes.
     *
     * @private
     * @param {IndexMapper} indexMapper The IndexMapper instance for specific axis.
     * @param {number} maxElements Maximum number of elements (rows or columns).
     *
     * @returns {number|*}
     */
  }, {
    key: "countRenderableIndexes",
    value: function countRenderableIndexes(indexMapper, maxElements) {
      var consideredElements = Math.min(indexMapper.getNotTrimmedIndexesLength(), maxElements);
      // Don't take hidden indexes into account. We are looking just for renderable indexes.
      var firstNotHiddenIndex = indexMapper.getNearestNotHiddenIndex(consideredElements - 1, -1);

      // There are no renderable indexes.
      if (firstNotHiddenIndex === null) {
        return 0;
      }
      return indexMapper.getRenderableFromVisualIndex(firstNotHiddenIndex) + 1;
    }

    /**
     * Returns the number of renderable columns.
     *
     * @returns {number}
     */
  }, {
    key: "countRenderableColumns",
    value: function countRenderableColumns() {
      return this.countRenderableIndexes(this.instance.columnIndexMapper, this.settings.maxCols);
    }

    /**
     * Returns the number of renderable rows.
     *
     * @returns {number}
     */
  }, {
    key: "countRenderableRows",
    value: function countRenderableRows() {
      return this.countRenderableIndexes(this.instance.rowIndexMapper, this.settings.maxRows);
    }

    /**
     * Returns number of not hidden row indexes counting from the passed starting index.
     * The counting direction can be controlled by `incrementBy` argument.
     *
     * @param {number} visualIndex The visual index from which the counting begins.
     * @param {number} incrementBy If `-1` then counting is backwards or forward when `1`.
     * @returns {number}
     */
  }, {
    key: "countNotHiddenRowIndexes",
    value: function countNotHiddenRowIndexes(visualIndex, incrementBy) {
      return this.countNotHiddenIndexes(visualIndex, incrementBy, this.instance.rowIndexMapper, this.countRenderableRows());
    }

    /**
     * Returns number of not hidden column indexes counting from the passed starting index.
     * The counting direction can be controlled by `incrementBy` argument.
     *
     * @param {number} visualIndex The visual index from which the counting begins.
     * @param {number} incrementBy If `-1` then counting is backwards or forward when `1`.
     * @returns {number}
     */
  }, {
    key: "countNotHiddenColumnIndexes",
    value: function countNotHiddenColumnIndexes(visualIndex, incrementBy) {
      return this.countNotHiddenIndexes(visualIndex, incrementBy, this.instance.columnIndexMapper, this.countRenderableColumns());
    }

    /**
     * Returns number of not hidden indexes counting from the passed starting index.
     * The counting direction can be controlled by `incrementBy` argument.
     *
     * @param {number} visualIndex The visual index from which the counting begins.
     * @param {number} incrementBy If `-1` then counting is backwards or forward when `1`.
     * @param {IndexMapper} indexMapper The IndexMapper instance for specific axis.
     * @param {number} renderableIndexesCount Total count of renderable indexes for specific axis.
     * @returns {number}
     */
  }, {
    key: "countNotHiddenIndexes",
    value: function countNotHiddenIndexes(visualIndex, incrementBy, indexMapper, renderableIndexesCount) {
      if (isNaN(visualIndex) || visualIndex < 0) {
        return 0;
      }
      var firstVisibleIndex = indexMapper.getNearestNotHiddenIndex(visualIndex, incrementBy);
      var renderableIndex = indexMapper.getRenderableFromVisualIndex(firstVisibleIndex);
      if (!Number.isInteger(renderableIndex)) {
        return 0;
      }
      var notHiddenIndexes = 0;
      if (incrementBy < 0) {
        // Zero-based numbering for renderable indexes corresponds to a number of not hidden indexes.
        notHiddenIndexes = renderableIndex + 1;
      } else if (incrementBy > 0) {
        notHiddenIndexes = renderableIndexesCount - renderableIndex;
      }
      return notHiddenIndexes;
    }

    /**
     * The function returns the number of not hidden column indexes that fit between the first and
     * last fixed column in the left (or right in RTL mode) overlay.
     *
     * @returns {number}
     */
  }, {
    key: "countNotHiddenFixedColumnsStart",
    value: function countNotHiddenFixedColumnsStart() {
      var countCols = this.instance.countCols();
      var visualFixedColumnsStart = Math.min(parseInt(this.settings.fixedColumnsStart, 10), countCols) - 1;
      return this.countNotHiddenColumnIndexes(visualFixedColumnsStart, -1);
    }

    /**
     * The function returns the number of not hidden row indexes that fit between the first and
     * last fixed row in the top overlay.
     *
     * @returns {number}
     */
  }, {
    key: "countNotHiddenFixedRowsTop",
    value: function countNotHiddenFixedRowsTop() {
      var countRows = this.instance.countRows();
      var visualFixedRowsTop = Math.min(parseInt(this.settings.fixedRowsTop, 10), countRows) - 1;
      return this.countNotHiddenRowIndexes(visualFixedRowsTop, -1);
    }

    /**
     * The function returns the number of not hidden row indexes that fit between the first and
     * last fixed row in the bottom overlay.
     *
     * @returns {number}
     */
  }, {
    key: "countNotHiddenFixedRowsBottom",
    value: function countNotHiddenFixedRowsBottom() {
      var countRows = this.instance.countRows();
      var visualFixedRowsBottom = Math.max(countRows - parseInt(this.settings.fixedRowsBottom, 10), 0);
      return this.countNotHiddenRowIndexes(visualFixedRowsBottom, 1);
    }

    /**
     * Checks if at least one cell than belongs to the main table is not covered by the top, left or
     * bottom overlay.
     *
     * @returns {boolean}
     */
  }, {
    key: "isMainTableNotFullyCoveredByOverlays",
    value: function isMainTableNotFullyCoveredByOverlays() {
      var fixedAllRows = this.countNotHiddenFixedRowsTop() + this.countNotHiddenFixedRowsBottom();
      var fixedAllColumns = this.countNotHiddenFixedColumnsStart();
      return this.instance.countRenderedRows() > fixedAllRows && this.instance.countRenderedCols() > fixedAllColumns;
    }

    /**
     * Defines default configuration and initializes WalkOnTable instance.
     *
     * @private
     */
  }, {
    key: "initializeWalkontable",
    value: function initializeWalkontable() {
      var _this2 = this;
      var priv = privatePool.get(this);
      var walkontableConfig = {
        rtlMode: this.instance.isRtl(),
        externalRowCalculator: this.instance.getPlugin('autoRowSize') && this.instance.getPlugin('autoRowSize').isEnabled(),
        table: priv.table,
        isDataViewInstance: function isDataViewInstance() {
          return (0, _rootInstance.isRootInstance)(_this2.instance);
        },
        preventOverflow: function preventOverflow() {
          return _this2.settings.preventOverflow;
        },
        preventWheel: function preventWheel() {
          return _this2.settings.preventWheel;
        },
        stretchH: function stretchH() {
          return _this2.settings.stretchH;
        },
        data: function data(renderableRow, renderableColumn) {
          var _this2$instance;
          return (_this2$instance = _this2.instance).getDataAtCell.apply(_this2$instance, _toConsumableArray(_this2.translateFromRenderableToVisualIndex(renderableRow, renderableColumn)));
        },
        totalRows: function totalRows() {
          return _this2.countRenderableRows();
        },
        totalColumns: function totalColumns() {
          return _this2.countRenderableColumns();
        },
        // Number of renderable columns for the left overlay.
        fixedColumnsStart: function fixedColumnsStart() {
          return _this2.countNotHiddenFixedColumnsStart();
        },
        // Number of renderable rows for the top overlay.
        fixedRowsTop: function fixedRowsTop() {
          return _this2.countNotHiddenFixedRowsTop();
        },
        // Number of renderable rows for the bottom overlay.
        fixedRowsBottom: function fixedRowsBottom() {
          return _this2.countNotHiddenFixedRowsBottom();
        },
        // Enable the inline start overlay when conditions are met.
        shouldRenderInlineStartOverlay: function shouldRenderInlineStartOverlay() {
          return _this2.settings.fixedColumnsStart > 0 || walkontableConfig.rowHeaders().length > 0;
        },
        // Enable the top overlay when conditions are met.
        shouldRenderTopOverlay: function shouldRenderTopOverlay() {
          return _this2.settings.fixedRowsTop > 0 || walkontableConfig.columnHeaders().length > 0;
        },
        // Enable the bottom overlay when conditions are met.
        shouldRenderBottomOverlay: function shouldRenderBottomOverlay() {
          return _this2.settings.fixedRowsBottom > 0;
        },
        minSpareRows: function minSpareRows() {
          return _this2.settings.minSpareRows;
        },
        renderAllRows: this.settings.renderAllRows,
        rowHeaders: function rowHeaders() {
          var headerRenderers = [];
          if (_this2.instance.hasRowHeaders()) {
            headerRenderers.push(function (renderableRowIndex, TH) {
              // TODO: Some helper may be needed.
              // We perform translation for row indexes (without row headers).
              var visualRowIndex = renderableRowIndex >= 0 ? _this2.instance.rowIndexMapper.getVisualFromRenderableIndex(renderableRowIndex) : renderableRowIndex;
              _this2.appendRowHeader(visualRowIndex, TH);
            });
          }
          _this2.instance.runHooks('afterGetRowHeaderRenderers', headerRenderers);
          return headerRenderers;
        },
        columnHeaders: function columnHeaders() {
          var headerRenderers = [];
          if (_this2.instance.hasColHeaders()) {
            headerRenderers.push(function (renderedColumnIndex, TH) {
              // TODO: Some helper may be needed.
              // We perform translation for columns indexes (without column headers).
              var visualColumnsIndex = renderedColumnIndex >= 0 ? _this2.instance.columnIndexMapper.getVisualFromRenderableIndex(renderedColumnIndex) : renderedColumnIndex;
              _this2.appendColHeader(visualColumnsIndex, TH);
            });
          }
          _this2.instance.runHooks('afterGetColumnHeaderRenderers', headerRenderers);
          return headerRenderers;
        },
        columnWidth: function columnWidth(renderedColumnIndex) {
          var visualIndex = _this2.instance.columnIndexMapper.getVisualFromRenderableIndex(renderedColumnIndex);

          // It's not a bug that we can't find visual index for some handled by method indexes. The function is called also
          // for indexes that are not displayed (indexes that are beyond the grid's boundaries), i.e. when `fixedColumnsStart` > `startCols` (wrong config?) or
          // scrolling and dataset is empty (scroll should handle that?).
          return _this2.instance.getColWidth(visualIndex === null ? renderedColumnIndex : visualIndex);
        },
        rowHeight: function rowHeight(renderedRowIndex) {
          var visualIndex = _this2.instance.rowIndexMapper.getVisualFromRenderableIndex(renderedRowIndex);
          return _this2.instance.getRowHeight(visualIndex === null ? renderedRowIndex : visualIndex);
        },
        cellRenderer: function cellRenderer(renderedRowIndex, renderedColumnIndex, TD) {
          var _this2$translateFromR = _this2.translateFromRenderableToVisualIndex(renderedRowIndex, renderedColumnIndex),
            _this2$translateFromR2 = _slicedToArray(_this2$translateFromR, 2),
            visualRowIndex = _this2$translateFromR2[0],
            visualColumnIndex = _this2$translateFromR2[1];

          // Coords may be modified. For example, by the `MergeCells` plugin. It should affect cell value and cell meta.
          var modifiedCellCoords = _this2.instance.runHooks('modifyGetCellCoords', visualRowIndex, visualColumnIndex);
          var visualRowToCheck = visualRowIndex;
          var visualColumnToCheck = visualColumnIndex;
          if (Array.isArray(modifiedCellCoords)) {
            var _modifiedCellCoords = _slicedToArray(modifiedCellCoords, 2);
            visualRowToCheck = _modifiedCellCoords[0];
            visualColumnToCheck = _modifiedCellCoords[1];
          }
          var cellProperties = _this2.instance.getCellMeta(visualRowToCheck, visualColumnToCheck);
          var prop = _this2.instance.colToProp(visualColumnToCheck);
          var value = _this2.instance.getDataAtRowProp(visualRowToCheck, prop);
          if (_this2.instance.hasHook('beforeValueRender')) {
            value = _this2.instance.runHooks('beforeValueRender', value, cellProperties);
          }
          _this2.instance.runHooks('beforeRenderer', TD, visualRowIndex, visualColumnIndex, prop, value, cellProperties);
          _this2.instance.getCellRenderer(cellProperties)(_this2.instance, TD, visualRowIndex, visualColumnIndex, prop, value, cellProperties);
          _this2.instance.runHooks('afterRenderer', TD, visualRowIndex, visualColumnIndex, prop, value, cellProperties);
        },
        selections: this.instance.selection.highlight,
        hideBorderOnMouseDownOver: function hideBorderOnMouseDownOver() {
          return _this2.settings.fragmentSelection;
        },
        onWindowResize: function onWindowResize() {
          if (!_this2.instance || _this2.instance.isDestroyed) {
            return;
          }
          _this2.instance.refreshDimensions();
        },
        onCellMouseDown: function onCellMouseDown(event, coords, TD, wt) {
          var visualCoords = _this2.translateFromRenderableToVisualCoords(coords);
          var controller = {
            row: false,
            column: false,
            cell: false
          };
          _this2.instance.listen();
          _this2.activeWt = wt;
          priv.mouseDown = true;
          _this2.instance.runHooks('beforeOnCellMouseDown', event, visualCoords, TD, controller);
          if ((0, _event.isImmediatePropagationStopped)(event)) {
            return;
          }
          (0, _mouseEventHandler.handleMouseEvent)(event, {
            coords: visualCoords,
            selection: _this2.instance.selection,
            controller: controller,
            cellCoordsFactory: function cellCoordsFactory(row, column) {
              return _this2.instance._createCellCoords(row, column);
            }
          });
          _this2.instance.runHooks('afterOnCellMouseDown', event, visualCoords, TD);
          _this2.activeWt = _this2._wt;
        },
        onCellContextMenu: function onCellContextMenu(event, coords, TD, wt) {
          var visualCoords = _this2.translateFromRenderableToVisualCoords(coords);
          _this2.activeWt = wt;
          priv.mouseDown = false;
          if (_this2.instance.selection.isInProgress()) {
            _this2.instance.selection.finish();
          }
          _this2.instance.runHooks('beforeOnCellContextMenu', event, visualCoords, TD);
          if ((0, _event.isImmediatePropagationStopped)(event)) {
            return;
          }
          _this2.instance.runHooks('afterOnCellContextMenu', event, visualCoords, TD);
          _this2.activeWt = _this2._wt;
        },
        onCellMouseOut: function onCellMouseOut(event, coords, TD, wt) {
          var visualCoords = _this2.translateFromRenderableToVisualCoords(coords);
          _this2.activeWt = wt;
          _this2.instance.runHooks('beforeOnCellMouseOut', event, visualCoords, TD);
          if ((0, _event.isImmediatePropagationStopped)(event)) {
            return;
          }
          _this2.instance.runHooks('afterOnCellMouseOut', event, visualCoords, TD);
          _this2.activeWt = _this2._wt;
        },
        onCellMouseOver: function onCellMouseOver(event, coords, TD, wt) {
          var visualCoords = _this2.translateFromRenderableToVisualCoords(coords);
          var controller = {
            row: false,
            column: false,
            cell: false
          };
          _this2.activeWt = wt;
          _this2.instance.runHooks('beforeOnCellMouseOver', event, visualCoords, TD, controller);
          if ((0, _event.isImmediatePropagationStopped)(event)) {
            return;
          }
          if (priv.mouseDown) {
            (0, _mouseEventHandler.handleMouseEvent)(event, {
              coords: visualCoords,
              selection: _this2.instance.selection,
              controller: controller,
              cellCoordsFactory: function cellCoordsFactory(row, column) {
                return _this2.instance._createCellCoords(row, column);
              }
            });
          }
          _this2.instance.runHooks('afterOnCellMouseOver', event, visualCoords, TD);
          _this2.activeWt = _this2._wt;
        },
        onCellMouseUp: function onCellMouseUp(event, coords, TD, wt) {
          var visualCoords = _this2.translateFromRenderableToVisualCoords(coords);
          _this2.activeWt = wt;
          _this2.instance.runHooks('beforeOnCellMouseUp', event, visualCoords, TD);

          // TODO: The second condition check is a workaround. Callback corresponding the method `updateSettings`
          // disable plugin and enable it again. Disabling plugin closes the menu. Thus, calling the
          // `updateSettings` in a body of any callback executed right after some context-menu action
          // breaks the table (#7231).
          if ((0, _event.isImmediatePropagationStopped)(event) || _this2.instance.isDestroyed) {
            return;
          }
          _this2.instance.runHooks('afterOnCellMouseUp', event, visualCoords, TD);
          _this2.activeWt = _this2._wt;
        },
        onCellCornerMouseDown: function onCellCornerMouseDown(event) {
          event.preventDefault();
          _this2.instance.runHooks('afterOnCellCornerMouseDown', event);
        },
        onCellCornerDblClick: function onCellCornerDblClick(event) {
          event.preventDefault();
          _this2.instance.runHooks('afterOnCellCornerDblClick', event);
        },
        beforeDraw: function beforeDraw(force, skipRender) {
          return _this2.beforeRender(force, skipRender);
        },
        onDraw: function onDraw(force) {
          return _this2.afterRender(force);
        },
        onScrollVertically: function onScrollVertically() {
          return _this2.instance.runHooks('afterScrollVertically');
        },
        onScrollHorizontally: function onScrollHorizontally() {
          return _this2.instance.runHooks('afterScrollHorizontally');
        },
        onBeforeRemoveCellClassNames: function onBeforeRemoveCellClassNames() {
          return _this2.instance.runHooks('beforeRemoveCellClassNames');
        },
        onBeforeHighlightingRowHeader: function onBeforeHighlightingRowHeader(renderableRow, headerLevel, highlightMeta) {
          var rowMapper = _this2.instance.rowIndexMapper;
          var visualRow = rowMapper.getVisualFromRenderableIndex(renderableRow);
          var newVisualRow = _this2.instance.runHooks('beforeHighlightingRowHeader', visualRow, headerLevel, highlightMeta);
          return rowMapper.getRenderableFromVisualIndex(rowMapper.getNearestNotHiddenIndex(newVisualRow, 1));
        },
        onBeforeHighlightingColumnHeader: function onBeforeHighlightingColumnHeader(renderableColumn, headerLevel, highlightMeta) {
          var columnMapper = _this2.instance.columnIndexMapper;
          var visualColumn = columnMapper.getVisualFromRenderableIndex(renderableColumn);
          var newVisualColumn = _this2.instance.runHooks('beforeHighlightingColumnHeader', visualColumn, headerLevel, highlightMeta);
          return columnMapper.getRenderableFromVisualIndex(columnMapper.getNearestNotHiddenIndex(newVisualColumn, 1));
        },
        onAfterDrawSelection: function onAfterDrawSelection(currentRow, currentColumn, layerLevel) {
          var cornersOfSelection;
          var _this2$translateFromR3 = _this2.translateFromRenderableToVisualIndex(currentRow, currentColumn),
            _this2$translateFromR4 = _slicedToArray(_this2$translateFromR3, 2),
            visualRowIndex = _this2$translateFromR4[0],
            visualColumnIndex = _this2$translateFromR4[1];
          var selectedRange = _this2.instance.selection.getSelectedRange();
          var selectionRangeSize = selectedRange.size();
          if (selectionRangeSize > 0) {
            // Selection layers are stored from the "oldest" to the "newest". We should calculate the offset.
            // Please look at the `SelectedRange` class and it's method for getting selection's layer for more information.
            var selectionOffset = (layerLevel !== null && layerLevel !== void 0 ? layerLevel : 0) + 1 - selectionRangeSize;
            var selectionForLayer = selectedRange.peekByIndex(selectionOffset);
            cornersOfSelection = [selectionForLayer.from.row, selectionForLayer.from.col, selectionForLayer.to.row, selectionForLayer.to.col];
          }
          return _this2.instance.runHooks('afterDrawSelection', visualRowIndex, visualColumnIndex, cornersOfSelection, layerLevel);
        },
        onBeforeDrawBorders: function onBeforeDrawBorders(corners, borderClassName) {
          var _corners = _slicedToArray(corners, 4),
            startRenderableRow = _corners[0],
            startRenderableColumn = _corners[1],
            endRenderableRow = _corners[2],
            endRenderableColumn = _corners[3];
          var visualCorners = [_this2.instance.rowIndexMapper.getVisualFromRenderableIndex(startRenderableRow), _this2.instance.columnIndexMapper.getVisualFromRenderableIndex(startRenderableColumn), _this2.instance.rowIndexMapper.getVisualFromRenderableIndex(endRenderableRow), _this2.instance.columnIndexMapper.getVisualFromRenderableIndex(endRenderableColumn)];
          return _this2.instance.runHooks('beforeDrawBorders', visualCorners, borderClassName);
        },
        onBeforeTouchScroll: function onBeforeTouchScroll() {
          return _this2.instance.runHooks('beforeTouchScroll');
        },
        onAfterMomentumScroll: function onAfterMomentumScroll() {
          return _this2.instance.runHooks('afterMomentumScroll');
        },
        onBeforeStretchingColumnWidth: function onBeforeStretchingColumnWidth(stretchedWidth, renderedColumnIndex) {
          var visualColumnIndex = _this2.instance.columnIndexMapper.getVisualFromRenderableIndex(renderedColumnIndex);
          return _this2.instance.runHooks('beforeStretchingColumnWidth', stretchedWidth, visualColumnIndex);
        },
        onModifyRowHeaderWidth: function onModifyRowHeaderWidth(rowHeaderWidth) {
          return _this2.instance.runHooks('modifyRowHeaderWidth', rowHeaderWidth);
        },
        onModifyGetCellCoords: function onModifyGetCellCoords(renderableRowIndex, renderableColumnIndex, topmost) {
          var rowMapper = _this2.instance.rowIndexMapper;
          var columnMapper = _this2.instance.columnIndexMapper;

          // Callback handle also headers. We shouldn't translate them.
          var visualColumnIndex = renderableColumnIndex >= 0 ? columnMapper.getVisualFromRenderableIndex(renderableColumnIndex) : renderableColumnIndex;
          var visualRowIndex = renderableRowIndex >= 0 ? rowMapper.getVisualFromRenderableIndex(renderableRowIndex) : renderableRowIndex;
          var visualIndexes = _this2.instance.runHooks('modifyGetCellCoords', visualRowIndex, visualColumnIndex, topmost);
          if (Array.isArray(visualIndexes)) {
            var _visualIndexes = _slicedToArray(visualIndexes, 4),
              visualRowFrom = _visualIndexes[0],
              visualColumnFrom = _visualIndexes[1],
              visualRowTo = _visualIndexes[2],
              visualColumnTo = _visualIndexes[3];

            // Result of the hook is handled by the Walkontable (renderable indexes).
            return [visualRowFrom >= 0 ? rowMapper.getRenderableFromVisualIndex(rowMapper.getNearestNotHiddenIndex(visualRowFrom, 1)) : visualRowFrom, visualColumnFrom >= 0 ? columnMapper.getRenderableFromVisualIndex(columnMapper.getNearestNotHiddenIndex(visualColumnFrom, 1)) : visualColumnFrom, visualRowTo >= 0 ? rowMapper.getRenderableFromVisualIndex(rowMapper.getNearestNotHiddenIndex(visualRowTo, -1)) : visualRowTo, visualColumnTo >= 0 ? columnMapper.getRenderableFromVisualIndex(columnMapper.getNearestNotHiddenIndex(visualColumnTo, -1)) : visualColumnTo];
          }
        },
        viewportRowCalculatorOverride: function viewportRowCalculatorOverride(calc) {
          var viewportOffset = _this2.settings.viewportRowRenderingOffset;
          if (viewportOffset === 'auto' && _this2.settings.fixedRowsTop) {
            viewportOffset = 10;
          }
          if (viewportOffset > 0 || viewportOffset === 'auto') {
            var renderableRows = _this2.countRenderableRows();
            var firstRenderedRow = calc.startRow;
            var lastRenderedRow = calc.endRow;
            if (typeof viewportOffset === 'number') {
              calc.startRow = Math.max(firstRenderedRow - viewportOffset, 0);
              calc.endRow = Math.min(lastRenderedRow + viewportOffset, renderableRows - 1);
            } else if (viewportOffset === 'auto') {
              var offset = Math.ceil(lastRenderedRow / renderableRows * 12);
              calc.startRow = Math.max(firstRenderedRow - offset, 0);
              calc.endRow = Math.min(lastRenderedRow + offset, renderableRows - 1);
            }
          }
          _this2.instance.runHooks('afterViewportRowCalculatorOverride', calc);
        },
        viewportColumnCalculatorOverride: function viewportColumnCalculatorOverride(calc) {
          var viewportOffset = _this2.settings.viewportColumnRenderingOffset;
          if (viewportOffset === 'auto' && _this2.settings.fixedColumnsStart) {
            viewportOffset = 10;
          }
          if (viewportOffset > 0 || viewportOffset === 'auto') {
            var renderableColumns = _this2.countRenderableColumns();
            var firstRenderedColumn = calc.startColumn;
            var lastRenderedColumn = calc.endColumn;
            if (typeof viewportOffset === 'number') {
              calc.startColumn = Math.max(firstRenderedColumn - viewportOffset, 0);
              calc.endColumn = Math.min(lastRenderedColumn + viewportOffset, renderableColumns - 1);
            }
            if (viewportOffset === 'auto') {
              var offset = Math.ceil(lastRenderedColumn / renderableColumns * 6);
              calc.startColumn = Math.max(firstRenderedColumn - offset, 0);
              calc.endColumn = Math.min(lastRenderedColumn + offset, renderableColumns - 1);
            }
          }
          _this2.instance.runHooks('afterViewportColumnCalculatorOverride', calc);
        },
        rowHeaderWidth: function rowHeaderWidth() {
          return _this2.settings.rowHeaderWidth;
        },
        columnHeaderHeight: function columnHeaderHeight() {
          var columnHeaderHeight = _this2.instance.runHooks('modifyColumnHeaderHeight');
          return _this2.settings.columnHeaderHeight || columnHeaderHeight;
        }
      };
      this.instance.runHooks('beforeInitWalkontable', walkontableConfig);
      this._wt = new _src.default(walkontableConfig);
      this.activeWt = this._wt;
      var spreader = this._wt.wtTable.spreader;
      // We have to cache width and height after Walkontable initialization.
      var _this$instance$rootEl = this.instance.rootElement.getBoundingClientRect(),
        width = _this$instance$rootEl.width,
        height = _this$instance$rootEl.height;
      this.setLastSize(width, height);
      this.eventManager.addEventListener(spreader, 'mousedown', function (event) {
        // right mouse button exactly on spreader means right click on the right hand side of vertical scrollbar
        if (event.target === spreader && event.which === 3) {
          event.stopPropagation();
        }
      });
      this.eventManager.addEventListener(spreader, 'contextmenu', function (event) {
        // right mouse button exactly on spreader means right click on the right hand side of vertical scrollbar
        if (event.target === spreader && event.which === 3) {
          event.stopPropagation();
        }
      });
      this.eventManager.addEventListener(this.instance.rootDocument.documentElement, 'click', function () {
        if (_this2.settings.observeDOMVisibility) {
          if (_this2._wt.drawInterrupted) {
            _this2.instance.forceFullRender = true;
            _this2.render();
          }
        }
      });
    }

    /**
     * Checks if it's possible to create text selection in element.
     *
     * @private
     * @param {HTMLElement} el The element to check.
     * @returns {boolean}
     */
  }, {
    key: "isTextSelectionAllowed",
    value: function isTextSelectionAllowed(el) {
      if ((0, _element.isInput)(el)) {
        return true;
      }
      var isChildOfTableBody = (0, _element.isChildOf)(el, this.instance.view._wt.wtTable.spreader);
      if (this.settings.fragmentSelection === true && isChildOfTableBody) {
        return true;
      }
      if (this.settings.fragmentSelection === 'cell' && this.isSelectedOnlyCell() && isChildOfTableBody) {
        return true;
      }
      if (!this.settings.fragmentSelection && this.isCellEdited() && this.isSelectedOnlyCell()) {
        return true;
      }
      return false;
    }

    /**
     * Checks if user's been called mousedown.
     *
     * @private
     * @returns {boolean}
     */
  }, {
    key: "isMouseDown",
    value: function isMouseDown() {
      return privatePool.get(this).mouseDown;
    }

    /**
     * Check if selected only one cell.
     *
     * @private
     * @returns {boolean}
     */
  }, {
    key: "isSelectedOnlyCell",
    value: function isSelectedOnlyCell() {
      var _this$instance$getSel, _this$instance$getSel2;
      return (_this$instance$getSel = (_this$instance$getSel2 = this.instance.getSelectedRangeLast()) === null || _this$instance$getSel2 === void 0 ? void 0 : _this$instance$getSel2.isSingle()) !== null && _this$instance$getSel !== void 0 ? _this$instance$getSel : false;
    }

    /**
     * Checks if active cell is editing.
     *
     * @private
     * @returns {boolean}
     */
  }, {
    key: "isCellEdited",
    value: function isCellEdited() {
      var activeEditor = this.instance.getActiveEditor();
      return activeEditor && activeEditor.isOpened();
    }

    /**
     * `beforeDraw` callback.
     *
     * @private
     * @param {boolean} force If `true` rendering was triggered by a change of settings or data or `false` if
     *                        rendering was triggered by scrolling or moving selection.
     * @param {object} skipRender Object with `skipRender` property, if it is set to `true ` the next rendering
     *                            cycle will be skipped.
     */
  }, {
    key: "beforeRender",
    value: function beforeRender(force, skipRender) {
      if (force) {
        // this.instance.forceFullRender = did Handsontable request full render?
        this.instance.runHooks('beforeViewRender', this.instance.forceFullRender, skipRender);
      }
    }

    /**
     * `afterRender` callback.
     *
     * @private
     * @param {boolean} force If `true` rendering was triggered by a change of settings or data or `false` if
     *                        rendering was triggered by scrolling or moving selection.
     */
  }, {
    key: "afterRender",
    value: function afterRender(force) {
      if (force) {
        // this.instance.forceFullRender = did Handsontable request full render?
        this.instance.runHooks('afterViewRender', this.instance.forceFullRender);
      }
    }

    /**
     * Append row header to a TH element.
     *
     * @private
     * @param {number} visualRowIndex The visual row index.
     * @param {HTMLTableHeaderCellElement} TH The table header element.
     */
  }, {
    key: "appendRowHeader",
    value: function appendRowHeader(visualRowIndex, TH) {
      if (TH.firstChild) {
        var container = TH.firstChild;
        if (!(0, _element.hasClass)(container, 'relative')) {
          (0, _element.empty)(TH);
          this.appendRowHeader(visualRowIndex, TH);
          return;
        }
        this.updateCellHeader(container.querySelector('.rowHeader'), visualRowIndex, this.instance.getRowHeader);
      } else {
        var _this$instance4 = this.instance,
          rootDocument = _this$instance4.rootDocument,
          getRowHeader = _this$instance4.getRowHeader;
        var div = rootDocument.createElement('div');
        var span = rootDocument.createElement('span');
        div.className = 'relative';
        span.className = 'rowHeader';
        this.updateCellHeader(span, visualRowIndex, getRowHeader);
        div.appendChild(span);
        TH.appendChild(div);
      }
      this.instance.runHooks('afterGetRowHeader', visualRowIndex, TH);
    }

    /**
     * Append column header to a TH element.
     *
     * @private
     * @param {number} visualColumnIndex Visual column index.
     * @param {HTMLTableCellElement} TH The table header element.
     * @param {Function} label The function that returns the header label.
     * @param {number} [headerLevel=0] The index of header level counting from the top (positive
     *                                 values counting from 0 to N).
     */
  }, {
    key: "appendColHeader",
    value: function appendColHeader(visualColumnIndex, TH) {
      var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.instance.getColHeader;
      var headerLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      if (TH.firstChild) {
        var container = TH.firstChild;
        if ((0, _element.hasClass)(container, 'relative')) {
          this.updateCellHeader(container.querySelector('.colHeader'), visualColumnIndex, label);
        } else {
          (0, _element.empty)(TH);
          this.appendColHeader(visualColumnIndex, TH, headerLevel);
        }
      } else {
        var rootDocument = this.instance.rootDocument;
        var div = rootDocument.createElement('div');
        var span = rootDocument.createElement('span');
        div.className = 'relative';
        span.className = 'colHeader';
        this.updateCellHeader(span, visualColumnIndex, label);
        div.appendChild(span);
        TH.appendChild(div);
      }
      this.instance.runHooks('afterGetColHeader', visualColumnIndex, TH, headerLevel);
    }

    /**
     * Updates header cell content.
     *
     * @since 0.15.0-beta4
     * @param {HTMLElement} element Element to update.
     * @param {number} index Row index or column index.
     * @param {Function} content Function which should be returns content for this cell.
     */
  }, {
    key: "updateCellHeader",
    value: function updateCellHeader(element, index, content) {
      var renderedIndex = index;
      var parentOverlay = this._wt.wtOverlays.getParentOverlay(element) || this._wt;

      // prevent wrong calculations from SampleGenerator
      if (element.parentNode) {
        if ((0, _element.hasClass)(element, 'colHeader')) {
          renderedIndex = parentOverlay.wtTable.columnFilter.sourceToRendered(index);
        } else if ((0, _element.hasClass)(element, 'rowHeader')) {
          renderedIndex = parentOverlay.wtTable.rowFilter.sourceToRendered(index);
        }
      }
      if (renderedIndex > -1) {
        (0, _element.fastInnerHTML)(element, content(index));
      } else {
        // workaround for https://github.com/handsontable/handsontable/issues/1946
        (0, _element.fastInnerText)(element, String.fromCharCode(160));
        (0, _element.addClass)(element, 'cornerHeader');
      }
    }

    /**
     * Given a element's left (or right in RTL mode) position relative to the viewport, returns maximum
     * element width until the right (or left) edge of the viewport (before scrollbar).
     *
     * @private
     * @param {number} inlineOffset The left (or right in RTL mode) offset.
     * @returns {number}
     */
  }, {
    key: "maximumVisibleElementWidth",
    value: function maximumVisibleElementWidth(inlineOffset) {
      var workspaceWidth = this._wt.wtViewport.getWorkspaceWidth();
      var maxWidth = workspaceWidth - inlineOffset;
      return maxWidth > 0 ? maxWidth : 0;
    }

    /**
     * Given a element's top position relative to the viewport, returns maximum element height until the bottom
     * edge of the viewport (before scrollbar).
     *
     * @private
     * @param {number} topOffset The top offset.
     * @returns {number}
     */
  }, {
    key: "maximumVisibleElementHeight",
    value: function maximumVisibleElementHeight(topOffset) {
      var workspaceHeight = this._wt.wtViewport.getWorkspaceHeight();
      var maxHeight = workspaceHeight - topOffset;
      return maxHeight > 0 ? maxHeight : 0;
    }

    /**
     * Sets new dimensions of the container.
     *
     * @param {number} width The table width.
     * @param {number} height The table height.
     */
  }, {
    key: "setLastSize",
    value: function setLastSize(width, height) {
      var priv = privatePool.get(this);
      var _ref2 = [width, height];
      priv.lastWidth = _ref2[0];
      priv.lastHeight = _ref2[1];
    }

    /**
     * Returns cached dimensions.
     *
     * @returns {object}
     */
  }, {
    key: "getLastSize",
    value: function getLastSize() {
      var priv = privatePool.get(this);
      return {
        width: priv.lastWidth,
        height: priv.lastHeight
      };
    }

    /**
     * Returns the first fully visible row in the table viewport.
     *
     * @returns {number}
     */
  }, {
    key: "getFirstFullyVisibleRow",
    value: function getFirstFullyVisibleRow() {
      return this.instance.rowIndexMapper.getVisualFromRenderableIndex(this.instance.view._wt.wtScroll.getFirstVisibleRow());
    }

    /**
     * Returns the last fully visible row in the table viewport.
     *
     * @returns {number}
     */
  }, {
    key: "getLastFullyVisibleRow",
    value: function getLastFullyVisibleRow() {
      return this.instance.rowIndexMapper.getVisualFromRenderableIndex(this.instance.view._wt.wtScroll.getLastVisibleRow());
    }

    /**
     * Returns the first fully visible column in the table viewport.
     *
     * @returns {number}
     */
  }, {
    key: "getFirstFullyVisibleColumn",
    value: function getFirstFullyVisibleColumn() {
      return this.instance.columnIndexMapper.getVisualFromRenderableIndex(this.instance.view._wt.wtScroll.getFirstVisibleColumn());
    }

    /**
     * Returns the last fully visible column in the table viewport.
     *
     * @returns {number}
     */
  }, {
    key: "getLastFullyVisibleColumn",
    value: function getLastFullyVisibleColumn() {
      return this.instance.columnIndexMapper.getVisualFromRenderableIndex(this.instance.view._wt.wtScroll.getLastVisibleColumn());
    }

    /**
     * Destroys internal WalkOnTable's instance. Detaches all of the bonded listeners.
     *
     * @private
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this._wt.destroy();
      this.eventManager.destroy();
    }
  }]);
  return TableView;
}();
var _default = TableView;
exports.default = _default;