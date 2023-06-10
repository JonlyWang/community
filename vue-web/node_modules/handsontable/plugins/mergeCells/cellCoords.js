"use strict";

require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.freeze.js");
exports.__esModule = true;
exports.default = void 0;
var _templateLiteralTag = require("../../helpers/templateLiteralTag");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * The `MergedCellCoords` class represents a single merged cell.
 *
 * @private
 * @class MergedCellCoords
 */var MergedCellCoords = /*#__PURE__*/function () {
  function MergedCellCoords(row, column, rowspan, colspan, cellCoordsFactory, cellRangeFactory) {
    _classCallCheck(this, MergedCellCoords);
    /**
     * The index of the topmost merged cell row.
     *
     * @type {number}
     */
    this.row = row;
    /**
     * The index of the leftmost column.
     *
     * @type {number}
     */
    this.col = column;
    /**
     * The `rowspan` value of the merged cell.
     *
     * @type {number}
     */
    this.rowspan = rowspan;
    /**
     * The `colspan` value of the merged cell.
     *
     * @type {number}
     */
    this.colspan = colspan;
    /**
     * `true` only if the merged cell is bound to be removed.
     *
     * @type {boolean}
     */
    this.removed = false;
    /**
     * The CellCoords function factory.
     *
     * @type {Function}
     */
    this.cellCoordsFactory = cellCoordsFactory;
    /**
     * The CellRange function factory.
     *
     * @type {Function}
     */
    this.cellRangeFactory = cellRangeFactory;
  }

  /**
   * Get a warning message for when the declared merged cell data contains negative values.
   *
   * @param {object} newMergedCell Object containg information about the merged cells that was about to be added.
   * @returns {string}
   */
  _createClass(MergedCellCoords, [{
    key: "normalize",
    value:
    /**
     * Sanitize (prevent from going outside the boundaries) the merged cell.
     *
     * @param {Core} hotInstance The Handsontable instance.
     */
    function normalize(hotInstance) {
      var totalRows = hotInstance.countRows();
      var totalColumns = hotInstance.countCols();
      if (this.row < 0) {
        this.row = 0;
      } else if (this.row > totalRows - 1) {
        this.row = totalRows - 1;
      }
      if (this.col < 0) {
        this.col = 0;
      } else if (this.col > totalColumns - 1) {
        this.col = totalColumns - 1;
      }
      if (this.row + this.rowspan > totalRows - 1) {
        this.rowspan = totalRows - this.row;
      }
      if (this.col + this.colspan > totalColumns - 1) {
        this.colspan = totalColumns - this.col;
      }
    }

    /**
     * Returns `true` if the provided coordinates are inside the merged cell.
     *
     * @param {number} row The row index.
     * @param {number} column The column index.
     * @returns {boolean}
     */
  }, {
    key: "includes",
    value: function includes(row, column) {
      return this.row <= row && this.col <= column && this.row + this.rowspan - 1 >= row && this.col + this.colspan - 1 >= column;
    }

    /**
     * Returns `true` if the provided `column` property is within the column span of the merged cell.
     *
     * @param {number} column The column index.
     * @returns {boolean}
     */
  }, {
    key: "includesHorizontally",
    value: function includesHorizontally(column) {
      return this.col <= column && this.col + this.colspan - 1 >= column;
    }

    /**
     * Returns `true` if the provided `row` property is within the row span of the merged cell.
     *
     * @param {number} row Row index.
     * @returns {boolean}
     */
  }, {
    key: "includesVertically",
    value: function includesVertically(row) {
      return this.row <= row && this.row + this.rowspan - 1 >= row;
    }

    /**
     * Shift (and possibly resize, if needed) the merged cell.
     *
     * @param {Array} shiftVector 2-element array containing the information on the shifting in the `x` and `y` axis.
     * @param {number} indexOfChange Index of the preceding change.
     * @returns {boolean} Returns `false` if the whole merged cell was removed.
     */
  }, {
    key: "shift",
    value: function shift(shiftVector, indexOfChange) {
      var shiftValue = shiftVector[0] || shiftVector[1];
      var shiftedIndex = indexOfChange + Math.abs(shiftVector[0] || shiftVector[1]) - 1;
      var span = shiftVector[0] ? 'colspan' : 'rowspan';
      var index = shiftVector[0] ? 'col' : 'row';
      var changeStart = Math.min(indexOfChange, shiftedIndex);
      var changeEnd = Math.max(indexOfChange, shiftedIndex);
      var mergeStart = this[index];
      var mergeEnd = this[index] + this[span] - 1;
      if (mergeStart >= indexOfChange) {
        this[index] += shiftValue;
      }

      // adding rows/columns
      if (shiftValue > 0) {
        if (indexOfChange <= mergeEnd && indexOfChange > mergeStart) {
          this[span] += shiftValue;
        }

        // removing rows/columns
      } else if (shiftValue < 0) {
        // removing the whole merge
        if (changeStart <= mergeStart && changeEnd >= mergeEnd) {
          this.removed = true;
          return false;

          // removing the merge partially, including the beginning
        } else if (mergeStart >= changeStart && mergeStart <= changeEnd) {
          var removedOffset = changeEnd - mergeStart + 1;
          var preRemovedOffset = Math.abs(shiftValue) - removedOffset;
          this[index] -= preRemovedOffset + shiftValue;
          this[span] -= removedOffset;

          // removing the middle part of the merge
        } else if (mergeStart <= changeStart && mergeEnd >= changeEnd) {
          this[span] += shiftValue;

          // removing the end part of the merge
        } else if (mergeStart <= changeStart && mergeEnd >= changeStart && mergeEnd < changeEnd) {
          var removedPart = mergeEnd - changeStart + 1;
          this[span] -= removedPart;
        }
      }
      return true;
    }

    /**
     * Check if the second provided merged cell is "farther" in the provided direction.
     *
     * @param {MergedCellCoords} mergedCell The merged cell to check.
     * @param {string} direction Drag direction.
     * @returns {boolean|null} `true` if the second provided merged cell is "farther".
     */
  }, {
    key: "isFarther",
    value: function isFarther(mergedCell, direction) {
      if (!mergedCell) {
        return true;
      }
      if (direction === 'down') {
        return mergedCell.row + mergedCell.rowspan - 1 < this.row + this.rowspan - 1;
      } else if (direction === 'up') {
        return mergedCell.row > this.row;
      } else if (direction === 'right') {
        return mergedCell.col + mergedCell.colspan - 1 < this.col + this.colspan - 1;
      } else if (direction === 'left') {
        return mergedCell.col > this.col;
      }
      return null;
    }

    /**
     * Get the bottom row index of the merged cell.
     *
     * @returns {number}
     */
  }, {
    key: "getLastRow",
    value: function getLastRow() {
      return this.row + this.rowspan - 1;
    }

    /**
     * Get the rightmost column index of the merged cell.
     *
     * @returns {number}
     */
  }, {
    key: "getLastColumn",
    value: function getLastColumn() {
      return this.col + this.colspan - 1;
    }

    /**
     * Get the range coordinates of the merged cell.
     *
     * @returns {CellRange}
     */
  }, {
    key: "getRange",
    value: function getRange() {
      return this.cellRangeFactory(this.cellCoordsFactory(this.row, this.col), this.cellCoordsFactory(this.row, this.col), this.cellCoordsFactory(this.getLastRow(), this.getLastColumn()));
    }
  }], [{
    key: "NEGATIVE_VALUES_WARNING",
    value: function NEGATIVE_VALUES_WARNING(newMergedCell) {
      return (0, _templateLiteralTag.toSingleLine)(_templateObject || (_templateObject = _taggedTemplateLiteral(["The merged cell declared with {row: ", ", col: ", ", \n      rowspan: ", ", colspan: ", "} contains negative values, which is \n      not supported. It will not be added to the collection."], ["The merged cell declared with {row: ", ", col: ", ",\\x20\n      rowspan: ", ", colspan: ", "} contains negative values, which is\\x20\n      not supported. It will not be added to the collection."])), newMergedCell.row, newMergedCell.col, newMergedCell.rowspan, newMergedCell.colspan);
    }

    /**
     * Get a warning message for when the declared merged cell data contains values exceeding the table limits.
     *
     * @param {object} newMergedCell Object containg information about the merged cells that was about to be added.
     * @returns {string}
     */
  }, {
    key: "IS_OUT_OF_BOUNDS_WARNING",
    value: function IS_OUT_OF_BOUNDS_WARNING(newMergedCell) {
      return (0, _templateLiteralTag.toSingleLine)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["The merged cell declared at [", ", ", "] is positioned \n      (or positioned partially) outside of the table range. It was not added to the table, please fix your setup."], ["The merged cell declared at [", ", ", "] is positioned\\x20\n      (or positioned partially) outside of the table range. It was not added to the table, please fix your setup."])), newMergedCell.row, newMergedCell.col);
    }

    /**
     * Get a warning message for when the declared merged cell data represents a single cell.
     *
     * @param {object} newMergedCell Object containg information about the merged cells that was about to be added.
     * @returns {string}
     */
  }, {
    key: "IS_SINGLE_CELL",
    value: function IS_SINGLE_CELL(newMergedCell) {
      return (0, _templateLiteralTag.toSingleLine)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["The merged cell declared at [", ", ", "] has both \"rowspan\" \n      and \"colspan\" declared as \"1\", which makes it a single cell. It cannot be added to the collection."], ["The merged cell declared at [", ", ", "] has both \"rowspan\"\\x20\n      and \"colspan\" declared as \"1\", which makes it a single cell. It cannot be added to the collection."])), newMergedCell.row, newMergedCell.col);
    }

    /**
     * Get a warning message for when the declared merged cell data contains "colspan" or "rowspan", that equals 0.
     *
     * @param {object} newMergedCell Object containg information about the merged cells that was about to be added.
     * @returns {string}
     */
  }, {
    key: "ZERO_SPAN_WARNING",
    value: function ZERO_SPAN_WARNING(newMergedCell) {
      return (0, _templateLiteralTag.toSingleLine)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["The merged cell declared at [", ", ", "] has \"rowspan\" \n      or \"colspan\" declared as \"0\", which is not supported. It cannot be added to the collection."], ["The merged cell declared at [", ", ", "] has \"rowspan\"\\x20\n      or \"colspan\" declared as \"0\", which is not supported. It cannot be added to the collection."])), newMergedCell.row, newMergedCell.col);
    }

    /**
     * Check whether the values provided for a merged cell contain any negative values.
     *
     * @param {object} mergedCellInfo Object containing the `row`, `col`, `rowspan` and `colspan` properties.
     * @returns {boolean}
     */
  }, {
    key: "containsNegativeValues",
    value: function containsNegativeValues(mergedCellInfo) {
      return mergedCellInfo.row < 0 || mergedCellInfo.col < 0 || mergedCellInfo.rowspan < 0 || mergedCellInfo.colspan < 0;
    }

    /**
     * Check whether the provided merged cell information object represents a single cell.
     *
     * @private
     * @param {object} mergedCellInfo An object with `row`, `col`, `rowspan` and `colspan` properties.
     * @returns {boolean}
     */
  }, {
    key: "isSingleCell",
    value: function isSingleCell(mergedCellInfo) {
      return mergedCellInfo.colspan === 1 && mergedCellInfo.rowspan === 1;
    }

    /**
     * Check whether the provided merged cell information object contains a rowspan or colspan of 0.
     *
     * @private
     * @param {object} mergedCellInfo An object with `row`, `col`, `rowspan` and `colspan` properties.
     * @returns {boolean}
     */
  }, {
    key: "containsZeroSpan",
    value: function containsZeroSpan(mergedCellInfo) {
      return mergedCellInfo.colspan === 0 || mergedCellInfo.rowspan === 0;
    }

    /**
     * Check whether the provided merged cell object is to be declared out of bounds of the table.
     *
     * @param {object} mergeCell Object containing the `row`, `col`, `rowspan` and `colspan` properties.
     * @param {number} rowCount Number of rows in the table.
     * @param {number} columnCount Number of rows in the table.
     * @returns {boolean}
     */
  }, {
    key: "isOutOfBounds",
    value: function isOutOfBounds(mergeCell, rowCount, columnCount) {
      return mergeCell.row < 0 || mergeCell.col < 0 || mergeCell.row >= rowCount || mergeCell.row + mergeCell.rowspan - 1 >= rowCount || mergeCell.col >= columnCount || mergeCell.col + mergeCell.colspan - 1 >= columnCount;
    }
  }]);
  return MergedCellCoords;
}();
var _default = MergedCellCoords;
exports.default = _default;