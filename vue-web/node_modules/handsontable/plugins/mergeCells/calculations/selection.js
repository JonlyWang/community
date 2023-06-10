"use strict";

exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Class responsible for all of the Selection-related operations on merged cells.
 *
 * @private
 * @class SelectionCalculations
 */var SelectionCalculations = /*#__PURE__*/function () {
  function SelectionCalculations(plugin) {
    _classCallCheck(this, SelectionCalculations);
    /**
     * Reference to the Merge Cells plugin.
     *
     * @type {MergeCells}
     */
    this.plugin = plugin;
    /**
     * Reference to the Handsontable instance.
     *
     * @type {Handsontable}
     */
    this.hot = plugin.hot;
    /**
     * Class name used for fully selected merged cells.
     *
     * @type {string}
     */
    this.fullySelectedMergedCellClassName = 'fullySelectedMergedCell';
  }

  /**
   * "Snap" the delta value according to defined merged cells. (In other words, compensate the rowspan -
   * e.g. Going up with `delta.row = -1` over a merged cell with `rowspan = 3`, `delta.row` should change to `-3`.).
   *
   * @param {object} delta The delta object containing `row` and `col` properties.
   * @param {CellRange} selectionRange The selection range.
   * @param {object} mergedCell A merged cell object.
   */
  _createClass(SelectionCalculations, [{
    key: "snapDelta",
    value: function snapDelta(delta, selectionRange, mergedCell) {
      var cellCoords = selectionRange.to;
      var newRow = cellCoords.row + delta.row;
      var newColumn = cellCoords.col + delta.col;
      if (delta.row) {
        this.jumpOverMergedCell(delta, mergedCell, newRow);
      } else if (delta.col) {
        this.jumpOverMergedCell(delta, mergedCell, newColumn);
      }
    }

    /**
     * "Jump" over the merged cell (compensate for the indexes within the merged cell to get past it).
     *
     * @private
     * @param {object} delta The delta object.
     * @param {MergedCellCoords} mergedCell The merge cell object.
     * @param {number} newIndex New row/column index, created with the delta.
     */
  }, {
    key: "jumpOverMergedCell",
    value: function jumpOverMergedCell(delta, mergedCell, newIndex) {
      var flatDelta = delta.row || delta.col;
      var includesIndex = null;
      var firstIndex = null;
      var lastIndex = null;
      if (delta.row) {
        includesIndex = mergedCell.includesVertically(newIndex);
        firstIndex = mergedCell.row;
        lastIndex = mergedCell.getLastRow();
      } else if (delta.col) {
        includesIndex = mergedCell.includesHorizontally(newIndex);
        firstIndex = mergedCell.col;
        lastIndex = mergedCell.getLastColumn();
      }
      if (flatDelta === 0) {
        return;
      } else if (flatDelta > 0) {
        if (includesIndex && newIndex !== firstIndex) {
          flatDelta += lastIndex - newIndex + 1;
        }
      } else if (includesIndex && newIndex !== lastIndex) {
        flatDelta -= newIndex - firstIndex + 1;
      }
      if (delta.row) {
        delta.row = flatDelta;
      } else if (delta.col) {
        delta.col = flatDelta;
      }
    }

    /**
     * Get a selection range with `to` property incremented by the provided delta.
     *
     * @param {CellRange} oldSelectionRange The base selection range.
     * @param {object} delta The delta object with `row` and `col` properties.
     * @returns {CellRange} A new `CellRange` object.
     */
  }, {
    key: "getUpdatedSelectionRange",
    value: function getUpdatedSelectionRange(oldSelectionRange, delta) {
      return this.hot._createCellRange(oldSelectionRange.highlight, oldSelectionRange.from, this.hot._createCellCoords(oldSelectionRange.to.row + delta.row, oldSelectionRange.to.col + delta.col));
    }

    /**
     * Generate an additional class name for the entirely-selected merged cells.
     *
     * @param {number} currentRow Visual row index of the currently processed cell.
     * @param {number} currentColumn Visual column index of the currently cell.
     * @param {Array} cornersOfSelection Array of the current selection in a form of `[startRow, startColumn, endRow, endColumn]`.
     * @param {number|undefined} layerLevel Number indicating which layer of selection is currently processed.
     * @returns {string|undefined} A `String`, which will act as an additional `className` to be added to the currently processed cell.
     */
  }, {
    key: "getSelectedMergedCellClassName",
    value: function getSelectedMergedCellClassName(currentRow, currentColumn, cornersOfSelection, layerLevel) {
      var startRow = Math.min(cornersOfSelection[0], cornersOfSelection[2]);
      var startColumn = Math.min(cornersOfSelection[1], cornersOfSelection[3]);
      var endRow = Math.max(cornersOfSelection[0], cornersOfSelection[2]);
      var endColumn = Math.max(cornersOfSelection[1], cornersOfSelection[3]);
      if (layerLevel === void 0) {
        return;
      }
      var isFirstRenderableMergedCell = this.plugin.mergedCellsCollection.isFirstRenderableMergedCell(currentRow, currentColumn);

      // We add extra classes just to the first renderable merged cell.
      if (!isFirstRenderableMergedCell) {
        return;
      }
      var mergedCell = this.plugin.mergedCellsCollection.get(currentRow, currentColumn);
      if (!mergedCell) {
        return;
      }
      var mergeRowEnd = mergedCell.getLastRow();
      var mergeColumnEnd = mergedCell.getLastColumn();
      var fullMergeAreaWithinSelection = startRow <= mergedCell.row && startColumn <= mergedCell.col && endRow >= mergeRowEnd && endColumn >= mergeColumnEnd;
      if (fullMergeAreaWithinSelection) {
        return "".concat(this.fullySelectedMergedCellClassName, "-").concat(layerLevel);
      } else if (this.plugin.selectionCalculations.isMergeCellFullySelected(mergedCell, this.plugin.hot.getSelectedRange())) {
        // eslint-disable-line max-len
        return "".concat(this.fullySelectedMergedCellClassName, "-multiple");
      }
    }

    /**
     * Check if the provided merged cell is fully selected (by one or many layers of selection).
     *
     * @param {MergedCellCoords} mergedCell The merged cell to be processed.
     * @param {CellRange[]} selectionRangesArray Array of selection ranges.
     * @returns {boolean}
     */
  }, {
    key: "isMergeCellFullySelected",
    value: function isMergeCellFullySelected(mergedCell, selectionRangesArray) {
      var mergedCellIndividualCoords = [];
      if (!selectionRangesArray || !mergedCell) {
        return false;
      }
      for (var r = 0; r < mergedCell.rowspan; r += 1) {
        for (var c = 0; c < mergedCell.colspan; c += 1) {
          mergedCellIndividualCoords.push(this.hot._createCellCoords(mergedCell.row + r, mergedCell.col + c));
        }
      }
      for (var i = 0; i < mergedCellIndividualCoords.length; i += 1) {
        var insideSelections = [];
        for (var s = 0; s < selectionRangesArray.length; s += 1) {
          insideSelections[s] = selectionRangesArray[s].includes(mergedCellIndividualCoords[i]);
        }
        if (!insideSelections.includes(true)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Generate an array of the entirely-selected merged cells' class names.
     *
     * @returns {string[]} An `Array` of `String`s. Each of these strings will act like class names to be removed from all the cells in the table.
     */
  }, {
    key: "getSelectedMergedCellClassNameToRemove",
    value: function getSelectedMergedCellClassNameToRemove() {
      var classNames = [];
      for (var i = 0; i <= 7; i += 1) {
        classNames.push("".concat(this.fullySelectedMergedCellClassName, "-").concat(i));
      }
      classNames.push("".concat(this.fullySelectedMergedCellClassName, "-multiple"));
      return classNames;
    }
  }]);
  return SelectionCalculations;
}();
var _default = SelectionCalculations;
exports.default = _default;