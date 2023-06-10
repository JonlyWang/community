import "core-js/modules/es.number.is-integer.js";
import "core-js/modules/es.number.constructor.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import { innerHeight, innerWidth, getScrollLeft, getScrollTop, offset } from "../../../helpers/dom/element.mjs"; /**
                                                                                                                  * @class Scroll
                                                                                                                  */
var Scroll = /*#__PURE__*/function () {
  /**
   * The data access object.
   *
   * @protected
   * @type {ScrollDao}
   */

  /**
   * Holds the last column reached by the scroll, which determines the scroll snapping direction
   * (left or right) for a next horizontal scroll.
   *
   * @protected
   * @type {number}
   */

  /**
   * Holds the last row reached by the scroll, which determines the scroll snapping direction
   * (top or bottom) for a next vertical scroll.
   *
   * @protected
   * @type {number}
   */

  /**
   * @param {ScrollDao} dataAccessObject Tha data access object.
   */
  function Scroll(dataAccessObject) {
    _classCallCheck(this, Scroll);
    _defineProperty(this, "dataAccessObject", void 0);
    _defineProperty(this, "lastScrolledColumnPos", -1);
    _defineProperty(this, "lastScrolledRowPos", -1);
    this.dataAccessObject = dataAccessObject;
  }

  /**
   * Scrolls viewport to a cell.
   *
   * @param {CellCoords} coords The cell coordinates.
   * @param {boolean} [snapToTop] If `true`, viewport is scrolled to show the cell on the top of the table.
   * @param {boolean} [snapToRight] If `true`, viewport is scrolled to show the cell on the right of the table.
   * @param {boolean} [snapToBottom] If `true`, viewport is scrolled to show the cell on the bottom of the table.
   * @param {boolean} [snapToLeft] If `true`, viewport is scrolled to show the cell on the left of the table.
   * @returns {boolean}
   */
  _createClass(Scroll, [{
    key: "scrollViewport",
    value: function scrollViewport(coords, snapToTop, snapToRight, snapToBottom, snapToLeft) {
      var scrolledHorizontally = this.scrollViewportHorizontally(coords.col, snapToRight, snapToLeft);
      var scrolledVertically = this.scrollViewportVertically(coords.row, snapToTop, snapToBottom);
      return scrolledHorizontally || scrolledVertically;
    }

    /**
     * Scrolls viewport to a column.
     *
     * @param {number} column Visual column index.
     * @param {boolean} [snapToRight] If `true`, viewport is scrolled to show the cell on the right of the table.
     * @param {boolean} [snapToLeft] If `true`, viewport is scrolled to show the cell on the left of the table.
     * @returns {boolean}
     */
  }, {
    key: "scrollViewportHorizontally",
    value: function scrollViewportHorizontally(column, snapToRight, snapToLeft) {
      var _this$dataAccessObjec = this.dataAccessObject,
        drawn = _this$dataAccessObjec.drawn,
        totalColumns = _this$dataAccessObjec.totalColumns;

      // do not scroll the viewport when the column points to a range outside of the dataset
      if (!drawn || !Number.isInteger(column) || column < 0 || column > totalColumns) {
        return false;
      }
      var firstVisibleColumn = this.getFirstVisibleColumn();
      var lastVisibleColumn = this.getLastVisibleColumn();
      var autoSnapping = snapToRight === void 0 && snapToLeft === void 0;
      var _this$dataAccessObjec2 = this.dataAccessObject,
        fixedColumnsStart = _this$dataAccessObjec2.fixedColumnsStart,
        inlineStartOverlay = _this$dataAccessObjec2.inlineStartOverlay;

      // for auto-snapping (both snap* arguments are undefined) do not scroll the viewport
      // when the columns points to the overlays
      if (autoSnapping && column < fixedColumnsStart) {
        return false;
      }
      var result = false;

      // if there is no fully visible columns use the supporting variable (lastScrolledColumnPos) to
      // determine the snapping direction (left or right)
      if (firstVisibleColumn === -1) {
        result = inlineStartOverlay.scrollTo(column, autoSnapping ? column > this.lastScrolledColumnPos : snapToRight);
      } else if (autoSnapping && (column < firstVisibleColumn || column > lastVisibleColumn) || !autoSnapping) {
        // if there is at least one fully visible column determine the snapping direction based on
        // that columns or by snapToRight/snapToLeft flags, if provided.
        result = inlineStartOverlay.scrollTo(column, autoSnapping ? column > lastVisibleColumn : snapToRight);
      }
      if (result) {
        this.lastScrolledColumnPos = column;
      }
      return result;
    }

    /**
     * Scrolls viewport to a row.
     *
     * @param {number} row Visual row index.
     * @param {boolean} [snapToTop] If `true`, viewport is scrolled to show the cell on the top of the table.
     * @param {boolean} [snapToBottom] If `true`, viewport is scrolled to show the cell on the bottom of the table.
     * @returns {boolean}
     */
  }, {
    key: "scrollViewportVertically",
    value: function scrollViewportVertically(row, snapToTop, snapToBottom) {
      var _this$dataAccessObjec3 = this.dataAccessObject,
        drawn = _this$dataAccessObjec3.drawn,
        totalRows = _this$dataAccessObjec3.totalRows;

      // do not scroll the viewport when the row points to a range outside of the dataset
      if (!drawn || !Number.isInteger(row) || row < 0 || row > totalRows) {
        return false;
      }
      var firstVisibleRow = this.getFirstVisibleRow();
      var lastVisibleRow = this.getLastVisibleRow();
      var autoSnapping = snapToTop === void 0 && snapToBottom === void 0;
      var _this$dataAccessObjec4 = this.dataAccessObject,
        fixedRowsBottom = _this$dataAccessObjec4.fixedRowsBottom,
        fixedRowsTop = _this$dataAccessObjec4.fixedRowsTop,
        topOverlay = _this$dataAccessObjec4.topOverlay;

      // for auto-snapping (both snap* arguments are undefined) do not scroll the viewport
      // when the rows points to the overlays
      if (autoSnapping && (row < fixedRowsTop || row > totalRows - fixedRowsBottom - 1)) {
        return false;
      }
      var result = false;

      // if there is no fully visible rows use the supporting variable (lastScrolledRowPos) to
      // determine the snapping direction (top or bottom)
      if (firstVisibleRow === -1) {
        result = topOverlay.scrollTo(row, autoSnapping ? row > this.lastScrolledRowPos : snapToBottom);
      } else if (autoSnapping && (row < firstVisibleRow || row > lastVisibleRow) || !autoSnapping) {
        // if there is at least one fully visible row determine the snapping direction based on
        // that rows or by snapToTop/snapToBottom flags, if provided.
        result = topOverlay.scrollTo(row, autoSnapping ? row > lastVisibleRow : snapToBottom);
      }
      if (result) {
        this.lastScrolledRowPos = row;
      }
      return result;
    }

    /**
     * Get first visible row based on virtual dom and how table is visible in browser window viewport.
     *
     * @returns {number}
     */
  }, {
    key: "getFirstVisibleRow",
    value: function getFirstVisibleRow() {
      var _this$dataAccessObjec5 = this.dataAccessObject,
        topOverlay = _this$dataAccessObjec5.topOverlay,
        wtTable = _this$dataAccessObjec5.wtTable,
        wtViewport = _this$dataAccessObjec5.wtViewport,
        totalRows = _this$dataAccessObjec5.totalRows,
        fixedRowsTop = _this$dataAccessObjec5.fixedRowsTop,
        rootWindow = _this$dataAccessObjec5.rootWindow;
      var firstVisibleRow = wtTable.getFirstVisibleRow();
      if (topOverlay.mainTableScrollableElement === rootWindow) {
        var rootElementOffset = offset(wtTable.wtRootElement);
        var totalTableHeight = innerHeight(wtTable.hider);
        var windowHeight = innerHeight(rootWindow);
        var windowScrollTop = getScrollTop(rootWindow, rootWindow);

        // Only calculate firstVisibleRow when table didn't filled (from up) whole viewport space
        if (rootElementOffset.top + totalTableHeight - windowHeight <= windowScrollTop) {
          var rowsHeight = wtViewport.getColumnHeaderHeight();
          rowsHeight += topOverlay.sumCellSizes(0, fixedRowsTop);
          for (var row = totalRows; row > 0; row--) {
            rowsHeight += topOverlay.sumCellSizes(row - 1, row);
            if (rootElementOffset.top + totalTableHeight - rowsHeight <= windowScrollTop) {
              // Return physical row + 1
              firstVisibleRow = row;
              break;
            }
          }
        }
      }
      return firstVisibleRow;
    }

    /**
     * Get last visible row based on virtual dom and how table is visible in browser window viewport.
     *
     * @returns {number}
     */
  }, {
    key: "getLastVisibleRow",
    value: function getLastVisibleRow() {
      var _this$dataAccessObjec6 = this.dataAccessObject,
        topOverlay = _this$dataAccessObjec6.topOverlay,
        wtTable = _this$dataAccessObjec6.wtTable,
        wtViewport = _this$dataAccessObjec6.wtViewport,
        totalRows = _this$dataAccessObjec6.totalRows,
        rootWindow = _this$dataAccessObjec6.rootWindow;
      var lastVisibleRow = wtTable.getLastVisibleRow();
      if (topOverlay.mainTableScrollableElement === rootWindow) {
        var rootElementOffset = offset(wtTable.wtRootElement);
        var windowScrollTop = getScrollTop(rootWindow, rootWindow);

        // Only calculate lastVisibleRow when table didn't filled (from bottom) whole viewport space
        if (rootElementOffset.top > windowScrollTop) {
          var windowHeight = innerHeight(rootWindow);
          var rowsHeight = wtViewport.getColumnHeaderHeight();
          for (var row = 1; row <= totalRows; row++) {
            rowsHeight += topOverlay.sumCellSizes(row - 1, row);
            if (rootElementOffset.top + rowsHeight - windowScrollTop >= windowHeight) {
              // Return physical row - 1 (-2 because rangeEach gives row index + 1 - sumCellSizes requirements)
              lastVisibleRow = row - 2;
              break;
            }
          }
        }
      }
      return lastVisibleRow;
    }

    /**
     * Get first visible column based on virtual dom and how table is visible in browser window viewport.
     *
     * @returns {number}
     */
  }, {
    key: "getFirstVisibleColumn",
    value: function getFirstVisibleColumn() {
      var _this$dataAccessObjec7 = this.dataAccessObject,
        inlineStartOverlay = _this$dataAccessObjec7.inlineStartOverlay,
        wtTable = _this$dataAccessObjec7.wtTable,
        wtViewport = _this$dataAccessObjec7.wtViewport,
        totalColumns = _this$dataAccessObjec7.totalColumns,
        rootWindow = _this$dataAccessObjec7.rootWindow;
      var firstVisibleColumn = wtTable.getFirstVisibleColumn();
      if (inlineStartOverlay.mainTableScrollableElement === rootWindow) {
        var rootElementOffset = offset(wtTable.wtRootElement);
        var totalTableWidth = innerWidth(wtTable.hider);
        var windowWidth = innerWidth(rootWindow);
        var windowScrollLeft = Math.abs(getScrollLeft(rootWindow, rootWindow));

        // Only calculate firstVisibleColumn when table didn't filled (from left) whole viewport space
        if (rootElementOffset.left + totalTableWidth - windowWidth <= windowScrollLeft) {
          var columnsWidth = wtViewport.getRowHeaderWidth();
          for (var column = totalColumns; column > 0; column--) {
            columnsWidth += inlineStartOverlay.sumCellSizes(column - 1, column);
            if (rootElementOffset.left + totalTableWidth - columnsWidth <= windowScrollLeft) {
              // Return physical column + 1
              firstVisibleColumn = column;
              break;
            }
          }
        }
      }
      return firstVisibleColumn;
    }

    /**
     * Get last visible column based on virtual dom and how table is visible in browser window viewport.
     *
     * @returns {number}
     */
  }, {
    key: "getLastVisibleColumn",
    value: function getLastVisibleColumn() {
      var _this$dataAccessObjec8 = this.dataAccessObject,
        inlineStartOverlay = _this$dataAccessObjec8.inlineStartOverlay,
        wtTable = _this$dataAccessObjec8.wtTable,
        wtViewport = _this$dataAccessObjec8.wtViewport,
        totalColumns = _this$dataAccessObjec8.totalColumns,
        rootWindow = _this$dataAccessObjec8.rootWindow;
      var lastVisibleColumn = wtTable.getLastVisibleColumn();
      if (inlineStartOverlay.mainTableScrollableElement === rootWindow) {
        var rootElementOffset = offset(wtTable.wtRootElement);
        var windowScrollLeft = Math.abs(getScrollLeft(rootWindow, rootWindow));

        // Only calculate lastVisibleColumn when table didn't filled (from right) whole viewport space
        if (rootElementOffset.left > windowScrollLeft) {
          var windowWidth = innerWidth(rootWindow);
          var columnsWidth = wtViewport.getRowHeaderWidth();
          for (var column = 1; column <= totalColumns; column++) {
            columnsWidth += inlineStartOverlay.sumCellSizes(column - 1, column);
            if (rootElementOffset.left + columnsWidth - windowScrollLeft >= windowWidth) {
              // Return physical column - 1 (-2 because rangeEach gives column index + 1 - sumCellSizes requirements)
              lastVisibleColumn = column - 2;
              break;
            }
          }
        }
      }
      return lastVisibleColumn;
    }
  }]);
  return Scroll;
}();
export default Scroll;