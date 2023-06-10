function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
import { RENDER_TYPE, FULLY_VISIBLE_TYPE } from "./constants.mjs";
var privatePool = new WeakMap();

/**
 * Calculates indexes of rows to render OR rows that are visible.
 * To redo the calculation, you need to create a new calculator.
 *
 * @class ViewportRowsCalculator
 */
var ViewportRowsCalculator = /*#__PURE__*/function () {
  /**
   * @param {object} options Object with all options specified for row viewport calculation.
   * @param {number} options.viewportSize Height of the viewport.
   * @param {number} options.scrollOffset Current vertical scroll position of the viewport.
   * @param {number} options.totalItems Total number of rows.
   * @param {Function} options.itemSizeFn Function that returns the height of the row at a given index (in px).
   * @param {Function} options.overrideFn Function that changes calculated this.startRow, this.endRow (used by MergeCells plugin).
   * @param {string} options.calculationType String which describes types of calculation which will be performed.
   * @param {number} options.scrollbarHeight The scrollbar height.
   */
  function ViewportRowsCalculator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      viewportSize = _ref.viewportSize,
      scrollOffset = _ref.scrollOffset,
      totalItems = _ref.totalItems,
      itemSizeFn = _ref.itemSizeFn,
      overrideFn = _ref.overrideFn,
      calculationType = _ref.calculationType,
      scrollbarHeight = _ref.scrollbarHeight;
    _classCallCheck(this, ViewportRowsCalculator);
    privatePool.set(this, {
      viewportHeight: viewportSize,
      scrollOffset: scrollOffset,
      totalRows: totalItems,
      rowHeightFn: itemSizeFn,
      overrideFn: overrideFn,
      calculationType: calculationType,
      horizontalScrollbarHeight: scrollbarHeight
    });

    /**
     * Number of rendered/visible rows.
     *
     * @type {number}
     */
    this.count = 0;

    /**
     * Index of the first rendered/visible row (can be overwritten using overrideFn).
     *
     * @type {number|null}
     */
    this.startRow = null;

    /**
     * Index of the last rendered/visible row (can be overwritten using overrideFn).
     *
     * @type {null}
     */
    this.endRow = null;

    /**
     * Position of the first rendered/visible row (in px).
     *
     * @type {number|null}
     */
    this.startPosition = null;
    this.calculate();
  }

  /**
   * Calculates viewport.
   */
  _createClass(ViewportRowsCalculator, [{
    key: "calculate",
    value: function calculate() {
      var sum = 0;
      var needReverse = true;
      var startPositions = [];
      var priv = privatePool.get(this);
      var calculationType = priv.calculationType;
      var overrideFn = priv.overrideFn;
      var rowHeightFn = priv.rowHeightFn;
      var scrollOffset = priv.scrollOffset;
      var totalRows = priv.totalRows;
      var viewportHeight = priv.viewportHeight;
      var horizontalScrollbarHeight = priv.horizontalScrollbarHeight || 0;
      var rowHeight;

      // Calculate the number (start and end index) of rows needed
      for (var i = 0; i < totalRows; i++) {
        rowHeight = rowHeightFn(i);
        if (isNaN(rowHeight)) {
          rowHeight = ViewportRowsCalculator.DEFAULT_HEIGHT;
        }
        if (sum <= scrollOffset && calculationType !== FULLY_VISIBLE_TYPE) {
          this.startRow = i;
        }
        if (sum >= scrollOffset && sum + (calculationType === FULLY_VISIBLE_TYPE ? rowHeight : 0) <= scrollOffset + viewportHeight - horizontalScrollbarHeight) {
          // eslint-disable-line max-len
          if (this.startRow === null) {
            this.startRow = i;
          }
          this.endRow = i;
        }
        startPositions.push(sum);
        sum += rowHeight;
        if (calculationType !== FULLY_VISIBLE_TYPE) {
          this.endRow = i;
        }
        if (sum >= scrollOffset + viewportHeight - horizontalScrollbarHeight) {
          needReverse = false;
          break;
        }
      }

      // If the estimation has reached the last row and there is still some space available in the viewport,
      // we need to render in reverse in order to fill the whole viewport with rows
      if (this.endRow === totalRows - 1 && needReverse) {
        this.startRow = this.endRow;
        while (this.startRow > 0) {
          // rowHeight is the height of the last row
          var viewportSum = startPositions[this.endRow] + rowHeight - startPositions[this.startRow - 1];
          if (viewportSum <= viewportHeight - horizontalScrollbarHeight || calculationType !== FULLY_VISIBLE_TYPE) {
            this.startRow -= 1;
          }
          if (viewportSum >= viewportHeight - horizontalScrollbarHeight) {
            break;
          }
        }
      }
      if (calculationType === RENDER_TYPE && this.startRow !== null && overrideFn) {
        overrideFn(this);
      }
      this.startPosition = startPositions[this.startRow];
      if (this.startPosition === void 0) {
        this.startPosition = null;
      }

      // If totalRows exceeded its total rows size set endRow to the latest item
      if (totalRows < this.endRow) {
        this.endRow = totalRows - 1;
      }
      if (this.startRow !== null) {
        this.count = this.endRow - this.startRow + 1;
      }
    }
  }], [{
    key: "DEFAULT_HEIGHT",
    get:
    /**
     * Default row height.
     *
     * @type {number}
     */
    function get() {
      return 23;
    }
  }]);
  return ViewportRowsCalculator;
}();
export default ViewportRowsCalculator;