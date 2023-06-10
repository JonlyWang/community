function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { mixin } from "../helpers/object.mjs";
import localHooks from "./../mixins/localHooks.mjs"; /**
                                                      * The Transformation class implements algorithms for transforming coordinates based on current settings
                                                      * passed to the Handsontable.
                                                      *
                                                      * Transformation is always applied relative to the current selection.
                                                      *
                                                      * @class Transformation
                                                      * @util
                                                      */
var Transformation = /*#__PURE__*/function () {
  function Transformation(range, options) {
    _classCallCheck(this, Transformation);
    /**
     * Instance of the SelectionRange, holder for visual coordinates applied to the table.
     *
     * @type {SelectionRange}
     */
    this.range = range;
    /**
     * Additional options which define the state of the settings which can infer transformation and
     * give the possibility to translate indexes.
     *
     * @type {object}
     */
    this.options = options;
  }

  /**
   * Selects cell relative to current cell (if possible).
   *
   * @param {number} rowDelta Rows number to move, value can be passed as negative number.
   * @param {number} colDelta Columns number to move, value can be passed as negative number.
   * @param {boolean} [force=false] If `true` the new rows/columns will be created if necessary. Otherwise, row/column will
   *                        be created according to `minSpareRows/minSpareCols` settings of Handsontable.
   * @returns {CellCoords} Visual coordinates after transformation.
   */
  _createClass(Transformation, [{
    key: "transformStart",
    value: function transformStart(rowDelta, colDelta) {
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var delta = this.options.createCellCoords(rowDelta, colDelta);
      var highlightCoords = this.range.current().highlight;
      var _this$options$visualT = this.options.visualToRenderableCoords(highlightCoords),
        renderableRow = _this$options$visualT.row,
        renderableColumn = _this$options$visualT.col;
      var visualCoords = highlightCoords;
      var rowTransformDir = 0;
      var colTransformDir = 0;
      this.runLocalHooks('beforeTransformStart', delta);
      if (renderableRow !== null && renderableColumn !== null) {
        var totalRows = this.options.countRows();
        var totalCols = this.options.countCols();
        var fixedRowsBottom = this.options.fixedRowsBottom();
        var minSpareRows = this.options.minSpareRows();
        var minSpareCols = this.options.minSpareCols();
        var autoWrapRow = this.options.autoWrapRow();
        var autoWrapCol = this.options.autoWrapCol();
        if (renderableRow + rowDelta > totalRows - 1) {
          if (force && minSpareRows > 0 && !(fixedRowsBottom && renderableRow >= totalRows - fixedRowsBottom - 1)) {
            this.runLocalHooks('insertRowRequire', totalRows);
            totalRows = this.options.countRows();
          } else if (autoWrapCol) {
            delta.row = 1 - totalRows;
            delta.col = renderableColumn + delta.col === totalCols - 1 ? 1 - totalCols : 1;
          }
        } else if (autoWrapCol && renderableRow + delta.row < 0 && renderableColumn + delta.col >= 0) {
          delta.row = totalRows - 1;
          delta.col = renderableColumn + delta.col === 0 ? totalCols - 1 : -1;
        }
        if (renderableColumn + delta.col > totalCols - 1) {
          if (force && minSpareCols > 0) {
            this.runLocalHooks('insertColRequire', totalCols);
            totalCols = this.options.countCols();
          } else if (autoWrapRow) {
            delta.row = renderableRow + delta.row === totalRows - 1 ? 1 - totalRows : 1;
            delta.col = 1 - totalCols;
          }
        } else if (autoWrapRow && renderableColumn + delta.col < 0 && renderableRow + delta.row >= 0) {
          delta.row = renderableRow + delta.row === 0 ? totalRows - 1 : -1;
          delta.col = totalCols - 1;
        }
        var coords = this.options.createCellCoords(renderableRow + delta.row, renderableColumn + delta.col);
        rowTransformDir = 0;
        colTransformDir = 0;
        if (coords.row < 0) {
          rowTransformDir = -1;
          coords.row = 0;
        } else if (coords.row > 0 && coords.row >= totalRows) {
          rowTransformDir = 1;
          coords.row = totalRows - 1;
        }
        if (coords.col < 0) {
          colTransformDir = -1;
          coords.col = 0;
        } else if (coords.col > 0 && coords.col >= totalCols) {
          colTransformDir = 1;
          coords.col = totalCols - 1;
        }
        visualCoords = this.options.renderableToVisualCoords(coords);
      }
      this.runLocalHooks('afterTransformStart', visualCoords, rowTransformDir, colTransformDir);
      return visualCoords;
    }

    /**
     * Sets selection end cell relative to current selection end cell (if possible).
     *
     * @param {number} rowDelta Rows number to move, value can be passed as negative number.
     * @param {number} colDelta Columns number to move, value can be passed as negative number.
     * @returns {CellCoords} Visual coordinates after transformation.
     */
  }, {
    key: "transformEnd",
    value: function transformEnd(rowDelta, colDelta) {
      var delta = this.options.createCellCoords(rowDelta, colDelta);
      var cellRange = this.range.current();
      var visualCoords = cellRange.to;
      var rowTransformDir = 0;
      var colTransformDir = 0;
      this.runLocalHooks('beforeTransformEnd', delta);
      var _this$options$visualT2 = this.options.visualToRenderableCoords(cellRange.highlight),
        rowHighlight = _this$options$visualT2.row,
        colHighlight = _this$options$visualT2.col;

      // We have highlight (start point for the selection).
      if (rowHighlight !== null && colHighlight !== null) {
        var totalRows = this.options.countRows();
        var totalCols = this.options.countCols();
        var _this$options$visualT3 = this.options.visualToRenderableCoords(cellRange.to),
          rowTo = _this$options$visualT3.row,
          colTo = _this$options$visualT3.col;
        var coords = this.options.createCellCoords(rowTo + delta.row, colTo + delta.col);
        rowTransformDir = 0;
        colTransformDir = 0;
        if (coords.row < 0) {
          rowTransformDir = -1;
          coords.row = 0;
        } else if (coords.row > 0 && coords.row >= totalRows) {
          rowTransformDir = 1;
          coords.row = totalRows - 1;
        }
        if (coords.col < 0) {
          colTransformDir = -1;
          coords.col = 0;
        } else if (coords.col > 0 && coords.col >= totalCols) {
          colTransformDir = 1;
          coords.col = totalCols - 1;
        }
        visualCoords = this.options.renderableToVisualCoords(coords);
      }
      this.runLocalHooks('afterTransformEnd', visualCoords, rowTransformDir, colTransformDir);
      return visualCoords;
    }
  }]);
  return Transformation;
}();
mixin(Transformation, localHooks);
export default Transformation;