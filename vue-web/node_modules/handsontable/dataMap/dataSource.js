"use strict";

exports.__esModule = true;
exports.default = void 0;
require("core-js/modules/es.number.is-integer.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _object = require("../helpers/object");
var _data = require("../helpers/data");
var _array = require("../helpers/array");
var _number = require("../helpers/number");
var _function = require("../helpers/function");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * @class DataSource
 * @private
 */var DataSource = /*#__PURE__*/function () {
  function DataSource(hotInstance) {
    var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    _classCallCheck(this, DataSource);
    /**
     * Instance of Handsontable.
     *
     * @type {Handsontable}
     */
    this.hot = hotInstance;
    /**
     * Data source.
     *
     * @type {Array}
     */
    this.data = dataSource;
    /**
     * Type of data source.
     *
     * @type {string}
     * @default 'array'
     */
    this.dataType = 'array';
    this.colToProp = function () {};
    this.propToCol = function () {};
  }

  /**
   * Run the `modifyRowData` hook and return either the modified or the source data for the provided row.
   *
   * @private
   * @param {number} rowIndex Row index.
   * @returns {Array|object} Source or modified row of data.
   */
  _createClass(DataSource, [{
    key: "modifyRowData",
    value: function modifyRowData(rowIndex) {
      var modifyRowData;
      if (this.hot.hasHook('modifyRowData')) {
        modifyRowData = this.hot.runHooks('modifyRowData', rowIndex);
      }
      return modifyRowData !== void 0 && !Number.isInteger(modifyRowData) ? modifyRowData : this.data[rowIndex];
    }

    /**
     * Get all data.
     *
     * @param {boolean} [toArray=false] If `true` return source data as an array of arrays even when source data was provided
     *                                  in another format.
     * @returns {Array}
     */
  }, {
    key: "getData",
    value: function getData() {
      var toArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.data || this.data.length === 0) {
        return this.data;
      }
      return this.getByRange(null, null, toArray);
    }

    /**
     * Set new data source.
     *
     * @param {Array} data The new data.
     */
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
    }

    /**
     * Returns array of column values from the data source. `column` is the index of the row in the data source.
     *
     * @param {number} column Visual column index.
     * @returns {Array}
     */
  }, {
    key: "getAtColumn",
    value: function getAtColumn(column) {
      var _this = this;
      var result = [];
      (0, _array.arrayEach)(this.data, function (row, rowIndex) {
        var value = _this.getAtCell(rowIndex, column);
        result.push(value);
      });
      return result;
    }

    /**
     * Returns a single row of the data or a subset of its columns. If a column range or `toArray` arguments are provided, it
     * operates only on the columns declared by the `columns` setting or the data schema.
     *
     * @param {number} row Physical row index.
     * @param {number} [startColumn] Starting index for the column range (optional).
     * @param {number} [endColumn] Ending index for the column range (optional).
     * @param {boolean} [toArray=false] `true` if the returned value should be forced to be presented as an array.
     * @returns {Array|object}
     */
  }, {
    key: "getAtRow",
    value: function getAtRow(row, startColumn, endColumn) {
      var _this2 = this;
      var toArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var getAllProps = startColumn === void 0 && endColumn === void 0;
      var dataRow = null;
      var newDataRow = null;
      dataRow = this.modifyRowData(row);
      if (Array.isArray(dataRow)) {
        newDataRow = [];
        if (getAllProps) {
          dataRow.forEach(function (cell, column) {
            newDataRow[column] = _this2.getAtPhysicalCell(row, column, dataRow);
          });
        } else {
          // Only the columns from the provided range
          (0, _number.rangeEach)(startColumn, endColumn, function (column) {
            newDataRow[column - startColumn] = _this2.getAtPhysicalCell(row, column, dataRow);
          });
        }
      } else if ((0, _object.isObject)(dataRow) || (0, _function.isFunction)(dataRow)) {
        if (toArray) {
          newDataRow = [];
        } else {
          newDataRow = {};
        }
        if (!getAllProps || toArray) {
          var rangeStart = 0;
          var rangeEnd = this.countFirstRowKeys() - 1;
          (0, _number.rangeEach)(rangeStart, rangeEnd, function (column) {
            var prop = _this2.colToProp(column);
            if (column >= (startColumn || rangeStart) && column <= (endColumn || rangeEnd) && !Number.isInteger(prop)) {
              var cellValue = _this2.getAtPhysicalCell(row, prop, dataRow);
              if (toArray) {
                newDataRow.push(cellValue);
              } else {
                (0, _object.setProperty)(newDataRow, prop, cellValue);
              }
            }
          });
        } else {
          (0, _object.objectEach)(dataRow, function (value, prop) {
            (0, _object.setProperty)(newDataRow, prop, _this2.getAtPhysicalCell(row, prop, dataRow));
          });
        }
      }
      return newDataRow;
    }

    /**
     * Set the provided value in the source data set at the provided coordinates.
     *
     * @param {number} row Physical row index.
     * @param {number|string} column Property name / physical column index.
     * @param {*} value The value to be set at the provided coordinates.
     */
  }, {
    key: "setAtCell",
    value: function setAtCell(row, column, value) {
      if (row >= this.countRows() || column >= this.countFirstRowKeys()) {
        // Not enough rows and/or columns.
        return;
      }
      if (this.hot.hasHook('modifySourceData')) {
        var valueHolder = (0, _object.createObjectPropListener)(value);
        this.hot.runHooks('modifySourceData', row, this.propToCol(column), valueHolder, 'set');
        if (valueHolder.isTouched()) {
          value = valueHolder.value;
        }
      }
      if (!Number.isInteger(column)) {
        // column argument is the prop name
        (0, _object.setProperty)(this.data[row], column, value);
      } else {
        this.data[row][column] = value;
      }
    }

    /**
     * Get data from the source data set using the physical indexes.
     *
     * @private
     * @param {number} row Physical row index.
     * @param {string|number|Function} column Physical column index / property / function.
     * @param {Array|object} dataRow A representation of a data row.
     * @returns {*} Value at the provided coordinates.
     */
  }, {
    key: "getAtPhysicalCell",
    value: function getAtPhysicalCell(row, column, dataRow) {
      var result = null;
      if (dataRow) {
        if (typeof column === 'string') {
          result = (0, _object.getProperty)(dataRow, column);
        } else if (typeof column === 'function') {
          result = column(dataRow);
        } else {
          result = dataRow[column];
        }
      }
      if (this.hot.hasHook('modifySourceData')) {
        var valueHolder = (0, _object.createObjectPropListener)(result);
        this.hot.runHooks('modifySourceData', row, this.colToProp(column), valueHolder, 'get');
        if (valueHolder.isTouched()) {
          result = valueHolder.value;
        }
      }
      return result;
    }

    /**
     * Returns a single value from the data.
     *
     * @param {number} row Physical row index.
     * @param {number} column Visual column index.
     * @returns {*}
     */
  }, {
    key: "getAtCell",
    value: function getAtCell(row, column) {
      var dataRow = this.modifyRowData(row);
      return this.getAtPhysicalCell(row, this.colToProp(column), dataRow);
    }

    /**
     * Returns source data by passed range.
     *
     * @param {object} [start] Object with physical `row` and `col` keys (or visual column index, if data type is an array of objects).
     * @param {object} [end] Object with physical `row` and `col` keys (or visual column index, if data type is an array of objects).
     * @param {boolean} [toArray=false] If `true` return source data as an array of arrays even when source data was provided
     *                                  in another format.
     * @returns {Array}
     */
  }, {
    key: "getByRange",
    value: function getByRange() {
      var _this3 = this;
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var toArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var getAllProps = false;
      var startRow = null;
      var startCol = null;
      var endRow = null;
      var endCol = null;
      if (start === null || end === null) {
        getAllProps = true;
        startRow = 0;
        endRow = this.countRows() - 1;
      } else {
        startRow = Math.min(start.row, end.row);
        startCol = Math.min(start.col, end.col);
        endRow = Math.max(start.row, end.row);
        endCol = Math.max(start.col, end.col);
      }
      var result = [];
      (0, _number.rangeEach)(startRow, endRow, function (currentRow) {
        result.push(getAllProps ? _this3.getAtRow(currentRow, void 0, void 0, toArray) : _this3.getAtRow(currentRow, startCol, endCol, toArray));
      });
      return result;
    }

    /**
     * Count number of rows.
     *
     * @returns {number}
     */
  }, {
    key: "countRows",
    value: function countRows() {
      if (this.hot.hasHook('modifySourceLength')) {
        var modifiedSourceLength = this.hot.runHooks('modifySourceLength');
        if (Number.isInteger(modifiedSourceLength)) {
          return modifiedSourceLength;
        }
      }
      return this.data.length;
    }

    /**
     * Count number of columns.
     *
     * @returns {number}
     */
  }, {
    key: "countFirstRowKeys",
    value: function countFirstRowKeys() {
      return (0, _data.countFirstRowKeys)(this.data);
    }

    /**
     * Destroy instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.data = null;
      this.hot = null;
    }
  }]);
  return DataSource;
}();
var _default = DataSource;
exports.default = _default;