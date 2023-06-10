"use strict";

exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _coords = _interopRequireDefault(require("./../cell/coords"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _isRtl = /*#__PURE__*/new WeakMap();
/**
 * CellRange holds cell coordinates as {@link CellCoords} instances. This object represent unit of the selection layer which
 * can contains multiple contiguous cells or single cell.
 *
 * @util
 */var CellRange = /*#__PURE__*/function () {
  /**
   * Used to draw bold border around a cell where selection was started and to edit the cell
   * when you press Enter. The highlight cannot point to headers (negative values) so its
   * coordinates object is normalized while assigning.
   *
   * @type {CellCoords}
   */

  /**
   * Usually the same as highlight, but in Excel there is distinction - one can change
   * highlight within a selection.
   *
   * @type {CellCoords}
   */

  /**
   * End selection.
   *
   * @type {CellCoords}
   */

  /**
   * @type {boolean}
   */

  function CellRange(highlight) {
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : highlight;
    var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : highlight;
    var isRtl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    _classCallCheck(this, CellRange);
    _defineProperty(this, "highlight", null);
    _defineProperty(this, "from", null);
    _defineProperty(this, "to", null);
    _classPrivateFieldInitSpec(this, _isRtl, {
      writable: true,
      value: false
    });
    this.highlight = highlight.clone().normalize();
    this.from = from.clone();
    this.to = to.clone();
    _classPrivateFieldSet(this, _isRtl, isRtl);
  }

  /**
   * Set the new coordinates for highlighting selection.
   *
   * @param {CellCoords} coords Coordinates to use.
   * @returns {CellRange}
   */
  _createClass(CellRange, [{
    key: "setHighlight",
    value: function setHighlight(coords) {
      this.highlight = coords.clone().normalize();
      return this;
    }

    /**
     * Set the new coordinates where selection starts from.
     *
     * @param {CellCoords} coords Coordinates to use.
     * @returns {CellRange}
     */
  }, {
    key: "setFrom",
    value: function setFrom(coords) {
      this.from = coords.clone();
      return this;
    }

    /**
     * Set new coordinates where selection ends from.
     *
     * @param {CellCoords} coords Coordinates to use.
     * @returns {CellRange}
     */
  }, {
    key: "setTo",
    value: function setTo(coords) {
      this.to = coords.clone();
      return this;
    }

    /**
     * Checks if given coordinates are valid in context of a given Walkontable instance.
     *
     * @param {Walkontable} wot The Walkontable instance.
     * @returns {boolean}
     */
  }, {
    key: "isValid",
    value: function isValid(wot) {
      return this.from.isValid(wot) && this.to.isValid(wot);
    }

    /**
     * Checks if this cell range is restricted to one cell.
     *
     * @returns {boolean}
     */
  }, {
    key: "isSingle",
    value: function isSingle() {
      return this.from.row >= 0 && this.from.row === this.to.row && this.from.col >= 0 && this.from.col === this.to.col;
    }

    /**
     * Returns selected range height (in number of rows including rows' headers).
     *
     * @returns {number}
     */
  }, {
    key: "getOuterHeight",
    value: function getOuterHeight() {
      return Math.max(this.from.row, this.to.row) - Math.min(this.from.row, this.to.row) + 1;
    }

    /**
     * Returns selected range width (in number of columns including columns' headers).
     *
     * @returns {number}
     */
  }, {
    key: "getOuterWidth",
    value: function getOuterWidth() {
      return Math.max(this.from.col, this.to.col) - Math.min(this.from.col, this.to.col) + 1;
    }

    /**
     * Returns selected range height (in number of rows excluding rows' headers).
     *
     * @returns {number}
     */
  }, {
    key: "getHeight",
    value: function getHeight() {
      var fromRow = Math.max(this.from.row, 0);
      var toRow = Math.max(this.to.row, 0);
      return Math.max(fromRow, toRow) - Math.min(fromRow, toRow) + 1;
    }

    /**
     * Returns selected range width (in number of columns excluding columns' headers).
     *
     * @returns {number}
     */
  }, {
    key: "getWidth",
    value: function getWidth() {
      var fromCol = Math.max(this.from.col, 0);
      var toCol = Math.max(this.to.col, 0);
      return Math.max(fromCol, toCol) - Math.min(fromCol, toCol) + 1;
    }

    /**
     * Returns the number of cells within the range (excluding the column and row headers, if selected).
     *
     * @returns {number}
     */
  }, {
    key: "getCellsCount",
    value: function getCellsCount() {
      return this.getWidth() * this.getHeight();
    }

    /**
     * Checks if given cell coordinates are within `from` and `to` cell coordinates of this range.
     *
     * @param {CellCoords} cellCoords The cell coordinates to check.
     * @returns {boolean}
     */
  }, {
    key: "includes",
    value: function includes(cellCoords) {
      var row = cellCoords.row,
        col = cellCoords.col;
      var topStart = this.getOuterTopStartCorner();
      var bottomEnd = this.getOuterBottomEndCorner();
      return topStart.row <= row && bottomEnd.row >= row && topStart.col <= col && bottomEnd.col >= col;
    }

    /**
     * Checks if given range is within of this range.
     *
     * @param {CellRange} cellRange The cells range to check.
     * @returns {boolean}
     */
  }, {
    key: "includesRange",
    value: function includesRange(cellRange) {
      return this.includes(cellRange.getOuterTopStartCorner()) && this.includes(cellRange.getOuterBottomEndCorner());
    }

    /**
     * Checks if given range is equal to this range.
     *
     * @param {CellRange} cellRange The cells range to check.
     * @returns {boolean}
     */
  }, {
    key: "isEqual",
    value: function isEqual(cellRange) {
      return Math.min(this.from.row, this.to.row) === Math.min(cellRange.from.row, cellRange.to.row) && Math.max(this.from.row, this.to.row) === Math.max(cellRange.from.row, cellRange.to.row) && Math.min(this.from.col, this.to.col) === Math.min(cellRange.from.col, cellRange.to.col) && Math.max(this.from.col, this.to.col) === Math.max(cellRange.from.col, cellRange.to.col);
    }

    /**
     * Checks if tested range overlaps with the range. Range A is considered to to be overlapping with range B
     * if intersection of A and B or B and A is not empty.
     *
     * @param {CellRange} cellRange The cells range to check.
     * @returns {boolean}
     */
  }, {
    key: "overlaps",
    value: function overlaps(cellRange) {
      return cellRange.isSouthEastOf(this.getOuterTopLeftCorner()) && cellRange.isNorthWestOf(this.getOuterBottomRightCorner());
    }

    /**
     * Checks if tested coordinates are positioned in south-east from this cell range.
     *
     * @param {CellRange} cellRange The cells range to check.
     * @returns {boolean}
     */
  }, {
    key: "isSouthEastOf",
    value: function isSouthEastOf(cellRange) {
      return this.getOuterTopLeftCorner().isSouthEastOf(cellRange) || this.getOuterBottomRightCorner().isSouthEastOf(cellRange);
    }

    /**
     * Checks if tested coordinates are positioned in north-west from this cell range.
     *
     * @param {CellRange} cellRange The cells range to check.
     * @returns {boolean}
     */
  }, {
    key: "isNorthWestOf",
    value: function isNorthWestOf(cellRange) {
      return this.getOuterTopLeftCorner().isNorthWestOf(cellRange) || this.getOuterBottomRightCorner().isNorthWestOf(cellRange);
    }

    /**
     * Returns `true` if the provided range is overlapping the current range horizontally (e.g. The current range's last
     * column is 5 and the provided range's first column is 3).
     *
     * @param {CellRange} cellRange The cells range to check.
     * @returns {boolean}
     */
  }, {
    key: "isOverlappingHorizontally",
    value: function isOverlappingHorizontally(cellRange) {
      return this.getOuterTopRightCorner().col >= cellRange.getOuterTopLeftCorner().col && this.getOuterTopRightCorner().col <= cellRange.getOuterTopRightCorner().col || this.getOuterTopLeftCorner().col <= cellRange.getOuterTopRightCorner().col && this.getOuterTopLeftCorner().col >= cellRange.getOuterTopLeftCorner().col;
    }

    /**
     * Returns `true` if the provided range is overlapping the current range vertically (e.g. The current range's last
     *  row is 5 and the provided range's first row is 3).
     *
     * @param {CellRange} cellRange The cells range to check.
     * @returns {boolean}
     */
  }, {
    key: "isOverlappingVertically",
    value: function isOverlappingVertically(cellRange) {
      return this.getOuterBottomRightCorner().row >= cellRange.getOuterTopRightCorner().row && this.getOuterBottomRightCorner().row <= cellRange.getOuterBottomRightCorner().row || this.getOuterTopRightCorner().row <= cellRange.getOuterBottomRightCorner().row && this.getOuterTopRightCorner().row >= cellRange.getOuterTopRightCorner().row;
    }

    /**
     * Adds a cell to a range (only if exceeds corners of the range). Returns information if range was expanded.
     *
     * @param {CellCoords} cellCoords The cell coordinates.
     * @returns {boolean}
     */
  }, {
    key: "expand",
    value: function expand(cellCoords) {
      var topStart = this.getOuterTopStartCorner();
      var bottomEnd = this.getOuterBottomEndCorner();
      if (cellCoords.row < topStart.row || cellCoords.col < topStart.col || cellCoords.row > bottomEnd.row || cellCoords.col > bottomEnd.col) {
        this.from = this._createCellCoords(Math.min(topStart.row, cellCoords.row), Math.min(topStart.col, cellCoords.col));
        this.to = this._createCellCoords(Math.max(bottomEnd.row, cellCoords.row), Math.max(bottomEnd.col, cellCoords.col));
        return true;
      }
      return false;
    }

    /**
     * Expand the current object by the range passed in the first argument.
     *
     * @param {CellRange} expandingRange Object extending the range.
     * @returns {boolean}
     */
  }, {
    key: "expandByRange",
    value: function expandByRange(expandingRange) {
      if (this.includesRange(expandingRange) || !this.overlaps(expandingRange)) {
        return false;
      }
      var topStart = this.getOuterTopStartCorner();
      var bottomEnd = this.getOuterBottomEndCorner();
      var initialDirection = this.getDirection();
      var expandingTopStart = expandingRange.getOuterTopStartCorner();
      var expandingBottomEnd = expandingRange.getOuterBottomEndCorner();
      var resultTopRow = Math.min(topStart.row, expandingTopStart.row);
      var resultTopCol = Math.min(topStart.col, expandingTopStart.col);
      var resultBottomRow = Math.max(bottomEnd.row, expandingBottomEnd.row);
      var resultBottomCol = Math.max(bottomEnd.col, expandingBottomEnd.col);
      var finalFrom = this._createCellCoords(resultTopRow, resultTopCol);
      var finalTo = this._createCellCoords(resultBottomRow, resultBottomCol);
      this.from = finalFrom;
      this.to = finalTo;
      this.setDirection(initialDirection);
      if (this.highlight.row === this.getOuterBottomRightCorner().row && this.getVerticalDirection() === 'N-S') {
        this.flipDirectionVertically();
      }
      if (this.highlight.col === this.getOuterTopRightCorner().col && this.getHorizontalDirection() === 'W-E') {
        this.flipDirectionHorizontally();
      }
      return true;
    }

    /**
     * Gets the direction of the selection.
     *
     * @returns {string} Returns one of the values: `'NW-SE'`, `'NE-SW'`, `'SE-NW'`, `'SW-NE'`.
     */
  }, {
    key: "getDirection",
    value: function getDirection() {
      if (this.from.isNorthWestOf(this.to)) {
        // NorthWest - SouthEast
        return 'NW-SE';
      } else if (this.from.isNorthEastOf(this.to)) {
        // NorthEast - SouthWest
        return 'NE-SW';
      } else if (this.from.isSouthEastOf(this.to)) {
        // SouthEast - NorthWest
        return 'SE-NW';
      } else if (this.from.isSouthWestOf(this.to)) {
        // SouthWest - NorthEast
        return 'SW-NE';
      }
    }

    /**
     * Sets the direction of the selection.
     *
     * @param {string} direction One of the values: `'NW-SE'`, `'NE-SW'`, `'SE-NW'`, `'SW-NE'`.
     */
  }, {
    key: "setDirection",
    value: function setDirection(direction) {
      switch (direction) {
        case 'NW-SE':
          var _ref = [this.getOuterTopLeftCorner(), this.getOuterBottomRightCorner()];
          this.from = _ref[0];
          this.to = _ref[1];
          break;
        case 'NE-SW':
          var _ref2 = [this.getOuterTopRightCorner(), this.getOuterBottomLeftCorner()];
          this.from = _ref2[0];
          this.to = _ref2[1];
          break;
        case 'SE-NW':
          var _ref3 = [this.getOuterBottomRightCorner(), this.getOuterTopLeftCorner()];
          this.from = _ref3[0];
          this.to = _ref3[1];
          break;
        case 'SW-NE':
          var _ref4 = [this.getOuterBottomLeftCorner(), this.getOuterTopRightCorner()];
          this.from = _ref4[0];
          this.to = _ref4[1];
          break;
        default:
          break;
      }
    }

    /**
     * Gets the vertical direction of the range.
     *
     * @returns {string} Returns one of the values: `N-S` (north->south), `S-N` (south->north).
     */
  }, {
    key: "getVerticalDirection",
    value: function getVerticalDirection() {
      return ['NE-SW', 'NW-SE'].indexOf(this.getDirection()) > -1 ? 'N-S' : 'S-N';
    }

    /**
     * Gets the horizontal direction of the range.
     *
     * @returns {string} Returns one of the values: `W-E` (west->east), `E-W` (east->west).
     */
  }, {
    key: "getHorizontalDirection",
    value: function getHorizontalDirection() {
      return ['NW-SE', 'SW-NE'].indexOf(this.getDirection()) > -1 ? 'W-E' : 'E-W';
    }

    /**
     * Flip the direction vertically. (e.g. `NW-SE` changes to `SW-NE`).
     */
  }, {
    key: "flipDirectionVertically",
    value: function flipDirectionVertically() {
      var direction = this.getDirection();
      switch (direction) {
        case 'NW-SE':
          this.setDirection('SW-NE');
          break;
        case 'NE-SW':
          this.setDirection('SE-NW');
          break;
        case 'SE-NW':
          this.setDirection('NE-SW');
          break;
        case 'SW-NE':
          this.setDirection('NW-SE');
          break;
        default:
          break;
      }
    }

    /**
     * Flip the direction horizontally. (e.g. `NW-SE` changes to `NE-SW`).
     */
  }, {
    key: "flipDirectionHorizontally",
    value: function flipDirectionHorizontally() {
      var direction = this.getDirection();
      switch (direction) {
        case 'NW-SE':
          this.setDirection('NE-SW');
          break;
        case 'NE-SW':
          this.setDirection('NW-SE');
          break;
        case 'SE-NW':
          this.setDirection('SW-NE');
          break;
        case 'SW-NE':
          this.setDirection('SE-NW');
          break;
        default:
          break;
      }
    }

    /**
     * Gets the top left (in LTR) or top right (in RTL) corner coordinates of this range. If the corner contains
     * header coordinates (negative values), the corner coordinates will be normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getTopStartCorner",
    value: function getTopStartCorner() {
      return this._createCellCoords(Math.min(this.from.row, this.to.row), Math.min(this.from.col, this.to.col)).normalize();
    }

    /**
     * Gets the top left corner coordinates of this range, no matter if the code runs in LTR or RTL document mode.
     * If the corner contains header coordinates (negative values), the corner coordinates will be normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getTopLeftCorner",
    value: function getTopLeftCorner() {
      return _classPrivateFieldGet(this, _isRtl) ? this.getTopEndCorner() : this.getTopStartCorner();
    }

    /**
     * Gets the bottom right (in LTR) or bottom left (in RTL) corner coordinates of this range. If the corner contains
     * header coordinates (negative values), the corner coordinates will be normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getBottomEndCorner",
    value: function getBottomEndCorner() {
      return this._createCellCoords(Math.max(this.from.row, this.to.row), Math.max(this.from.col, this.to.col)).normalize();
    }

    /**
     * Gets the bottom right corner coordinates of this range, no matter if the code runs in LTR or RTL document mode.
     * If the corner contains header coordinates (negative values), the corner coordinates will be normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getBottomRightCorner",
    value: function getBottomRightCorner() {
      return _classPrivateFieldGet(this, _isRtl) ? this.getBottomStartCorner() : this.getBottomEndCorner();
    }

    /**
     * Gets the top right (in LTR) or top left (in RTL) corner coordinates of this range. If the corner contains
     * header coordinates (negative values), the corner coordinates will be normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getTopEndCorner",
    value: function getTopEndCorner() {
      return this._createCellCoords(Math.min(this.from.row, this.to.row), Math.max(this.from.col, this.to.col)).normalize();
    }

    /**
     * Gets the top right corner coordinates of this range, no matter if the code runs in LTR or RTL document mode.
     * If the corner contains header coordinates (negative values), the corner coordinates will be normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getTopRightCorner",
    value: function getTopRightCorner() {
      return _classPrivateFieldGet(this, _isRtl) ? this.getTopStartCorner() : this.getTopEndCorner();
    }

    /**
     * Gets the bottom left (in LTR) or bottom right (in RTL) corner coordinates of this range. If the corner
     * contains header coordinates (negative values), the corner coordinates will be normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getBottomStartCorner",
    value: function getBottomStartCorner() {
      return this._createCellCoords(Math.max(this.from.row, this.to.row), Math.min(this.from.col, this.to.col)).normalize();
    }

    /**
     * Gets the bottom left corner coordinates of this range, no matter if the code runs in LTR or RTL document mode.
     * If the corner contains header coordinates (negative values), the corner coordinates will be normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getBottomLeftCorner",
    value: function getBottomLeftCorner() {
      return _classPrivateFieldGet(this, _isRtl) ? this.getBottomEndCorner() : this.getBottomStartCorner();
    }

    /**
     * Gets the top left (in LTR) or top right (in RTL) corner coordinates of this range. If the corner
     * contains header coordinates (negative values), then the top and start coordinates will be pointed to that header.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getOuterTopStartCorner",
    value: function getOuterTopStartCorner() {
      return this._createCellCoords(Math.min(this.from.row, this.to.row), Math.min(this.from.col, this.to.col));
    }

    /**
     * Gets the top left corner coordinates of this range, no matter if the code runs in LTR or RTL document mode.
     * If the corner contains header coordinates (negative values), then the top and left coordinates will be
     * pointed to that header.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getOuterTopLeftCorner",
    value: function getOuterTopLeftCorner() {
      return _classPrivateFieldGet(this, _isRtl) ? this.getOuterTopEndCorner() : this.getOuterTopStartCorner();
    }

    /**
     * Gets the bottom right (in LTR) or bottom left (in RTL) corner coordinates of this range. If the corner
     * contains header coordinates (negative values), then the top and start coordinates will be pointed to that header.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getOuterBottomEndCorner",
    value: function getOuterBottomEndCorner() {
      return this._createCellCoords(Math.max(this.from.row, this.to.row), Math.max(this.from.col, this.to.col));
    }

    /**
     * Gets the bottom right corner coordinates of this range, no matter if the code runs in LTR or RTL document mode.
     * If the corner contains header coordinates (negative values), then the top and left coordinates will be
     * pointed to that header.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getOuterBottomRightCorner",
    value: function getOuterBottomRightCorner() {
      return _classPrivateFieldGet(this, _isRtl) ? this.getOuterBottomStartCorner() : this.getOuterBottomEndCorner();
    }

    /**
     * Gets the top right (in LTR) or top left (in RTL) corner coordinates of this range. If the corner
     * contains header coordinates (negative values), then the top and start coordinates will be pointed to that header.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getOuterTopEndCorner",
    value: function getOuterTopEndCorner() {
      return this._createCellCoords(Math.min(this.from.row, this.to.row), Math.max(this.from.col, this.to.col));
    }

    /**
     * Gets the top right corner coordinates of this range, no matter if the code runs in LTR or RTL document mode.
     * If the corner contains header coordinates (negative values), then the top and left coordinates will be
     * pointed to that header.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getOuterTopRightCorner",
    value: function getOuterTopRightCorner() {
      return _classPrivateFieldGet(this, _isRtl) ? this.getOuterTopStartCorner() : this.getOuterTopEndCorner();
    }

    /**
     * Gets the bottom left (in LTR) or bottom right (in RTL) corner coordinates of this range. If the corner
     * contains header coordinates (negative values), then the top and start coordinates will be pointed to that header.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getOuterBottomStartCorner",
    value: function getOuterBottomStartCorner() {
      return this._createCellCoords(Math.max(this.from.row, this.to.row), Math.min(this.from.col, this.to.col));
    }

    /**
     * Gets the bottom left corner coordinates of this range, no matter if the code runs in LTR or RTL document mode.
     * If the corner contains header coordinates (negative values), then the top and left coordinates will be
     * pointed to that header.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "getOuterBottomLeftCorner",
    value: function getOuterBottomLeftCorner() {
      return _classPrivateFieldGet(this, _isRtl) ? this.getOuterBottomEndCorner() : this.getOuterBottomStartCorner();
    }

    /**
     * Checks if coordinates match to one of the 4th corners of this range.
     *
     * @param {CellCoords} coords Cell coordinates to check.
     * @param {CellRange} [expandedRange] The cells range to compare with.
     * @returns {boolean}
     */
  }, {
    key: "isCorner",
    value: function isCorner(coords, expandedRange) {
      if (expandedRange && expandedRange.includes(coords) && (this.getOuterTopLeftCorner().isEqual(this._createCellCoords(expandedRange.from.row, expandedRange.from.col)) || this.getOuterTopRightCorner().isEqual(this._createCellCoords(expandedRange.from.row, expandedRange.to.col)) || this.getOuterBottomLeftCorner().isEqual(this._createCellCoords(expandedRange.to.row, expandedRange.from.col)) || this.getOuterBottomRightCorner().isEqual(this._createCellCoords(expandedRange.to.row, expandedRange.to.col)))) {
        return true;
      }
      return coords.isEqual(this.getOuterTopLeftCorner()) || coords.isEqual(this.getOuterTopRightCorner()) || coords.isEqual(this.getOuterBottomLeftCorner()) || coords.isEqual(this.getOuterBottomRightCorner());
    }

    /**
     * Gets coordinates of the corner which is opposite to the matched. When the passed coordinates matched to the
     * bottom-right corner of this range then the coordinates for top-left will be returned.
     *
     * @param {CellCoords} coords Cell coordinates to check.
     * @param {CellRange} [expandedRange] The cells range to compare with.
     * @returns {CellCoords}
     */
  }, {
    key: "getOppositeCorner",
    value: function getOppositeCorner(coords, expandedRange) {
      if (!(coords instanceof _coords.default)) {
        return false;
      }
      if (expandedRange) {
        var from = expandedRange.from,
          to = expandedRange.to;
        if (expandedRange.includes(coords)) {
          if (this.getOuterTopStartCorner().isEqual(this._createCellCoords(from.row, from.col))) {
            return this.getOuterBottomEndCorner();
          }
          if (this.getOuterTopEndCorner().isEqual(this._createCellCoords(from.row, to.col))) {
            return this.getOuterBottomStartCorner();
          }
          if (this.getOuterBottomStartCorner().isEqual(this._createCellCoords(to.row, from.col))) {
            return this.getOuterTopEndCorner();
          }
          if (this.getOuterBottomEndCorner().isEqual(this._createCellCoords(to.row, to.col))) {
            return this.getOuterTopStartCorner();
          }
        }
      }
      if (coords.isEqual(this.getOuterBottomEndCorner())) {
        return this.getOuterTopStartCorner();
      } else if (coords.isEqual(this.getOuterTopStartCorner())) {
        return this.getOuterBottomEndCorner();
      } else if (coords.isEqual(this.getOuterTopEndCorner())) {
        return this.getOuterBottomStartCorner();
      } else if (coords.isEqual(this.getOuterBottomStartCorner())) {
        return this.getOuterTopEndCorner();
      }
    }

    /**
     * @param {CellRange} range The cells range to compare with.
     * @returns {Array}
     */
  }, {
    key: "getBordersSharedWith",
    value: function getBordersSharedWith(range) {
      if (!this.includesRange(range)) {
        return [];
      }
      var thisBorders = {
        top: Math.min(this.from.row, this.to.row),
        bottom: Math.max(this.from.row, this.to.row),
        left: Math.min(this.from.col, this.to.col),
        right: Math.max(this.from.col, this.to.col)
      };
      var rangeBorders = {
        top: Math.min(range.from.row, range.to.row),
        bottom: Math.max(range.from.row, range.to.row),
        left: Math.min(range.from.col, range.to.col),
        right: Math.max(range.from.col, range.to.col)
      };
      var result = [];
      if (thisBorders.top === rangeBorders.top) {
        result.push('top');
      }
      if (thisBorders.right === rangeBorders.right) {
        result.push('right');
      }
      if (thisBorders.bottom === rangeBorders.bottom) {
        result.push('bottom');
      }
      if (thisBorders.left === rangeBorders.left) {
        result.push('left');
      }
      return result;
    }

    /**
     * Get inner selected cell coords defined by this range.
     *
     * @returns {Array}
     */
  }, {
    key: "getInner",
    value: function getInner() {
      var topStart = this.getOuterTopStartCorner();
      var bottomEnd = this.getOuterBottomEndCorner();
      var out = [];
      for (var r = topStart.row; r <= bottomEnd.row; r++) {
        for (var c = topStart.col; c <= bottomEnd.col; c++) {
          if (!(this.from.row === r && this.from.col === c) && !(this.to.row === r && this.to.col === c)) {
            out.push(this._createCellCoords(r, c));
          }
        }
      }
      return out;
    }

    /**
     * Get all selected cell coords defined by this range.
     *
     * @returns {Array}
     */
  }, {
    key: "getAll",
    value: function getAll() {
      var topStart = this.getOuterTopStartCorner();
      var bottomEnd = this.getOuterBottomEndCorner();
      var out = [];
      for (var r = topStart.row; r <= bottomEnd.row; r++) {
        for (var c = topStart.col; c <= bottomEnd.col; c++) {
          if (topStart.row === r && topStart.col === c) {
            out.push(topStart);
          } else if (bottomEnd.row === r && bottomEnd.col === c) {
            out.push(bottomEnd);
          } else {
            out.push(this._createCellCoords(r, c));
          }
        }
      }
      return out;
    }

    /**
     * Runs a callback function against all cells in the range. You can break the iteration by returning
     * `false` in the callback function.
     *
     * @param {Function} callback The callback function.
     */
  }, {
    key: "forAll",
    value: function forAll(callback) {
      var topStart = this.getOuterTopStartCorner();
      var bottomEnd = this.getOuterBottomEndCorner();
      for (var r = topStart.row; r <= bottomEnd.row; r++) {
        for (var c = topStart.col; c <= bottomEnd.col; c++) {
          var breakIteration = callback(r, c);
          if (breakIteration === false) {
            return;
          }
        }
      }
    }

    /**
     * Clones the range coordinates.
     *
     * @returns {CellRange}
     */
  }, {
    key: "clone",
    value: function clone() {
      return new CellRange(this.highlight, this.from, this.to, _classPrivateFieldGet(this, _isRtl));
    }

    /**
     * Convert CellRange to literal object.
     *
     * @returns {object} Returns a literal object with `from` and `to` properties which each of that object
     *                  contains `row` and `col` keys.
     */
  }, {
    key: "toObject",
    value: function toObject() {
      return {
        from: this.from.toObject(),
        to: this.to.toObject()
      };
    }

    /**
     * Creates and returns a new instance of the CellCoords object. The object automatically inherits
     * the LTR/RTL flag from this CellRange instance.
     *
     * @private
     * @param {number} row The row index.
     * @param {number} column The column index.
     * @returns {CellCoords}
     */
  }, {
    key: "_createCellCoords",
    value: function _createCellCoords(row, column) {
      return new _coords.default(row, column, _classPrivateFieldGet(this, _isRtl));
    }
  }]);
  return CellRange;
}();
var _default = CellRange;
exports.default = _default;