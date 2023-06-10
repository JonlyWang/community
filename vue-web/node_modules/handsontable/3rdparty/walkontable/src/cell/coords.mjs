import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.weak-map.js";
import "core-js/modules/web.dom-collections.iterator.js";
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
 * CellCoords holds cell coordinates (row, column) and few method to validate them and retrieve as an array or an object.
 *
 * @util
 */var CellCoords = /*#__PURE__*/function () {
  /**
   * Row index.
   *
   * @type {number}
   */

  /**
   * Column index.
   *
   * @type {number}
   */

  /**
   * @type {boolean}
   */

  function CellCoords(row, column) {
    var isRtl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _classCallCheck(this, CellCoords);
    _defineProperty(this, "row", null);
    _defineProperty(this, "col", null);
    _classPrivateFieldInitSpec(this, _isRtl, {
      writable: true,
      value: false
    });
    _classPrivateFieldSet(this, _isRtl, isRtl);
    if (typeof row !== 'undefined' && typeof column !== 'undefined') {
      this.row = row;
      this.col = column;
    }
  }

  /**
   * Checks if given set of coordinates is valid in context of a given Walkontable instance.
   *
   * @param {Walkontable} wot A Walkontable instance.
   * @returns {boolean}
   */
  _createClass(CellCoords, [{
    key: "isValid",
    value: function isValid(wot) {
      // is it a valid cell index (0 or higher)
      if (this.row < 0 || this.col < 0) {
        return false;
      }
      // is selection within total rows and columns
      if (this.row >= wot.getSetting('totalRows') || this.col >= wot.getSetting('totalColumns')) {
        return false;
      }
      return true;
    }

    /**
     * Checks if this cell coordinates are the same as cell coordinates given as an argument.
     *
     * @param {CellCoords} cellCoords Cell coordinates to equal.
     * @returns {boolean}
     */
  }, {
    key: "isEqual",
    value: function isEqual(cellCoords) {
      if (cellCoords === this) {
        return true;
      }
      return this.row === cellCoords.row && this.col === cellCoords.col;
    }

    /**
     * Checks if tested coordinates are positioned in south-east from this cell coordinates.
     *
     * @param {object} testedCoords Cell coordinates to check.
     * @returns {boolean}
     */
  }, {
    key: "isSouthEastOf",
    value: function isSouthEastOf(testedCoords) {
      return this.row >= testedCoords.row && (_classPrivateFieldGet(this, _isRtl) ? this.col <= testedCoords.col : this.col >= testedCoords.col);
    }

    /**
     * Checks if tested coordinates are positioned in north-east from this cell coordinates.
     *
     * @param {object} testedCoords Cell coordinates to check.
     * @returns {boolean}
     */
  }, {
    key: "isNorthWestOf",
    value: function isNorthWestOf(testedCoords) {
      return this.row <= testedCoords.row && (_classPrivateFieldGet(this, _isRtl) ? this.col >= testedCoords.col : this.col <= testedCoords.col);
    }

    /**
     * Checks if tested coordinates are positioned in south-west from this cell coordinates.
     *
     * @param {object} testedCoords Cell coordinates to check.
     * @returns {boolean}
     */
  }, {
    key: "isSouthWestOf",
    value: function isSouthWestOf(testedCoords) {
      return this.row >= testedCoords.row && (_classPrivateFieldGet(this, _isRtl) ? this.col >= testedCoords.col : this.col <= testedCoords.col);
    }

    /**
     * Checks if tested coordinates are positioned in north-east from this cell coordinates.
     *
     * @param {object} testedCoords Cell coordinates to check.
     * @returns {boolean}
     */
  }, {
    key: "isNorthEastOf",
    value: function isNorthEastOf(testedCoords) {
      return this.row <= testedCoords.row && (_classPrivateFieldGet(this, _isRtl) ? this.col <= testedCoords.col : this.col >= testedCoords.col);
    }

    /**
     * Normalizes the coordinates to the nearest valid position. The coordinates that point
     * to the headers (negative values) are normalized to 0.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "normalize",
    value: function normalize() {
      this.row = this.row === null ? this.row : Math.max(this.row, 0);
      this.col = this.col === null ? this.col : Math.max(this.col, 0);
      return this;
    }

    /**
     * Clones the coordinates.
     *
     * @returns {CellCoords}
     */
  }, {
    key: "clone",
    value: function clone() {
      return new CellCoords(this.row, this.col, _classPrivateFieldGet(this, _isRtl));
    }

    /**
     * Converts CellCoords to literal object with `row` and `col` properties.
     *
     * @returns {object} Returns a literal object with `row` and `col` properties.
     */
  }, {
    key: "toObject",
    value: function toObject() {
      return {
        row: this.row,
        col: this.col
      };
    }
  }]);
  return CellCoords;
}();
export default CellCoords;