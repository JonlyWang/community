"use strict";

exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * The SelectionRange class is a simple CellRanges collection designed for easy manipulation of the multiple
 * consecutive and non-consecutive selections.
 *
 * @class SelectionRange
 * @util
 */var SelectionRange = /*#__PURE__*/function (_Symbol$iterator) {
  function SelectionRange(createCellRange) {
    _classCallCheck(this, SelectionRange);
    /**
     * List of all CellRanges added to the class instance.
     *
     * @type {CellRange[]}
     */
    this.ranges = [];
    this.createCellRange = createCellRange;
  }

  /**
   * Check if selected range is empty.
   *
   * @returns {boolean}
   */
  _createClass(SelectionRange, [{
    key: "isEmpty",
    value: function isEmpty() {
      return this.size() === 0;
    }

    /**
     * Set coordinates to the class instance. It clears all previously added coordinates and push `coords`
     * to the collection.
     *
     * @param {CellCoords} coords The CellCoords instance with defined visual coordinates.
     * @returns {SelectionRange}
     */
  }, {
    key: "set",
    value: function set(coords) {
      this.clear();
      this.ranges.push(this.createCellRange(coords));
      return this;
    }

    /**
     * Add coordinates to the class instance. The new coordinates are added to the end of the range collection.
     *
     * @param {CellCoords} coords The CellCoords instance with defined visual coordinates.
     * @returns {SelectionRange}
     */
  }, {
    key: "add",
    value: function add(coords) {
      this.ranges.push(this.createCellRange(coords));
      return this;
    }

    /**
     * Removes from the stack the last added coordinates.
     *
     * @returns {SelectionRange}
     */
  }, {
    key: "pop",
    value: function pop() {
      this.ranges.pop();
      return this;
    }

    /**
     * Get last added coordinates from ranges, it returns a CellRange instance.
     *
     * @returns {CellRange|undefined}
     */
  }, {
    key: "current",
    value: function current() {
      return this.peekByIndex(0);
    }

    /**
     * Get previously added coordinates from ranges, it returns a CellRange instance.
     *
     * @returns {CellRange|undefined}
     */
  }, {
    key: "previous",
    value: function previous() {
      return this.peekByIndex(-1);
    }

    /**
     * Returns `true` if coords is within selection coords. This method iterates through all selection layers to check if
     * the coords object is within selection range.
     *
     * @param {CellCoords} coords The CellCoords instance with defined visual coordinates.
     * @returns {boolean}
     */
  }, {
    key: "includes",
    value: function includes(coords) {
      return this.ranges.some(function (cellRange) {
        return cellRange.includes(coords);
      });
    }

    /**
     * Clear collection.
     *
     * @returns {SelectionRange}
     */
  }, {
    key: "clear",
    value: function clear() {
      this.ranges.length = 0;
      return this;
    }

    /**
     * Get count of added all coordinates added to the selection.
     *
     * @returns {number}
     */
  }, {
    key: "size",
    value: function size() {
      return this.ranges.length;
    }

    /**
     * Peek the coordinates based on the offset where that coordinate resides in the collection.
     *
     * @param {number} [offset=0] An offset where the coordinate will be retrieved from.
     * @returns {CellRange|undefined}
     */
  }, {
    key: "peekByIndex",
    value: function peekByIndex() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var rangeIndex = this.size() + offset - 1;
      var cellRange;
      if (rangeIndex >= 0) {
        cellRange = this.ranges[rangeIndex];
      }
      return cellRange;
    }
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return this.ranges[Symbol.iterator]();
    }
  }]);
  return SelectionRange;
}(Symbol.iterator);
var _default = SelectionRange;
exports.default = _default;