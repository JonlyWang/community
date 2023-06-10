import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
var _templateObject;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.concat.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { isUndefined } from "../../../helpers/mixed.mjs";
import { warn } from "../../../helpers/console.mjs";
import { toSingleLine } from "../../../helpers/templateLiteralTag.mjs"; /**
                                                                         * Helper class for the row-move-related operations.
                                                                         *
                                                                         * @private
                                                                         * @class RowMoveController
                                                                         */
var RowMoveController = /*#__PURE__*/function () {
  function RowMoveController(plugin) {
    _classCallCheck(this, RowMoveController);
    /**
     * Reference to the Nested Rows plugin instance.
     *
     * @type {NestedRows}
     */
    this.plugin = plugin;
    /**
     * Reference to the Handsontable instance.
     *
     * @type {Handsontable.Core}
     */
    this.hot = plugin.hot;
    /**
     * Reference to the Data Manager class instance.
     *
     * @type {DataManager}
     */
    this.dataManager = plugin.dataManager;
    /**
     * Reference to the Collapsing UI class instance.
     *
     * @type {CollapsingUI}
     */
    this.collapsingUI = plugin.collapsingUI;
  }

  /**
   * `beforeRowMove` hook callback.
   *
   * @param {Array} rows Array of visual row indexes to be moved.
   * @param {number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements
   *   will be placed after the moving action. To check the visualization of the final index, please take a look at
   *   [documentation](@/guides/rows/row-moving.md).
   * @param {undefined|number} dropIndex Visual row index, being a drop index for the moved rows. Points to where we
   *   are going to drop the moved elements. To check visualization of drop index please take a look at
   *   [documentation](@/guides/rows/row-moving.md).
   * @param {boolean} movePossible Indicates if it's possible to move rows to the desired position.
   * @fires Hooks#afterRowMove
   * @returns {boolean}
   */
  _createClass(RowMoveController, [{
    key: "onBeforeRowMove",
    value: function onBeforeRowMove(rows, finalIndex, dropIndex, movePossible) {
      var _this = this;
      var improperUsage = this.displayAPICompatibilityWarning({
        rows: rows,
        finalIndex: finalIndex,
        dropIndex: dropIndex,
        movePossible: movePossible
      });
      if (improperUsage) {
        return false;
      }
      this.movedToCollapsed = false;
      var dropToLastRow = dropIndex === this.hot.countRows();
      var physicalDropIndex = dropToLastRow ? this.hot.countSourceRows() : this.dataManager.translateTrimmedRow(dropIndex);
      var allowMove = true;
      var physicalStartIndexes = rows.map(function (rowIndex) {
        // Don't do the logic for the rest of the rows, as it's bound to fail anyway.
        if (!allowMove) {
          return false;
        }
        var physicalRowIndex = _this.dataManager.translateTrimmedRow(rowIndex);
        allowMove = _this.shouldAllowMoving(physicalRowIndex, physicalDropIndex);
        return physicalRowIndex;
      });
      var willDataChange = physicalStartIndexes.indexOf(physicalDropIndex) === -1;
      if (!allowMove || !willDataChange) {
        return false;
      }
      var baseParent = this.getBaseParent(physicalStartIndexes);
      var targetParent = this.getTargetParent(dropToLastRow, physicalDropIndex);
      var sameParent = baseParent === targetParent;
      this.movedToCollapsed = this.collapsingUI.areChildrenCollapsed(targetParent);

      // Stash the current state of collapsed rows
      this.collapsingUI.collapsedRowsStash.stash();
      this.shiftCollapsibleParentsLocations(physicalStartIndexes, physicalDropIndex, sameParent);
      this.moveRows(physicalStartIndexes, physicalDropIndex, targetParent);
      this.dataManager.rewriteCache();
      this.moveCellsMeta(physicalStartIndexes, physicalDropIndex);
      this.collapsingUI.collapsedRowsStash.applyStash(false);

      // TODO: Trying to mock real work of the `ManualRowMove` plugin. It was blocked by returning `false` below.
      this.hot.runHooks('afterRowMove', rows, finalIndex, dropIndex, movePossible, movePossible && this.isRowOrderChanged(rows, finalIndex));

      // Not necessary - added to keep compatibility with other plugins (namely: columnSummary).
      this.hot.render();
      this.selectCells(rows, dropIndex);
      return false;
    }

    /**
     * Display a `dragRows`/`moveRows` method compatibility warning if needed.
     *
     * @param {object} beforeMoveRowHookArgs A set of arguments from the `beforeMoveRow` hook.
     * @returns {boolean} `true` if is a result of an improper usage of the moving API.
     */
  }, {
    key: "displayAPICompatibilityWarning",
    value: function displayAPICompatibilityWarning(beforeMoveRowHookArgs) {
      var rows = beforeMoveRowHookArgs.rows,
        finalIndex = beforeMoveRowHookArgs.finalIndex,
        dropIndex = beforeMoveRowHookArgs.dropIndex,
        movePossible = beforeMoveRowHookArgs.movePossible;
      var shouldTerminate = false;
      if (isUndefined(dropIndex)) {
        warn(toSingleLine(_templateObject || (_templateObject = _taggedTemplateLiteral(["Since version 8.0.0 of the Handsontable the 'moveRows' method isn't used for moving rows \n      when the NestedRows plugin is enabled. Please use the 'dragRows' method instead."], ["Since version 8.0.0 of the Handsontable the 'moveRows' method isn't used for moving rows\\x20\n      when the NestedRows plugin is enabled. Please use the 'dragRows' method instead."]))));

        // TODO: Trying to mock real work of the `ManualRowMove` plugin. It was blocked by returning `false` below.
        this.hot.runHooks('afterRowMove', rows, finalIndex, dropIndex, movePossible, false);
        shouldTerminate = true;
      }
      return shouldTerminate;
    }

    /**
     * Check if the moving action should be allowed.
     *
     * @param {number} physicalRowIndex Physical start row index.
     * @param {number} physicalDropIndex Physical drop index.
     * @returns {boolean} `true` if it should continue with the moving action.
     */
  }, {
    key: "shouldAllowMoving",
    value: function shouldAllowMoving(physicalRowIndex, physicalDropIndex) {
      /*
         We can't move rows when any of them is:
         - a parent
         - a top-level element
         - is being moved to the top level
         - is being moved to the position of any of the moved rows (not changing position)
      */

      return !(this.dataManager.isParent(physicalRowIndex) || this.dataManager.isRowHighestLevel(physicalRowIndex) || physicalRowIndex === physicalDropIndex || physicalDropIndex === 0);
    }

    /**
     * Get the base row parent.
     *
     * @param {number} physicalStartIndexes Physical start row index.
     * @returns {object|null} The base row parent.
     */
  }, {
    key: "getBaseParent",
    value: function getBaseParent(physicalStartIndexes) {
      return this.dataManager.getRowParent(physicalStartIndexes[0]);
    }

    /**
     * Get the target row parent.
     *
     * @param {boolean} dropToLastRow `true` if the row is moved to the last row of the table.
     * @param {number} physicalDropIndex Physical drop row index.
     * @returns {object|null} The target row parent.
     */
  }, {
    key: "getTargetParent",
    value: function getTargetParent(dropToLastRow, physicalDropIndex) {
      var targetParent = this.dataManager.getRowParent(dropToLastRow ? physicalDropIndex - 1 : physicalDropIndex);

      // If we try to move an element to the place of a top-level parent, snap the element to the previous top-level
      // parent's children instead
      if (targetParent === null || targetParent === void 0) {
        targetParent = this.dataManager.getRowParent(physicalDropIndex - 1);
      }
      return targetParent;
    }

    /**
     * Shift the cached collapsible rows position according to the move action.
     *
     * @param {number[]} physicalStartIndexes Physical start row indexes.
     * @param {number} physicalDropIndex Physical drop index.
     * @param {boolean} sameParent `true` if the row's being moved between siblings of the same parent.
     */
  }, {
    key: "shiftCollapsibleParentsLocations",
    value: function shiftCollapsibleParentsLocations(physicalStartIndexes, physicalDropIndex, sameParent) {
      if (!sameParent) {
        if (Math.max.apply(Math, _toConsumableArray(physicalStartIndexes)) <= physicalDropIndex) {
          this.collapsingUI.collapsedRowsStash.shiftStash(physicalStartIndexes[0], physicalDropIndex, -1 * physicalStartIndexes.length);
        } else {
          this.collapsingUI.collapsedRowsStash.shiftStash(physicalDropIndex, physicalStartIndexes[0], physicalStartIndexes.length);
        }
      }
    }

    /**
     * Move the rows at the provided coordinates.
     *
     * @param {number[]} physicalStartIndexes Physical indexes of the rows about to be moved.
     * @param {number} physicalDropIndex Physical drop index.
     * @param {object} targetParent Parent of the destination row.
     */
  }, {
    key: "moveRows",
    value: function moveRows(physicalStartIndexes, physicalDropIndex, targetParent) {
      var _this2 = this;
      var moveToLastChild = physicalDropIndex === this.dataManager.getRowIndex(targetParent) + this.dataManager.countChildren(targetParent) + 1;
      this.hot.batchRender(function () {
        physicalStartIndexes.forEach(function (physicalStartIndex) {
          _this2.dataManager.moveRow(physicalStartIndex, physicalDropIndex, _this2.movedToCollapsed, moveToLastChild);
        });
      });
    }

    /**
     * Move the cell meta for multiple rows.
     *
     * @param {number[]} baseIndexes Array of indexes for the rows being moved.
     * @param {number} targetIndex Index of the destination of the move.
     */
  }, {
    key: "moveCellsMeta",
    value: function moveCellsMeta(baseIndexes, targetIndex) {
      var _this3 = this,
        _this$hot;
      var rowsOfMeta = [];
      var movingDown = Math.max.apply(Math, _toConsumableArray(baseIndexes)) < targetIndex;
      baseIndexes.forEach(function (baseIndex) {
        rowsOfMeta.push(_this3.hot.getCellMetaAtRow(baseIndex));
      });
      this.hot.spliceCellsMeta(baseIndexes[0], baseIndexes.length);
      (_this$hot = this.hot).spliceCellsMeta.apply(_this$hot, [targetIndex - (movingDown ? rowsOfMeta.length : 0), 0].concat(rowsOfMeta));
    }

    /**
     * Select cells after the move.
     *
     * @param {Array} rows Array of visual row indexes to be moved.
     * @param {undefined|number} dropIndex Visual row index, being a drop index for the moved rows. Points to where we
     *   are going to drop the moved elements. To check visualization of drop index please take a look at
     *   [documentation](@/guides/rows/row-moving.md).
     */
  }, {
    key: "selectCells",
    value: function selectCells(rows, dropIndex) {
      var rowsLen = rows.length;
      var startRow = 0;
      var endRow = 0;
      var selection = null;
      var lastColIndex = null;
      if (this.movedToCollapsed) {
        var physicalDropIndex = null;
        if (rows[rowsLen - 1] < dropIndex) {
          physicalDropIndex = this.dataManager.translateTrimmedRow(dropIndex - rowsLen);
        } else {
          physicalDropIndex = this.dataManager.translateTrimmedRow(dropIndex);
        }
        var parentObject = this.dataManager.getRowParent(physicalDropIndex === null ? this.hot.countSourceRows() - 1 : physicalDropIndex - 1);
        var parentIndex = this.dataManager.getRowIndex(parentObject);
        startRow = this.dataManager.untranslateTrimmedRow(parentIndex);
        endRow = startRow;
      } else if (rows[rowsLen - 1] < dropIndex) {
        endRow = dropIndex - 1;
        startRow = endRow - rowsLen + 1;
      } else {
        startRow = dropIndex;
        endRow = startRow + rowsLen - 1;
      }
      selection = this.hot.selection;
      lastColIndex = this.hot.countCols() - 1;
      selection.setRangeStart(this.hot._createCellCoords(startRow, 0));
      selection.setRangeEnd(this.hot._createCellCoords(endRow, lastColIndex), true);
    }

    // TODO: Reimplementation of function which is inside the `ManualRowMove` plugin.
    /**
     * Indicates if order of rows was changed.
     *
     * @param {Array} movedRows Array of visual row indexes to be moved.
     * @param {number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements
     *   will be placed after the moving action. To check the visualization of the final index, please take a look at
     *   [documentation](@/guides/rows/row-moving.md).
     * @returns {boolean}
     */
  }, {
    key: "isRowOrderChanged",
    value: function isRowOrderChanged(movedRows, finalIndex) {
      return movedRows.some(function (row, nrOfMovedElement) {
        return row - nrOfMovedElement !== finalIndex;
      });
    }
  }]);
  return RowMoveController;
}();
export { RowMoveController as default };