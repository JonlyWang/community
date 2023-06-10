var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.object.freeze.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import MergedCellCoords from "./cellCoords.mjs";
import { rangeEach, rangeEachReverse } from "../../helpers/number.mjs";
import { warn } from "../../helpers/console.mjs";
import { arrayEach } from "../../helpers/array.mjs";
import { applySpanProperties } from "./utils.mjs";
import { toSingleLine } from "../../helpers/templateLiteralTag.mjs"; /**
                                                                      * Defines a container object for the merged cells.
                                                                      *
                                                                      * @private
                                                                      * @class MergedCellsCollection
                                                                      */
var MergedCellsCollection = /*#__PURE__*/function () {
  function MergedCellsCollection(plugin) {
    _classCallCheck(this, MergedCellsCollection);
    /**
     * Reference to the Merge Cells plugin.
     *
     * @type {MergeCells}
     */
    this.plugin = plugin;
    /**
     * Array of merged cells.
     *
     * @type {Array}
     */
    this.mergedCells = [];
    /**
     * The Handsontable instance.
     *
     * @type {Handsontable}
     */
    this.hot = plugin.hot;
  }

  /**
   * Get a warning message for when the declared merged cell data overlaps already existing merged cells.
   *
   * @param {object} newMergedCell Object containg information about the merged cells that was about to be added.
   * @returns {string}
   */
  _createClass(MergedCellsCollection, [{
    key: "get",
    value:
    /**
     * Get a merged cell from the container, based on the provided arguments. You can provide either the "starting coordinates"
     * of a merged cell, or any coordinates from the body of the merged cell.
     *
     * @param {number} row Row index.
     * @param {number} column Column index.
     * @returns {MergedCellCoords|boolean} Returns a wanted merged cell on success and `false` on failure.
     */
    function get(row, column) {
      var mergedCells = this.mergedCells;
      var result = false;
      arrayEach(mergedCells, function (mergedCell) {
        if (mergedCell.row <= row && mergedCell.row + mergedCell.rowspan - 1 >= row && mergedCell.col <= column && mergedCell.col + mergedCell.colspan - 1 >= column) {
          result = mergedCell;
          return false;
        }
        return true;
      });
      return result;
    }

    /**
     * Get a merged cell containing the provided range.
     *
     * @param {CellRange|object} range The range to search merged cells for.
     * @returns {MergedCellCoords|boolean}
     */
  }, {
    key: "getByRange",
    value: function getByRange(range) {
      var mergedCells = this.mergedCells;
      var result = false;
      arrayEach(mergedCells, function (mergedCell) {
        if (mergedCell.row <= range.from.row && mergedCell.row + mergedCell.rowspan - 1 >= range.to.row && mergedCell.col <= range.from.col && mergedCell.col + mergedCell.colspan - 1 >= range.to.col) {
          result = mergedCell;
          return result;
        }
        return true;
      });
      return result;
    }

    /**
     * Get a merged cell contained in the provided range.
     *
     * @param {CellRange|object} range The range to search merged cells in.
     * @param {boolean} [countPartials=false] If set to `true`, all the merged cells overlapping the range will be taken into calculation.
     * @returns {Array|boolean} Array of found merged cells of `false` if none were found.
     */
  }, {
    key: "getWithinRange",
    value: function getWithinRange(range) {
      var _this = this;
      var countPartials = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var mergedCells = this.mergedCells;
      var foundMergedCells = [];
      var testedRange = range;
      if (!testedRange.includesRange) {
        var from = this.hot._createCellCoords(testedRange.from.row, testedRange.from.col);
        var to = this.hot._createCellCoords(testedRange.to.row, testedRange.to.col);
        testedRange = this.hot._createCellRange(from, from, to);
      }
      arrayEach(mergedCells, function (mergedCell) {
        var mergedCellTopLeft = _this.hot._createCellCoords(mergedCell.row, mergedCell.col);
        var mergedCellBottomRight = _this.hot._createCellCoords(mergedCell.row + mergedCell.rowspan - 1, mergedCell.col + mergedCell.colspan - 1);
        var mergedCellRange = _this.hot._createCellRange(mergedCellTopLeft, mergedCellTopLeft, mergedCellBottomRight);
        if (countPartials) {
          if (testedRange.overlaps(mergedCellRange)) {
            foundMergedCells.push(mergedCell);
          }
        } else if (testedRange.includesRange(mergedCellRange)) {
          foundMergedCells.push(mergedCell);
        }
      });
      return foundMergedCells.length ? foundMergedCells : false;
    }

    /**
     * Add a merged cell to the container.
     *
     * @param {object} mergedCellInfo The merged cell information object. Has to contain `row`, `col`, `colspan` and `rowspan` properties.
     * @returns {MergedCellCoords|boolean} Returns the new merged cell on success and `false` on failure.
     */
  }, {
    key: "add",
    value: function add(mergedCellInfo) {
      var mergedCells = this.mergedCells;
      var row = mergedCellInfo.row;
      var column = mergedCellInfo.col;
      var rowspan = mergedCellInfo.rowspan;
      var colspan = mergedCellInfo.colspan;
      var newMergedCell = new MergedCellCoords(row, column, rowspan, colspan, this.hot._createCellCoords, this.hot._createCellRange);
      var alreadyExists = this.get(row, column);
      var isOverlapping = this.isOverlapping(newMergedCell);
      if (!alreadyExists && !isOverlapping) {
        if (this.hot) {
          newMergedCell.normalize(this.hot);
        }
        mergedCells.push(newMergedCell);
        return newMergedCell;
      }
      warn(MergedCellsCollection.IS_OVERLAPPING_WARNING(newMergedCell));
      return false;
    }

    /**
     * Remove a merged cell from the container. You can provide either the "starting coordinates"
     * of a merged cell, or any coordinates from the body of the merged cell.
     *
     * @param {number} row Row index.
     * @param {number} column Column index.
     * @returns {MergedCellCoords|boolean} Returns the removed merged cell on success and `false` on failure.
     */
  }, {
    key: "remove",
    value: function remove(row, column) {
      var mergedCells = this.mergedCells;
      var wantedCollection = this.get(row, column);
      var wantedCollectionIndex = wantedCollection ? this.mergedCells.indexOf(wantedCollection) : -1;
      if (wantedCollection && wantedCollectionIndex !== -1) {
        mergedCells.splice(wantedCollectionIndex, 1);
        return wantedCollection;
      }
      return false;
    }

    /**
     * Clear all the merged cells.
     */
  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;
      var mergedCells = this.mergedCells;
      var mergedCellParentsToClear = [];
      var hiddenCollectionElements = [];
      arrayEach(mergedCells, function (mergedCell) {
        var TD = _this2.hot.getCell(mergedCell.row, mergedCell.col);
        if (TD) {
          mergedCellParentsToClear.push([TD, _this2.get(mergedCell.row, mergedCell.col), mergedCell.row, mergedCell.col]);
        }
      });
      this.mergedCells.length = 0;
      arrayEach(mergedCellParentsToClear, function (mergedCell, i) {
        rangeEach(0, mergedCell.rowspan - 1, function (j) {
          rangeEach(0, mergedCell.colspan - 1, function (k) {
            if (k !== 0 || j !== 0) {
              var TD = _this2.hot.getCell(mergedCell.row + j, mergedCell.col + k);
              if (TD) {
                hiddenCollectionElements.push([TD, null, null, null]);
              }
            }
          });
        });
        mergedCellParentsToClear[i][1] = null;
      });
      arrayEach(mergedCellParentsToClear, function (mergedCellParents) {
        applySpanProperties.apply(void 0, _toConsumableArray(mergedCellParents));
      });
      arrayEach(hiddenCollectionElements, function (hiddenCollectionElement) {
        applySpanProperties.apply(void 0, _toConsumableArray(hiddenCollectionElement));
      });
    }

    /**
     * Check if the provided merged cell overlaps with the others in the container.
     *
     * @param {MergedCellCoords} mergedCell The merged cell to check against all others in the container.
     * @returns {boolean} `true` if the provided merged cell overlaps with the others, `false` otherwise.
     */
  }, {
    key: "isOverlapping",
    value: function isOverlapping(mergedCell) {
      var _this3 = this;
      var mergedCellRange = this.hot._createCellRange(this.hot._createCellCoords(0, 0), this.hot._createCellCoords(mergedCell.row, mergedCell.col), this.hot._createCellCoords(mergedCell.row + mergedCell.rowspan - 1, mergedCell.col + mergedCell.colspan - 1));
      var result = false;
      arrayEach(this.mergedCells, function (col) {
        var currentRange = _this3.hot._createCellRange(_this3.hot._createCellCoords(0, 0), _this3.hot._createCellCoords(col.row, col.col), _this3.hot._createCellCoords(col.row + col.rowspan - 1, col.col + col.colspan - 1));
        if (currentRange.overlaps(mergedCellRange)) {
          result = true;
          return false;
        }
        return true;
      });
      return result;
    }

    /**
     * Check whether the provided row/col coordinates direct to a first not hidden cell within merge area.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @returns {boolean}
     */
  }, {
    key: "isFirstRenderableMergedCell",
    value: function isFirstRenderableMergedCell(row, column) {
      var mergeParent = this.get(row, column);

      // Return if row and column indexes are within merge area and if they are first rendered indexes within the area.
      return mergeParent && this.hot.rowIndexMapper.getNearestNotHiddenIndex(mergeParent.row, 1) === row && this.hot.columnIndexMapper.getNearestNotHiddenIndex(mergeParent.col, 1) === column;
    }

    /**
     * Get the first renderable coords of the merged cell at the provided coordinates.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @returns {CellCoords} A `CellCoords` object with the coordinates to the first renderable cell within the
     *                        merged cell.
     */
  }, {
    key: "getFirstRenderableCoords",
    value: function getFirstRenderableCoords(row, column) {
      var mergeParent = this.get(row, column);
      if (!mergeParent || this.isFirstRenderableMergedCell(row, column)) {
        return this.hot._createCellCoords(row, column);
      }
      var firstRenderableRow = this.hot.rowIndexMapper.getNearestNotHiddenIndex(mergeParent.row, 1);
      var firstRenderableColumn = this.hot.columnIndexMapper.getNearestNotHiddenIndex(mergeParent.col, 1);
      return this.hot._createCellCoords(firstRenderableRow, firstRenderableColumn);
    }

    /**
     * Shift the merged cell in the direction and by an offset defined in the arguments.
     *
     * @param {string} direction `right`, `left`, `up` or `down`.
     * @param {number} index Index where the change, which caused the shifting took place.
     * @param {number} count Number of rows/columns added/removed in the preceding action.
     */
  }, {
    key: "shiftCollections",
    value: function shiftCollections(direction, index, count) {
      var _this4 = this;
      var shiftVector = [0, 0];
      switch (direction) {
        case 'right':
          shiftVector[0] += count;
          break;
        case 'left':
          shiftVector[0] -= count;
          break;
        case 'down':
          shiftVector[1] += count;
          break;
        case 'up':
          shiftVector[1] -= count;
          break;
        default:
      }
      arrayEach(this.mergedCells, function (currentMerge) {
        currentMerge.shift(shiftVector, index);
      });
      rangeEachReverse(this.mergedCells.length - 1, 0, function (i) {
        var currentMerge = _this4.mergedCells[i];
        if (currentMerge && currentMerge.removed) {
          _this4.mergedCells.splice(_this4.mergedCells.indexOf(currentMerge), 1);
        }
      });
    }
  }], [{
    key: "IS_OVERLAPPING_WARNING",
    value: function IS_OVERLAPPING_WARNING(newMergedCell) {
      return toSingleLine(_templateObject || (_templateObject = _taggedTemplateLiteral(["The merged cell declared at [", ", ", "], overlaps \n      with the other declared merged cell. The overlapping merged cell was not added to the table, please \n      fix your setup."], ["The merged cell declared at [", ", ", "], overlaps\\x20\n      with the other declared merged cell. The overlapping merged cell was not added to the table, please\\x20\n      fix your setup."])), newMergedCell.row, newMergedCell.col);
    }
  }]);
  return MergedCellsCollection;
}();
export default MergedCellsCollection;