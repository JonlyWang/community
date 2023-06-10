function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { getScrollbarWidth, getStyle, offset, outerHeight, outerWidth } from "../../../helpers/dom/element.mjs";
import { objectEach } from "../../../helpers/object.mjs";
import { RENDER_TYPE, FULLY_VISIBLE_TYPE, ViewportColumnsCalculator, ViewportRowsCalculator } from "./calculator/index.mjs"; /**
                                                                                                                              * @class Viewport
                                                                                                                              */
var Viewport = /*#__PURE__*/function () {
  /**
   * @param {ViewportDao} dataAccessObject The Walkontable instance.
   * @param {DomBindings} domBindings Bindings into DOM.
   * @param {Settings} wtSettings The Walkontable settings.
   * @param {EventManager} eventManager The instance event manager.
   * @param {Table} wtTable The table.
   */
  function Viewport(dataAccessObject, domBindings, wtSettings, eventManager, wtTable) {
    var _this = this;
    _classCallCheck(this, Viewport);
    this.dataAccessObject = dataAccessObject;
    // legacy support
    this.wot = dataAccessObject.wot;
    this.instance = this.wot;
    this.domBindings = domBindings;
    this.wtSettings = wtSettings;
    this.wtTable = wtTable;
    this.oversizedRows = [];
    this.oversizedColumnHeaders = [];
    this.hasOversizedColumnHeadersMarked = {};
    this.clientHeight = 0;
    this.containerWidth = NaN;
    this.rowHeaderWidth = NaN;
    this.rowsVisibleCalculator = null;
    this.columnsVisibleCalculator = null;
    this.eventManager = eventManager;
    this.eventManager.addEventListener(this.domBindings.rootWindow, 'resize', function () {
      _this.clientHeight = _this.getWorkspaceHeight();
    });
  }

  /**
   * @returns {number}
   */
  _createClass(Viewport, [{
    key: "getWorkspaceHeight",
    value: function getWorkspaceHeight() {
      var currentDocument = this.domBindings.rootDocument;
      var trimmingContainer = this.dataAccessObject.topOverlayTrimmingContainer;
      var height = 0;
      if (trimmingContainer === this.domBindings.rootWindow) {
        height = currentDocument.documentElement.clientHeight;
      } else {
        var elemHeight = outerHeight(trimmingContainer);

        // returns height without DIV scrollbar
        height = elemHeight > 0 && trimmingContainer.clientHeight > 0 ? trimmingContainer.clientHeight : Infinity;
      }
      return height;
    }
  }, {
    key: "getWorkspaceWidth",
    value: function getWorkspaceWidth() {
      var wtSettings = this.wtSettings;
      var _this$domBindings = this.domBindings,
        rootDocument = _this$domBindings.rootDocument,
        rootWindow = _this$domBindings.rootWindow;
      var trimmingContainer = this.dataAccessObject.inlineStartOverlayTrimmingContainer;
      var docOffsetWidth = rootDocument.documentElement.offsetWidth;
      var totalColumns = wtSettings.getSetting('totalColumns');
      var preventOverflow = wtSettings.getSetting('preventOverflow');
      var isRtl = wtSettings.getSetting('rtlMode');
      var tableRect = this.wtTable.TABLE.getBoundingClientRect();
      var inlineStart = isRtl ? tableRect.right - docOffsetWidth : tableRect.left;
      var tableOffset = docOffsetWidth - inlineStart;
      var width;
      var overflow;
      if (preventOverflow) {
        return outerWidth(this.wtTable.wtRootElement);
      }
      if (wtSettings.getSetting('freezeOverlays')) {
        width = Math.min(tableOffset, docOffsetWidth);
      } else {
        width = Math.min(this.getContainerFillWidth(), tableOffset, docOffsetWidth);
      }
      if (trimmingContainer === rootWindow && totalColumns > 0 && this.sumColumnWidths(0, totalColumns - 1) > width) {
        // in case sum of column widths is higher than available stylesheet width, let's assume using the whole window
        // otherwise continue below, which will allow stretching
        // this is used in `scroll_window.html`
        // TODO test me
        return rootDocument.documentElement.clientWidth;
      }
      if (trimmingContainer !== rootWindow) {
        overflow = getStyle(this.dataAccessObject.inlineStartOverlayTrimmingContainer, 'overflow', rootWindow);
        if (overflow === 'scroll' || overflow === 'hidden' || overflow === 'auto') {
          // this is used in `scroll.html`
          // TODO test me
          return Math.max(width, trimmingContainer.clientWidth);
        }
      }
      var stretchSetting = wtSettings.getSetting('stretchH');
      if (stretchSetting === 'none' || !stretchSetting) {
        // if no stretching is used, return the maximum used workspace width
        return Math.max(width, outerWidth(this.wtTable.TABLE));
      }

      // if stretching is used, return the actual container width, so the columns can fit inside it
      return width;
    }

    /**
     * Checks if viewport has vertical scroll.
     *
     * @returns {boolean}
     */
  }, {
    key: "hasVerticalScroll",
    value: function hasVerticalScroll() {
      return this.wtTable.hider.offsetHeight > this.getWorkspaceHeight();
    }

    /**
     * Checks if viewport has horizontal scroll.
     *
     * @returns {boolean}
     */
  }, {
    key: "hasHorizontalScroll",
    value: function hasHorizontalScroll() {
      return this.wtTable.hider.offsetWidth > this.getWorkspaceWidth();
    }

    /**
     * @param {number} from The visual column index from the width sum is start calculated.
     * @param {number} length The length of the column to traverse.
     * @returns {number}
     */
  }, {
    key: "sumColumnWidths",
    value: function sumColumnWidths(from, length) {
      var sum = 0;
      var column = from;
      while (column < length) {
        sum += this.wtTable.getColumnWidth(column);
        column += 1;
      }
      return sum;
    }

    /**
     * @returns {number}
     */
  }, {
    key: "getContainerFillWidth",
    value: function getContainerFillWidth() {
      if (this.containerWidth) {
        return this.containerWidth;
      }
      var mainContainer = this.wtTable.holder;
      var dummyElement = this.domBindings.rootDocument.createElement('div');
      dummyElement.style.width = '100%';
      dummyElement.style.height = '1px';
      mainContainer.appendChild(dummyElement);
      var fillWidth = dummyElement.offsetWidth;
      this.containerWidth = fillWidth;
      mainContainer.removeChild(dummyElement);
      return fillWidth;
    }

    /**
     * @returns {number}
     */
  }, {
    key: "getWorkspaceOffset",
    value: function getWorkspaceOffset() {
      return offset(this.wtTable.TABLE);
    }

    /**
     * @returns {number}
     */
  }, {
    key: "getColumnHeaderHeight",
    value: function getColumnHeaderHeight() {
      var columnHeaders = this.wtSettings.getSetting('columnHeaders');
      if (!columnHeaders.length) {
        this.columnHeaderHeight = 0;
      } else if (isNaN(this.columnHeaderHeight)) {
        this.columnHeaderHeight = outerHeight(this.wtTable.THEAD);
      }
      return this.columnHeaderHeight;
    }

    /**
     * @returns {number}
     */
  }, {
    key: "getViewportHeight",
    value: function getViewportHeight() {
      var containerHeight = this.getWorkspaceHeight();
      if (containerHeight === Infinity) {
        return containerHeight;
      }
      var columnHeaderHeight = this.getColumnHeaderHeight();
      if (columnHeaderHeight > 0) {
        containerHeight -= columnHeaderHeight;
      }
      return containerHeight;
    }

    /**
     * @returns {number}
     */
  }, {
    key: "getRowHeaderWidth",
    value: function getRowHeaderWidth() {
      var rowHeadersWidthSetting = this.wtSettings.getSetting('rowHeaderWidth');
      var rowHeaders = this.wtSettings.getSetting('rowHeaders');
      if (rowHeadersWidthSetting) {
        this.rowHeaderWidth = 0;
        for (var i = 0, len = rowHeaders.length; i < len; i++) {
          this.rowHeaderWidth += rowHeadersWidthSetting[i] || rowHeadersWidthSetting;
        }
      }
      if (isNaN(this.rowHeaderWidth)) {
        if (rowHeaders.length) {
          var TH = this.wtTable.TABLE.querySelector('TH');
          this.rowHeaderWidth = 0;
          for (var _i = 0, _len = rowHeaders.length; _i < _len; _i++) {
            if (TH) {
              this.rowHeaderWidth += outerWidth(TH);
              TH = TH.nextSibling;
            } else {
              // yes this is a cheat but it worked like that before, just taking assumption from CSS instead of measuring.
              // TODO: proper fix
              this.rowHeaderWidth += 50;
            }
          }
        } else {
          this.rowHeaderWidth = 0;
        }
      }
      this.rowHeaderWidth = this.wtSettings.getSetting('onModifyRowHeaderWidth', this.rowHeaderWidth) || this.rowHeaderWidth;
      return this.rowHeaderWidth;
    }

    /**
     * @returns {number}
     */
  }, {
    key: "getViewportWidth",
    value: function getViewportWidth() {
      var containerWidth = this.getWorkspaceWidth();
      if (containerWidth === Infinity) {
        return containerWidth;
      }
      var rowHeaderWidth = this.getRowHeaderWidth();
      if (rowHeaderWidth > 0) {
        return containerWidth - rowHeaderWidth;
      }
      return containerWidth;
    }

    /**
     * Creates:
     * - rowsRenderCalculator (before draw, to qualify rows for rendering)
     * - rowsVisibleCalculator (after draw, to measure which rows are actually visible).
     *
     * @param {number} calculationType The render type ID, which determines for what type of
     *                                 calculation calculator is created.
     * @returns {ViewportRowsCalculator}
     */
  }, {
    key: "createRowsCalculator",
    value: function createRowsCalculator() {
      var calculationType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RENDER_TYPE;
      var wtSettings = this.wtSettings,
        wtTable = this.wtTable;
      var height;
      var scrollbarHeight;
      var fixedRowsHeight;
      this.rowHeaderWidth = NaN;
      if (wtSettings.getSetting('renderAllRows') && calculationType === RENDER_TYPE) {
        height = Infinity;
      } else {
        height = this.getViewportHeight();
      }
      var pos = this.dataAccessObject.topScrollPosition - this.dataAccessObject.topParentOffset;
      if (pos < 0) {
        pos = 0;
      }
      var fixedRowsTop = wtSettings.getSetting('fixedRowsTop');
      var fixedRowsBottom = wtSettings.getSetting('fixedRowsBottom');
      var totalRows = wtSettings.getSetting('totalRows');
      if (fixedRowsTop) {
        fixedRowsHeight = this.dataAccessObject.topOverlay.sumCellSizes(0, fixedRowsTop);
        pos += fixedRowsHeight;
        height -= fixedRowsHeight;
      }
      if (fixedRowsBottom && this.dataAccessObject.bottomOverlay.clone) {
        fixedRowsHeight = this.dataAccessObject.bottomOverlay.sumCellSizes(totalRows - fixedRowsBottom, totalRows);
        height -= fixedRowsHeight;
      }
      if (wtTable.holder.clientHeight === wtTable.holder.offsetHeight) {
        scrollbarHeight = 0;
      } else {
        scrollbarHeight = getScrollbarWidth(this.domBindings.rootDocument);
      }
      return new ViewportRowsCalculator({
        viewportSize: height,
        scrollOffset: pos,
        totalItems: wtSettings.getSetting('totalRows'),
        itemSizeFn: function itemSizeFn(sourceRow) {
          return wtTable.getRowHeight(sourceRow);
        },
        overrideFn: wtSettings.getSettingPure('viewportRowCalculatorOverride'),
        calculationType: calculationType,
        scrollbarHeight: scrollbarHeight
      });
    }

    /**
     * Creates:
     * - columnsRenderCalculator (before draw, to qualify columns for rendering)
     * - columnsVisibleCalculator (after draw, to measure which columns are actually visible).
     *
     * @param {number} calculationType The render type ID, which determines for what type of
     *                                 calculation calculator is created.
     * @returns {ViewportColumnsCalculator}
     */
  }, {
    key: "createColumnsCalculator",
    value: function createColumnsCalculator() {
      var calculationType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : RENDER_TYPE;
      var wtSettings = this.wtSettings,
        wtTable = this.wtTable;
      var width = this.getViewportWidth();
      var pos = Math.abs(this.dataAccessObject.inlineStartScrollPosition) - this.dataAccessObject.inlineStartParentOffset;
      this.columnHeaderHeight = NaN;
      if (pos < 0) {
        pos = 0;
      }
      var fixedColumnsStart = wtSettings.getSetting('fixedColumnsStart');
      if (fixedColumnsStart) {
        var fixedColumnsWidth = this.dataAccessObject.inlineStartOverlay.sumCellSizes(0, fixedColumnsStart);
        pos += fixedColumnsWidth;
        width -= fixedColumnsWidth;
      }
      if (wtTable.holder.clientWidth !== wtTable.holder.offsetWidth) {
        width -= getScrollbarWidth(this.domBindings.rootDocument);
      }
      return new ViewportColumnsCalculator({
        viewportSize: width,
        scrollOffset: Math.abs(pos),
        totalItems: wtSettings.getSetting('totalColumns'),
        itemSizeFn: function itemSizeFn(sourceCol) {
          return wtTable.getColumnWidth(sourceCol);
        },
        overrideFn: wtSettings.getSettingPure('viewportColumnCalculatorOverride'),
        calculationType: calculationType,
        stretchMode: wtSettings.getSetting('stretchH'),
        stretchingItemWidthFn: function stretchingItemWidthFn(stretchedWidth, column) {
          return wtSettings.getSetting('onBeforeStretchingColumnWidth', stretchedWidth, column);
        }
      });
    }

    /**
     * Creates rowsRenderCalculator and columnsRenderCalculator (before draw, to determine what rows and
     * cols should be rendered).
     *
     * @param {boolean} fastDraw If `true`, will try to avoid full redraw and only update the border positions.
     *                           If `false` or `undefined`, will perform a full redraw.
     * @returns {boolean} The fastDraw value, possibly modified.
     */
  }, {
    key: "createRenderCalculators",
    value: function createRenderCalculators() {
      var fastDraw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var runFastDraw = fastDraw;
      if (runFastDraw) {
        var proposedRowsVisibleCalculator = this.createRowsCalculator(FULLY_VISIBLE_TYPE);
        var proposedColumnsVisibleCalculator = this.createColumnsCalculator(FULLY_VISIBLE_TYPE);
        if (!(this.areAllProposedVisibleRowsAlreadyRendered(proposedRowsVisibleCalculator) && this.areAllProposedVisibleColumnsAlreadyRendered(proposedColumnsVisibleCalculator))) {
          runFastDraw = false;
        }
      }
      if (!runFastDraw) {
        this.rowsRenderCalculator = this.createRowsCalculator(RENDER_TYPE);
        this.columnsRenderCalculator = this.createColumnsCalculator(RENDER_TYPE);
      }
      // delete temporarily to make sure that renderers always use rowsRenderCalculator, not rowsVisibleCalculator
      this.rowsVisibleCalculator = null;
      this.columnsVisibleCalculator = null;
      return runFastDraw;
    }

    /**
     * Creates rowsVisibleCalculator and columnsVisibleCalculator (after draw, to determine what are
     * the actually fully visible rows and columns).
     */
  }, {
    key: "createVisibleCalculators",
    value: function createVisibleCalculators() {
      this.rowsVisibleCalculator = this.createRowsCalculator(FULLY_VISIBLE_TYPE);
      this.columnsVisibleCalculator = this.createColumnsCalculator(FULLY_VISIBLE_TYPE);
    }

    /**
     * Returns information whether proposedRowsVisibleCalculator viewport
     * is contained inside rows rendered in previous draw (cached in rowsRenderCalculator).
     *
     * @param {ViewportRowsCalculator} proposedRowsVisibleCalculator The instance of the viewport calculator to compare with.
     * @returns {boolean} Returns `true` if all proposed visible rows are already rendered (meaning: redraw is not needed).
     *                    Returns `false` if at least one proposed visible row is not already rendered (meaning: redraw is needed).
     */
  }, {
    key: "areAllProposedVisibleRowsAlreadyRendered",
    value: function areAllProposedVisibleRowsAlreadyRendered(proposedRowsVisibleCalculator) {
      if (!this.rowsVisibleCalculator) {
        return false;
      }
      var startRow = proposedRowsVisibleCalculator.startRow,
        endRow = proposedRowsVisibleCalculator.endRow;

      // if there are no fully visible rows at all, return false
      if (startRow === null && endRow === null) {
        return false;
      }
      var _this$rowsRenderCalcu = this.rowsRenderCalculator,
        renderedStartRow = _this$rowsRenderCalcu.startRow,
        renderedEndRow = _this$rowsRenderCalcu.endRow;
      if (startRow < renderedStartRow || startRow === renderedStartRow && startRow > 0) {
        return false;
      } else if (endRow > renderedEndRow || endRow === renderedEndRow && endRow < this.wtSettings.getSetting('totalRows') - 1) {
        return false;
      }
      return true;
    }

    /**
     * Returns information whether proposedColumnsVisibleCalculator viewport
     * is contained inside column rendered in previous draw (cached in columnsRenderCalculator).
     *
     * @param {ViewportRowsCalculator} proposedColumnsVisibleCalculator The instance of the viewport calculator to compare with.
     * @returns {boolean} Returns `true` if all proposed visible columns are already rendered (meaning: redraw is not needed).
     *                    Returns `false` if at least one proposed visible column is not already rendered (meaning: redraw is needed).
     */
  }, {
    key: "areAllProposedVisibleColumnsAlreadyRendered",
    value: function areAllProposedVisibleColumnsAlreadyRendered(proposedColumnsVisibleCalculator) {
      if (!this.columnsVisibleCalculator) {
        return false;
      }
      var startColumn = proposedColumnsVisibleCalculator.startColumn,
        endColumn = proposedColumnsVisibleCalculator.endColumn;

      // if there are no fully visible columns at all, return false
      if (startColumn === null && endColumn === null) {
        return false;
      }
      var _this$columnsRenderCa = this.columnsRenderCalculator,
        renderedStartColumn = _this$columnsRenderCa.startColumn,
        renderedEndColumn = _this$columnsRenderCa.endColumn;
      if (startColumn < renderedStartColumn || startColumn === renderedStartColumn && startColumn > 0) {
        return false;
      } else if (endColumn > renderedEndColumn || endColumn === renderedEndColumn && endColumn < this.wtSettings.getSetting('totalColumns') - 1) {
        return false;
      }
      return true;
    }

    /**
     * Resets values in keys of the hasOversizedColumnHeadersMarked object after updateSettings.
     */
  }, {
    key: "resetHasOversizedColumnHeadersMarked",
    value: function resetHasOversizedColumnHeadersMarked() {
      objectEach(this.hasOversizedColumnHeadersMarked, function (value, key, object) {
        object[key] = void 0;
      });
    }
  }]);
  return Viewport;
}();
export default Viewport;