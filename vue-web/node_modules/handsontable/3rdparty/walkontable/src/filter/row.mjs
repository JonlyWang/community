function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * @class RowFilter
 */var RowFilter = /*#__PURE__*/function () {
  /**
   * @param {number} offset The scroll vertical offset.
   * @param {number} total The total height of the table.
   * @param {number} countTH The number of rendered column headers.
   */
  function RowFilter(offset, total, countTH) {
    _classCallCheck(this, RowFilter);
    this.offset = offset;
    this.total = total;
    this.countTH = countTH;
  }

  /**
   * @param {number} index The visual row index.
   * @returns {number}
   */
  _createClass(RowFilter, [{
    key: "offsetted",
    value: function offsetted(index) {
      return index + this.offset;
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "unOffsetted",
    value: function unOffsetted(index) {
      return index - this.offset;
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "renderedToSource",
    value: function renderedToSource(index) {
      return this.offsetted(index);
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "sourceToRendered",
    value: function sourceToRendered(index) {
      return this.unOffsetted(index);
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "offsettedTH",
    value: function offsettedTH(index) {
      return index - this.countTH;
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "unOffsettedTH",
    value: function unOffsettedTH(index) {
      return index + this.countTH;
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "visibleColHeadedRowToSourceRow",
    value: function visibleColHeadedRowToSourceRow(index) {
      return this.renderedToSource(this.offsettedTH(index));
    }

    /**
     * @param {number} index The visual row index.
     * @returns {number}
     */
  }, {
    key: "sourceRowToVisibleColHeadedRow",
    value: function sourceRowToVisibleColHeadedRow(index) {
      return this.unOffsettedTH(this.sourceToRendered(index));
    }
  }]);
  return RowFilter;
}();
export default RowFilter;