function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { extend } from "../../../helpers/object.mjs";
import { arrayEach } from "../../../helpers/array.mjs"; /**
                                                         * Class responsible for all of the Autofill-related operations on merged cells.
                                                         *
                                                         * @private
                                                         * @class AutofillCalculations
                                                         */
var AutofillCalculations = /*#__PURE__*/function () {
  function AutofillCalculations(plugin) {
    _classCallCheck(this, AutofillCalculations);
    /**
     * Reference to the Merge Cells plugin.
     *
     * @type {MergeCells}
     */
    this.plugin = plugin;
    /**
     * Reference to the MergedCellsCollection class instance.
     *
     * @type {MergedCellsCollection}
     */
    this.mergedCellsCollection = this.plugin.mergedCellsCollection;
    /**
     * Cache of the currently processed autofill data.
     *
     * @private
     * @type {object}
     */
    this.currentFillData = null;
  }

  /**
   * Correct the provided selection area, so it's not selecting only a part of a merged cell.
   *
   * @param {Array} selectionArea The selection to correct.
   */
  _createClass(AutofillCalculations, [{
    key: "correctSelectionAreaSize",
    value: function correctSelectionAreaSize(selectionArea) {
      if (selectionArea[0] === selectionArea[2] && selectionArea[1] === selectionArea[3]) {
        var mergedCell = this.mergedCellsCollection.get(selectionArea[0], selectionArea[1]);
        if (mergedCell) {
          selectionArea[2] = selectionArea[0] + mergedCell.rowspan - 1;
          selectionArea[3] = selectionArea[1] + mergedCell.colspan - 1;
        }
      }
    }

    /**
     * Get the direction of the autofill process.
     *
     * @param {Array} selectionArea The selection area.
     * @param {Array} finalArea The final area (base + drag).
     * @returns {string} `up`, `down`, `left` or `right`.
     */
  }, {
    key: "getDirection",
    value: function getDirection(selectionArea, finalArea) {
      var direction = null;
      if (finalArea[0] === selectionArea[0] && finalArea[1] === selectionArea[1] && finalArea[3] === selectionArea[3]) {
        direction = 'down';
      } else if (finalArea[2] === selectionArea[2] && finalArea[1] === selectionArea[1] && finalArea[3] === selectionArea[3]) {
        direction = 'up';
      } else if (finalArea[1] === selectionArea[1] && finalArea[2] === selectionArea[2]) {
        direction = 'right';
      } else {
        direction = 'left';
      }
      return direction;
    }

    /**
     * Snap the drag area to the farthest merged cell, so it won't clip any of the merged cells.
     *
     * @param {Array} baseArea The base selected area.
     * @param {Array} dragArea The drag area.
     * @param {string} dragDirection The autofill drag direction.
     * @param {Array} foundMergedCells MergeCellCoords found in the base selection area.
     * @returns {Array} The new drag area.
     */
  }, {
    key: "snapDragArea",
    value: function snapDragArea(baseArea, dragArea, dragDirection, foundMergedCells) {
      var newDragArea = dragArea.slice(0);
      var fillSize = this.getAutofillSize(baseArea, dragArea, dragDirection);
      var _baseArea = _slicedToArray(baseArea, 4),
        baseAreaStartRow = _baseArea[0],
        baseAreaStartColumn = _baseArea[1],
        baseAreaEndRow = _baseArea[2],
        baseAreaEndColumn = _baseArea[3];
      var verticalDirection = ['up', 'down'].indexOf(dragDirection) > -1;
      var fullCycle = verticalDirection ? baseAreaEndRow - baseAreaStartRow + 1 : baseAreaEndColumn - baseAreaStartColumn + 1;
      var fulls = Math.floor(fillSize / fullCycle) * fullCycle;
      var partials = fillSize - fulls;
      var farthestCollection = this.getFarthestCollection(baseArea, dragArea, dragDirection, foundMergedCells);
      if (farthestCollection) {
        if (dragDirection === 'down') {
          var fill = farthestCollection.row + farthestCollection.rowspan - baseAreaStartRow - partials;
          var newLimit = newDragArea[2] + fill;
          if (newLimit >= this.plugin.hot.countRows()) {
            newDragArea[2] -= partials;
          } else {
            newDragArea[2] += partials ? fill : 0;
          }
        } else if (dragDirection === 'right') {
          var _fill = farthestCollection.col + farthestCollection.colspan - baseAreaStartColumn - partials;
          var _newLimit = newDragArea[3] + _fill;
          if (_newLimit >= this.plugin.hot.countCols()) {
            newDragArea[3] -= partials;
          } else {
            newDragArea[3] += partials ? _fill : 0;
          }
        } else if (dragDirection === 'up') {
          var _fill2 = baseAreaEndRow - partials - farthestCollection.row + 1;
          var _newLimit2 = newDragArea[0] + _fill2;
          if (_newLimit2 < 0) {
            newDragArea[0] += partials;
          } else {
            newDragArea[0] -= partials ? _fill2 : 0;
          }
        } else if (dragDirection === 'left') {
          var _fill3 = baseAreaEndColumn - partials - farthestCollection.col + 1;
          var _newLimit3 = newDragArea[1] + _fill3;
          if (_newLimit3 < 0) {
            newDragArea[1] += partials;
          } else {
            newDragArea[1] -= partials ? _fill3 : 0;
          }
        }
      }
      this.updateCurrentFillCache({
        baseArea: baseArea,
        dragDirection: dragDirection,
        foundMergedCells: foundMergedCells,
        fillSize: fillSize,
        dragArea: newDragArea,
        cycleLength: fullCycle
      });
      return newDragArea;
    }

    /**
     * Update the current fill cache with the provided object.
     *
     * @private
     * @param {object} updateObject The current filled object cache.
     */
  }, {
    key: "updateCurrentFillCache",
    value: function updateCurrentFillCache(updateObject) {
      if (!this.currentFillData) {
        this.currentFillData = {};
      }
      extend(this.currentFillData, updateObject);
    }

    /**
     * Get the "length" of the drag area.
     *
     * @private
     * @param {Array} baseArea The base selection area.
     * @param {Array} dragArea The drag area (containing the base area).
     * @param {string} direction The drag direction.
     * @returns {number|null} The "length" (height or width, depending on the direction) of the drag.
     */
  }, {
    key: "getAutofillSize",
    value: function getAutofillSize(baseArea, dragArea, direction) {
      var _baseArea2 = _slicedToArray(baseArea, 4),
        baseAreaStartRow = _baseArea2[0],
        baseAreaStartColumn = _baseArea2[1],
        baseAreaEndRow = _baseArea2[2],
        baseAreaEndColumn = _baseArea2[3];
      var _dragArea = _slicedToArray(dragArea, 4),
        dragAreaStartRow = _dragArea[0],
        dragAreaStartColumn = _dragArea[1],
        dragAreaEndRow = _dragArea[2],
        dragAreaEndColumn = _dragArea[3];
      switch (direction) {
        case 'up':
          return baseAreaStartRow - dragAreaStartRow;
        case 'down':
          return dragAreaEndRow - baseAreaEndRow;
        case 'left':
          return baseAreaStartColumn - dragAreaStartColumn;
        case 'right':
          return dragAreaEndColumn - baseAreaEndColumn;
        default:
          return null;
      }
    }

    /**
     * Trim the default drag area (containing the selection area) to the drag-only area.
     *
     * @private
     * @param {Array} baseArea The base selection area.
     * @param {Array} dragArea The base selection area extended by the drag area.
     * @param {string} direction Drag direction.
     * @returns {Array|null} Array representing the drag area coordinates.
     */
  }, {
    key: "getDragArea",
    value: function getDragArea(baseArea, dragArea, direction) {
      var _baseArea3 = _slicedToArray(baseArea, 4),
        baseAreaStartRow = _baseArea3[0],
        baseAreaStartColumn = _baseArea3[1],
        baseAreaEndRow = _baseArea3[2],
        baseAreaEndColumn = _baseArea3[3];
      var _dragArea2 = _slicedToArray(dragArea, 4),
        dragAreaStartRow = _dragArea2[0],
        dragAreaStartColumn = _dragArea2[1],
        dragAreaEndRow = _dragArea2[2],
        dragAreaEndColumn = _dragArea2[3];
      switch (direction) {
        case 'up':
          return [dragAreaStartRow, dragAreaStartColumn, baseAreaStartRow - 1, baseAreaEndColumn];
        case 'down':
          return [baseAreaEndRow + 1, baseAreaStartColumn, dragAreaEndRow, baseAreaEndColumn];
        case 'left':
          return [dragAreaStartRow, dragAreaStartColumn, baseAreaEndRow, baseAreaStartColumn - 1];
        case 'right':
          return [baseAreaStartRow, baseAreaEndColumn + 1, dragAreaEndRow, dragAreaEndColumn];
        default:
          return null;
      }
    }

    /**
     * Get the to-be-farthest merged cell in the newly filled area.
     *
     * @private
     * @param {Array} baseArea The base selection area.
     * @param {Array} dragArea The drag area (containing the base area).
     * @param {string} direction The drag direction.
     * @param {Array} mergedCellArray Array of the merged cells found in the base area.
     * @returns {MergedCellCoords|null}
     */
  }, {
    key: "getFarthestCollection",
    value: function getFarthestCollection(baseArea, dragArea, direction, mergedCellArray) {
      var _baseArea4 = _slicedToArray(baseArea, 4),
        baseAreaStartRow = _baseArea4[0],
        baseAreaStartColumn = _baseArea4[1],
        baseAreaEndRow = _baseArea4[2],
        baseAreaEndColumn = _baseArea4[3];
      var verticalDirection = ['up', 'down'].indexOf(direction) > -1;
      var baseEnd = verticalDirection ? baseAreaEndRow : baseAreaEndColumn;
      var baseStart = verticalDirection ? baseAreaStartRow : baseAreaStartColumn;
      var fillSize = this.getAutofillSize(baseArea, dragArea, direction);
      var fullCycle = verticalDirection ? baseAreaEndRow - baseAreaStartRow + 1 : baseAreaEndColumn - baseAreaStartColumn + 1;
      var fulls = Math.floor(fillSize / fullCycle) * fullCycle;
      var partials = fillSize - fulls;
      var inclusionFunctionName = null;
      var farthestCollection = null;
      var endOfDragRecreationIndex = null;
      switch (direction) {
        case 'up':
          inclusionFunctionName = 'includesVertically';
          endOfDragRecreationIndex = baseEnd - partials + 1;
          break;
        case 'left':
          inclusionFunctionName = 'includesHorizontally';
          endOfDragRecreationIndex = baseEnd - partials + 1;
          break;
        case 'down':
          inclusionFunctionName = 'includesVertically';
          endOfDragRecreationIndex = baseStart + partials - 1;
          break;
        case 'right':
          inclusionFunctionName = 'includesHorizontally';
          endOfDragRecreationIndex = baseStart + partials - 1;
          break;
        default:
      }
      arrayEach(mergedCellArray, function (currentCollection) {
        if (currentCollection[inclusionFunctionName](endOfDragRecreationIndex) && currentCollection.isFarther(farthestCollection, direction)) {
          farthestCollection = currentCollection;
        }
      });
      return farthestCollection;
    }

    /**
     * Recreate the merged cells after the autofill process.
     *
     * @param {Array} changes Changes made.
     */
  }, {
    key: "recreateAfterDataPopulation",
    value: function recreateAfterDataPopulation(changes) {
      if (!this.currentFillData) {
        return;
      }
      var fillRange = this.getRangeFromChanges(changes);
      var foundMergedCells = this.currentFillData.foundMergedCells;
      var dragDirection = this.currentFillData.dragDirection;
      var inBounds = function inBounds(current, offset) {
        switch (dragDirection) {
          case 'up':
            return current.row - offset >= fillRange.from.row;
          case 'down':
            return current.row + current.rowspan - 1 + offset <= fillRange.to.row;
          case 'left':
            return current.col - offset >= fillRange.from.column;
          case 'right':
            return current.col + current.colspan - 1 + offset <= fillRange.to.column;
          default:
            return null;
        }
      };
      var fillOffset = 0;
      var current = null;
      var multiplier = 1;
      do {
        for (var j = 0; j < foundMergedCells.length; j += 1) {
          current = foundMergedCells[j];
          fillOffset = multiplier * this.currentFillData.cycleLength;
          if (inBounds(current, fillOffset)) {
            switch (dragDirection) {
              case 'up':
                this.plugin.mergedCellsCollection.add({
                  row: current.row - fillOffset,
                  rowspan: current.rowspan,
                  col: current.col,
                  colspan: current.colspan
                });
                break;
              case 'down':
                this.plugin.mergedCellsCollection.add({
                  row: current.row + fillOffset,
                  rowspan: current.rowspan,
                  col: current.col,
                  colspan: current.colspan
                });
                break;
              case 'left':
                this.plugin.mergedCellsCollection.add({
                  row: current.row,
                  rowspan: current.rowspan,
                  col: current.col - fillOffset,
                  colspan: current.colspan
                });
                break;
              case 'right':
                this.plugin.mergedCellsCollection.add({
                  row: current.row,
                  rowspan: current.rowspan,
                  col: current.col + fillOffset,
                  colspan: current.colspan
                });
                break;
              default:
            }
          }
          if (j === foundMergedCells.length - 1) {
            multiplier += 1;
          }
        }
      } while (inBounds(current, fillOffset));
      this.currentFillData = null;
      this.plugin.hot.render();
    }

    /**
     * Get the drag range from the changes made.
     *
     * @private
     * @param {Array} changes The changes made.
     * @returns {object} Object with `from` and `to` properties, both containing `row` and `column` keys.
     */
  }, {
    key: "getRangeFromChanges",
    value: function getRangeFromChanges(changes) {
      var _this = this;
      var rows = {
        min: null,
        max: null
      };
      var columns = {
        min: null,
        max: null
      };
      arrayEach(changes, function (change) {
        var rowIndex = change[0];
        var columnIndex = _this.plugin.hot.propToCol(change[1]);
        if (rows.min === null || rowIndex < rows.min) {
          rows.min = rowIndex;
        }
        if (rows.max === null || rowIndex > rows.max) {
          rows.max = rowIndex;
        }
        if (columns.min === null || columnIndex < columns.min) {
          columns.min = columnIndex;
        }
        if (columns.max === null || columnIndex > columns.max) {
          columns.max = columnIndex;
        }
      });
      return {
        from: {
          row: rows.min,
          column: columns.min
        },
        to: {
          row: rows.max,
          column: columns.max
        }
      };
    }

    /**
     * Check if the drag area contains any merged cells.
     *
     * @param {Array} baseArea The base selection area.
     * @param {Array} fullArea The base area extended by the drag area.
     * @param {string} direction Drag direction.
     * @returns {boolean}
     */
  }, {
    key: "dragAreaOverlapsCollections",
    value: function dragAreaOverlapsCollections(baseArea, fullArea, direction) {
      var dragArea = this.getDragArea(baseArea, fullArea, direction);
      var _dragArea3 = _slicedToArray(dragArea, 4),
        dragAreaStartRow = _dragArea3[0],
        dragAreaStartColumn = _dragArea3[1],
        dragAreaEndRow = _dragArea3[2],
        dragAreaEndColumn = _dragArea3[3];
      var topLeft = this.plugin.hot._createCellCoords(dragAreaStartRow, dragAreaStartColumn);
      var bottomRight = this.plugin.hot._createCellCoords(dragAreaEndRow, dragAreaEndColumn);
      var dragRange = this.plugin.hot._createCellRange(topLeft, topLeft, bottomRight);
      return !!this.mergedCellsCollection.getWithinRange(dragRange, true);
    }
  }]);
  return AutofillCalculations;
}();
export default AutofillCalculations;