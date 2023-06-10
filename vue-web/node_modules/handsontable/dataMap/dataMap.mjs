function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.number.is-integer.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
import { stringify } from "../3rdparty/SheetClip/index.mjs";
import { cellMethodLookupFactory, countFirstRowKeys as _countFirstRowKeys } from "../helpers/data.mjs";
import { createObjectPropListener, deepClone, deepExtend, deepObjectSize, duckSchema, hasOwnProperty, isObject, objectEach } from "../helpers/object.mjs";
import { extendArray, to2dArray } from "../helpers/array.mjs";
import { rangeEach } from "../helpers/number.mjs";
import { isDefined } from "../helpers/mixed.mjs";
var copyableLookup = cellMethodLookupFactory('copyable', false);

/*
This class contains open-source contributions covered by the MIT license.

1) In the `createRow` method: Row creation using functional `dataSchema` value
2) In the `set` method: Data setting using functional `prop` value
3) in the `get` method: Data getting using functional `prop` value

The remaining part of this code comment contains the full license text of these contributions.

======

The MIT License

Copyright 2013 Nicholas Bollweg

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Utility class that gets and saves data from/to the data source using mapping of columns numbers to object property names.
 *
 * @todo Refactor arguments of methods getRange, getText to be numbers (not objects).
 * @todo Remove priv, GridSettings from object constructor.
 *
 * @class DataMap
 * @private
 */
var DataMap = /*#__PURE__*/function () {
  /**
   * @param {object} instance Instance of Handsontable.
   * @param {Array} data Array of arrays or array of objects containing data.
   * @param {TableMeta} tableMeta The table meta instance.
   */
  function DataMap(instance, data, tableMeta) {
    _classCallCheck(this, DataMap);
    /**
     * Instance of {@link Handsontable}.
     *
     * @private
     * @type {Handsontable}
     */
    this.instance = instance;
    /**
     * Instance of {@link TableMeta}.
     *
     * @private
     * @type {TableMeta}
     */
    this.tableMeta = tableMeta;
    /**
     * Reference to the original dataset.
     *
     * @type {*}
     */
    this.dataSource = data;
    /**
     * Generated schema based on the first row from the source data.
     *
     * @type {object}
     */
    this.duckSchema = this.dataSource && this.dataSource[0] ? duckSchema(this.dataSource[0]) : {};
    /**
     * Cached array of properties to columns.
     *
     * @type {Array}
     */
    this.colToPropCache = void 0;
    /**
     * Cached map of properties to columns.
     *
     * @type {Map}
     */
    this.propToColCache = void 0;
    this.createMap();
  }

  /**
   * Generates cache for property to and from column addressation.
   */
  _createClass(DataMap, [{
    key: "createMap",
    value: function createMap() {
      var schema = this.getSchema();
      if (typeof schema === 'undefined') {
        throw new Error('trying to create `columns` definition but you didn\'t provide `schema` nor `data`');
      }
      var columns = this.tableMeta.columns;
      var i;
      this.colToPropCache = [];
      this.propToColCache = new Map();
      if (columns) {
        var columnsLen = 0;
        var filteredIndex = 0;
        var columnsAsFunc = false;
        if (typeof columns === 'function') {
          var schemaLen = deepObjectSize(schema);
          columnsLen = schemaLen > 0 ? schemaLen : this.countFirstRowKeys();
          columnsAsFunc = true;
        } else {
          var maxCols = this.tableMeta.maxCols;
          columnsLen = Math.min(maxCols, columns.length);
        }
        for (i = 0; i < columnsLen; i++) {
          var column = columnsAsFunc ? columns(i) : columns[i];
          if (isObject(column)) {
            if (typeof column.data !== 'undefined') {
              var index = columnsAsFunc ? filteredIndex : i;
              this.colToPropCache[index] = column.data;
              this.propToColCache.set(column.data, index);
            }
            filteredIndex += 1;
          }
        }
      } else {
        this.recursiveDuckColumns(schema);
      }
    }

    /**
     * Get the amount of physical columns in the first data row.
     *
     * @returns {number} Amount of physical columns in the first data row.
     */
  }, {
    key: "countFirstRowKeys",
    value: function countFirstRowKeys() {
      return _countFirstRowKeys(this.dataSource);
    }

    /**
     * Generates columns' translation cache.
     *
     * @param {object} schema An object to generate schema from.
     * @param {number} lastCol The column index.
     * @param {number} parent The property cache for recursive calls.
     * @returns {number}
     */
  }, {
    key: "recursiveDuckColumns",
    value: function recursiveDuckColumns(schema, lastCol, parent) {
      var _this = this;
      var lastColumn = lastCol;
      var propertyParent = parent;
      var prop;
      if (typeof lastColumn === 'undefined') {
        lastColumn = 0;
        propertyParent = '';
      }
      if (_typeof(schema) === 'object' && !Array.isArray(schema)) {
        objectEach(schema, function (value, key) {
          if (value === null) {
            prop = propertyParent + key;
            _this.colToPropCache.push(prop);
            _this.propToColCache.set(prop, lastColumn);
            lastColumn += 1;
          } else {
            lastColumn = _this.recursiveDuckColumns(value, lastColumn, "".concat(key, "."));
          }
        });
      }
      return lastColumn;
    }

    /**
     * Returns property name that corresponds with the given column index.
     *
     * @param {string|number} column Visual column index or another passed argument.
     * @returns {string|number} Column property, physical column index or passed argument.
     */
  }, {
    key: "colToProp",
    value: function colToProp(column) {
      // TODO: Should it work? Please, look at the test:
      // "it should return the provided property name, when the user passes a property name as a column number".
      if (Number.isInteger(column) === false) {
        return column;
      }
      var physicalColumn = this.instance.toPhysicalColumn(column);

      // Out of range, not visible column index.
      if (physicalColumn === null) {
        return column;
      }

      // Cached property.
      if (this.colToPropCache && isDefined(this.colToPropCache[physicalColumn])) {
        return this.colToPropCache[physicalColumn];
      }
      return physicalColumn;
    }

    /**
     * Translates property into visual column index.
     *
     * @param {string|number} prop Column property which may be also a physical column index.
     * @returns {string|number} Visual column index or passed argument.
     */
  }, {
    key: "propToCol",
    value: function propToCol(prop) {
      var cachedPhysicalIndex = this.propToColCache.get(prop);
      if (isDefined(cachedPhysicalIndex)) {
        return this.instance.toVisualColumn(cachedPhysicalIndex);
      }

      // Property may be a physical column index.
      var visualColumn = this.instance.toVisualColumn(prop);
      if (visualColumn === null) {
        return prop;
      }
      return visualColumn;
    }

    /**
     * Returns data's schema.
     *
     * @returns {object}
     */
  }, {
    key: "getSchema",
    value: function getSchema() {
      var schema = this.tableMeta.dataSchema;
      if (schema) {
        if (typeof schema === 'function') {
          return schema();
        }
        return schema;
      }
      return this.duckSchema;
    }

    /**
     * Creates row at the bottom of the data array.
     *
     * @param {number} [index] Physical index of the row before which the new row will be inserted.
     * @param {number} [amount=1] An amount of rows to add.
     * @param {object} [options] Additional options for created rows.
     * @param {string} [options.source] Source of method call.
     * @param {'above'|'below'} [options.mode] Sets where the row is inserted: above or below the passed index.
     * @fires Hooks#afterCreateRow
     * @returns {number} Returns number of created rows.
     */
  }, {
    key: "createRow",
    value: function createRow(index) {
      var _this2 = this;
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        source = _ref.source,
        _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? 'above' : _ref$mode;
      var sourceRowsCount = this.instance.countSourceRows();
      var physicalRowIndex = sourceRowsCount;
      var numberOfCreatedRows = 0;
      var rowIndex = index;
      if (typeof rowIndex !== 'number' || rowIndex >= sourceRowsCount) {
        rowIndex = sourceRowsCount;
      }
      if (rowIndex < this.instance.countRows()) {
        physicalRowIndex = this.instance.toPhysicalRow(rowIndex);
      }
      var continueProcess = this.instance.runHooks('beforeCreateRow', rowIndex, amount, source);
      if (continueProcess === false || physicalRowIndex === null) {
        return 0;
      }
      var maxRows = this.tableMeta.maxRows;
      var columnCount = this.instance.countCols();
      var rowsToAdd = [];
      var _loop = function _loop() {
        var row = null;
        if (_this2.instance.dataType === 'array') {
          if (_this2.tableMeta.dataSchema) {
            // Clone template array
            row = deepClone(_this2.getSchema());
          } else {
            row = [];
            /* eslint-disable no-loop-func */
            rangeEach(columnCount - 1, function () {
              return row.push(null);
            });
          }
        } else if (_this2.instance.dataType === 'function') {
          row = _this2.tableMeta.dataSchema(rowIndex + numberOfCreatedRows);
        } else {
          row = {};
          deepExtend(row, _this2.getSchema());
        }
        rowsToAdd.push(row);
        numberOfCreatedRows += 1;
      };
      while (numberOfCreatedRows < amount && sourceRowsCount + numberOfCreatedRows < maxRows) {
        _loop();
      }
      this.instance.rowIndexMapper.insertIndexes(rowIndex, numberOfCreatedRows);
      if (mode === 'below') {
        physicalRowIndex = Math.min(physicalRowIndex + 1, sourceRowsCount);
      }
      this.spliceData(physicalRowIndex, 0, rowsToAdd);
      var newVisualRowIndex = this.instance.toVisualRow(physicalRowIndex);
      this.instance.runHooks('afterCreateRow', newVisualRowIndex, numberOfCreatedRows, source);
      this.instance.forceFullRender = true; // used when data was changed

      return {
        delta: numberOfCreatedRows,
        startPhysicalIndex: physicalRowIndex
      };
    }

    /**
     * Creates column at the right of the data array.
     *
     * @param {number} [index] Visual index of the column before which the new column will be inserted.
     * @param {number} [amount=1] An amount of columns to add.
     * @param {object} [options] Additional options for created columns.
     * @param {string} [options.source] Source of method call.
     * @param {'start'|'end'} [options.mode] Sets where the column is inserted: at the start (left in [LTR](@/api/options.md#layoutdirection), right in [RTL](@/api/options.md#layoutdirection)) or at the end (right in LTR, left in LTR)
     * the passed index.
     * @fires Hooks#afterCreateCol
     * @returns {number} Returns number of created columns.
     */
  }, {
    key: "createCol",
    value: function createCol(index) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        source = _ref2.source,
        _ref2$mode = _ref2.mode,
        mode = _ref2$mode === void 0 ? 'start' : _ref2$mode;
      if (!this.instance.isColumnModificationAllowed()) {
        throw new Error('Cannot create new column. When data source in an object, ' + 'you can only have as much columns as defined in first data row, data schema or in the \'columns\' setting.' + 'If you want to be able to add new columns, you have to use array datasource.');
      }
      var dataSource = this.dataSource;
      var maxCols = this.tableMeta.maxCols;
      var countSourceCols = this.instance.countSourceCols();
      var columnIndex = index;
      if (typeof columnIndex !== 'number' || columnIndex >= countSourceCols) {
        columnIndex = countSourceCols;
      }
      var continueProcess = this.instance.runHooks('beforeCreateCol', columnIndex, amount, source);
      if (continueProcess === false) {
        return 0;
      }
      var physicalColumnIndex = countSourceCols;
      if (columnIndex < this.instance.countCols()) {
        physicalColumnIndex = this.instance.toPhysicalColumn(columnIndex);
      }
      var numberOfSourceRows = this.instance.countSourceRows();
      var nrOfColumns = this.instance.countCols();
      var numberOfCreatedCols = 0;
      var currentIndex = physicalColumnIndex;
      if (mode === 'end') {
        currentIndex = Math.min(currentIndex + 1, countSourceCols);
      }
      var startPhysicalIndex = currentIndex;
      while (numberOfCreatedCols < amount && nrOfColumns < maxCols) {
        if (typeof columnIndex !== 'number' || columnIndex >= nrOfColumns) {
          if (numberOfSourceRows > 0) {
            for (var row = 0; row < numberOfSourceRows; row += 1) {
              if (typeof dataSource[row] === 'undefined') {
                dataSource[row] = [];
              }
              dataSource[row].push(null);
            }
          } else {
            dataSource.push([null]);
          }
        } else {
          for (var _row = 0; _row < numberOfSourceRows; _row++) {
            dataSource[_row].splice(currentIndex, 0, null);
          }
        }
        numberOfCreatedCols += 1;
        currentIndex += 1;
        nrOfColumns += 1;
      }
      this.instance.columnIndexMapper.insertIndexes(columnIndex, numberOfCreatedCols);
      var newVisualColumnIndex = this.instance.toVisualColumn(startPhysicalIndex);
      this.instance.runHooks('afterCreateCol', newVisualColumnIndex, numberOfCreatedCols, source);
      this.instance.forceFullRender = true; // used when data was changed

      return {
        delta: numberOfCreatedCols,
        startPhysicalIndex: startPhysicalIndex
      };
    }

    /**
     * Removes row from the data array.
     *
     * @fires Hooks#beforeRemoveRow
     * @fires Hooks#afterRemoveRow
     * @param {number} [index] Visual index of the row to be removed. If not provided, the last row will be removed.
     * @param {number} [amount=1] Amount of the rows to be removed. If not provided, one row will be removed.
     * @param {string} [source] Source of method call.
     * @returns {boolean} Returns `false` when action was cancelled, otherwise `true`.
     */
  }, {
    key: "removeRow",
    value: function removeRow(index) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var source = arguments.length > 2 ? arguments[2] : undefined;
      var rowIndex = Number.isInteger(index) ? index : -amount; // -amount = taking indexes from the end.
      var removedPhysicalIndexes = this.visualRowsToPhysical(rowIndex, amount);
      var sourceRowsLength = this.instance.countSourceRows();
      rowIndex = (sourceRowsLength + rowIndex) % sourceRowsLength;

      // It handle also callback from the `NestedRows` plugin. Removing parent node has effect in removing children nodes.
      var actionWasNotCancelled = this.instance.runHooks('beforeRemoveRow', rowIndex, removedPhysicalIndexes.length, removedPhysicalIndexes, source);
      if (actionWasNotCancelled === false) {
        return false;
      }

      // List of removed indexes might be changed in the `beforeRemoveRow` hook. There may be new values.
      var numberOfRemovedIndexes = removedPhysicalIndexes.length;
      this.filterData(rowIndex, numberOfRemovedIndexes, removedPhysicalIndexes);

      // TODO: Function `removeRow` should validate fully, probably above.
      if (rowIndex < this.instance.countRows()) {
        this.instance.rowIndexMapper.removeIndexes(removedPhysicalIndexes);
        var customDefinedColumns = isDefined(this.tableMeta.columns) || isDefined(this.tableMeta.dataSchema);

        // All rows have been removed. There shouldn't be any columns.
        if (this.instance.rowIndexMapper.getNotTrimmedIndexesLength() === 0 && customDefinedColumns === false) {
          this.instance.columnIndexMapper.setIndexesSequence([]);
        }
      }
      this.instance.runHooks('afterRemoveRow', rowIndex, numberOfRemovedIndexes, removedPhysicalIndexes, source);
      this.instance.forceFullRender = true; // used when data was changed

      return true;
    }

    /**
     * Removes column from the data array.
     *
     * @fires Hooks#beforeRemoveCol
     * @fires Hooks#afterRemoveCol
     * @param {number} [index] Visual index of the column to be removed. If not provided, the last column will be removed.
     * @param {number} [amount=1] Amount of the columns to be removed. If not provided, one column will be removed.
     * @param {string} [source] Source of method call.
     * @returns {boolean} Returns `false` when action was cancelled, otherwise `true`.
     */
  }, {
    key: "removeCol",
    value: function removeCol(index) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var source = arguments.length > 2 ? arguments[2] : undefined;
      if (this.instance.dataType === 'object' || this.tableMeta.columns) {
        throw new Error('cannot remove column with object data source or columns option specified');
      }
      var columnIndex = typeof index !== 'number' ? -amount : index;
      columnIndex = (this.instance.countCols() + columnIndex) % this.instance.countCols();
      var logicColumns = this.visualColumnsToPhysical(columnIndex, amount);
      var descendingLogicColumns = logicColumns.slice(0).sort(function (a, b) {
        return b - a;
      });
      var actionWasNotCancelled = this.instance.runHooks('beforeRemoveCol', columnIndex, amount, logicColumns, source);
      if (actionWasNotCancelled === false) {
        return false;
      }
      var isTableUniform = true;
      var removedColumnsCount = descendingLogicColumns.length;
      var data = this.dataSource;
      for (var c = 0; c < removedColumnsCount; c++) {
        if (isTableUniform && logicColumns[0] !== logicColumns[c] - c) {
          isTableUniform = false;
        }
      }
      if (isTableUniform) {
        for (var r = 0, rlen = this.instance.countSourceRows(); r < rlen; r++) {
          data[r].splice(logicColumns[0], amount);
        }
      } else {
        for (var _r = 0, _rlen = this.instance.countSourceRows(); _r < _rlen; _r++) {
          for (var _c = 0; _c < removedColumnsCount; _c++) {
            data[_r].splice(descendingLogicColumns[_c], 1);
          }
        }
      }

      // TODO: Function `removeCol` should validate fully, probably above.
      if (columnIndex < this.instance.countCols()) {
        this.instance.columnIndexMapper.removeIndexes(logicColumns);

        // All columns have been removed. There shouldn't be any rows.
        if (this.instance.columnIndexMapper.getNotTrimmedIndexesLength() === 0) {
          this.instance.rowIndexMapper.setIndexesSequence([]);
        }
      }
      this.instance.runHooks('afterRemoveCol', columnIndex, amount, logicColumns, source);
      this.instance.forceFullRender = true; // used when data was changed

      return true;
    }

    /**
     * Add/Removes data from the column.
     *
     * @param {number} col Physical index of column in which do you want to do splice.
     * @param {number} index Index at which to start changing the array. If negative, will begin that many elements from the end.
     * @param {number} amount An integer indicating the number of old array elements to remove. If amount is 0, no elements are removed.
     * @param {Array} [elements] The new columns to add.
     * @returns {Array} Returns removed portion of columns.
     */
  }, {
    key: "spliceCol",
    value: function spliceCol(col, index, amount) {
      var colData = this.instance.getDataAtCol(col);
      var removed = colData.slice(index, index + amount);
      var after = colData.slice(index + amount);
      for (var _len = arguments.length, elements = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        elements[_key - 3] = arguments[_key];
      }
      extendArray(elements, after);
      var i = 0;
      while (i < amount) {
        elements.push(null); // add null in place of removed elements
        i += 1;
      }
      to2dArray(elements);
      this.instance.populateFromArray(index, col, elements, null, null, 'spliceCol');
      return removed;
    }

    /**
     * Add/Removes data from the row.
     *
     * @param {number} row Physical index of row in which do you want to do splice.
     * @param {number} index Index at which to start changing the array. If negative, will begin that many elements from the end.
     * @param {number} amount An integer indicating the number of old array elements to remove. If amount is 0, no elements are removed.
     * @param {Array} [elements] The new rows to add.
     * @returns {Array} Returns removed portion of rows.
     */
  }, {
    key: "spliceRow",
    value: function spliceRow(row, index, amount) {
      var rowData = this.instance.getSourceDataAtRow(row);
      var removed = rowData.slice(index, index + amount);
      var after = rowData.slice(index + amount);
      for (var _len2 = arguments.length, elements = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        elements[_key2 - 3] = arguments[_key2];
      }
      extendArray(elements, after);
      var i = 0;
      while (i < amount) {
        elements.push(null); // add null in place of removed elements
        i += 1;
      }
      this.instance.populateFromArray(row, index, [elements], null, null, 'spliceRow');
      return removed;
    }

    /**
     * Add/remove row(s) to/from the data source.
     *
     * @param {number} index Physical index of the element to add/remove.
     * @param {number} deleteCount Number of rows to remove.
     * @param {Array<object>} elements Row elements to be added.
     */
  }, {
    key: "spliceData",
    value: function spliceData(index, deleteCount, elements) {
      var _this3 = this;
      var continueSplicing = this.instance.runHooks('beforeDataSplice', index, deleteCount, elements);
      if (continueSplicing !== false) {
        var newData = [].concat(_toConsumableArray(this.dataSource.slice(0, index)), _toConsumableArray(elements), _toConsumableArray(this.dataSource.slice(index)));

        // We try not to change the reference.
        this.dataSource.length = 0;

        // Pushing to array instead of using `splice`, because Babel changes the code to one that uses the `apply` method.
        // The used method was cause of the problem described within #7840.
        newData.forEach(function (row) {
          return _this3.dataSource.push(row);
        });
      }
    }

    /**
     * Filter unwanted data elements from the data source.
     *
     * @param {number} index Visual index of the element to remove.
     * @param {number} amount Number of rows to add/remove.
     * @param {number} physicalRows Physical row indexes.
     */
  }, {
    key: "filterData",
    value: function filterData(index, amount, physicalRows) {
      // Custom data filtering (run as a consequence of calling the below hook) provide an array containing new data.
      var data = this.instance.runHooks('filterData', index, amount, physicalRows);

      // Hooks by default returns first argument (when there is no callback changing execution result).
      if (Array.isArray(data) === false) {
        data = this.dataSource.filter(function (row, rowIndex) {
          return physicalRows.indexOf(rowIndex) === -1;
        });
      }
      this.dataSource.length = 0;
      Array.prototype.push.apply(this.dataSource, data);
    }

    /**
     * Returns single value from the data array.
     *
     * @param {number} row Visual row index.
     * @param {number} prop The column property.
     * @returns {*}
     */
  }, {
    key: "get",
    value: function get(row, prop) {
      var physicalRow = this.instance.toPhysicalRow(row);
      var dataRow = this.dataSource[physicalRow];
      // TODO: To remove, use 'modifyData' hook instead (see below)
      var modifiedRowData = this.instance.runHooks('modifyRowData', physicalRow);
      dataRow = isNaN(modifiedRowData) ? modifiedRowData : dataRow;
      //

      var value = null;

      // try to get value under property `prop` (includes dot)
      if (dataRow && dataRow.hasOwnProperty && hasOwnProperty(dataRow, prop)) {
        value = dataRow[prop];
      } else if (typeof prop === 'string' && prop.indexOf('.') > -1) {
        var sliced = prop.split('.');
        var out = dataRow;
        if (!out) {
          return null;
        }
        for (var i = 0, ilen = sliced.length; i < ilen; i++) {
          out = out[sliced[i]];
          if (typeof out === 'undefined') {
            return null;
          }
        }
        value = out;
      } else if (typeof prop === 'function') {
        value = prop(this.dataSource.slice(physicalRow, physicalRow + 1)[0]);
      }
      if (this.instance.hasHook('modifyData')) {
        var valueHolder = createObjectPropListener(value);
        this.instance.runHooks('modifyData', physicalRow, this.propToCol(prop), valueHolder, 'get');
        if (valueHolder.isTouched()) {
          value = valueHolder.value;
        }
      }
      return value;
    }

    /**
     * Returns single value from the data array (intended for clipboard copy to an external application).
     *
     * @param {number} row Physical row index.
     * @param {number} prop The column property.
     * @returns {string}
     */
  }, {
    key: "getCopyable",
    value: function getCopyable(row, prop) {
      if (copyableLookup.call(this.instance, row, this.propToCol(prop))) {
        return this.get(row, prop);
      }
      return '';
    }

    /**
     * Saves single value to the data array.
     *
     * @param {number} row Visual row index.
     * @param {number} prop The column property.
     * @param {string} value The value to set.
     */
  }, {
    key: "set",
    value: function set(row, prop, value) {
      var physicalRow = this.instance.toPhysicalRow(row);
      var newValue = value;
      var dataRow = this.dataSource[physicalRow];
      // TODO: To remove, use 'modifyData' hook instead (see below)
      var modifiedRowData = this.instance.runHooks('modifyRowData', physicalRow);
      dataRow = isNaN(modifiedRowData) ? modifiedRowData : dataRow;
      //

      if (this.instance.hasHook('modifyData')) {
        var valueHolder = createObjectPropListener(newValue);
        this.instance.runHooks('modifyData', physicalRow, this.propToCol(prop), valueHolder, 'set');
        if (valueHolder.isTouched()) {
          newValue = valueHolder.value;
        }
      }

      // try to set value under property `prop` (includes dot)
      if (dataRow && dataRow.hasOwnProperty && hasOwnProperty(dataRow, prop)) {
        dataRow[prop] = newValue;
      } else if (typeof prop === 'string' && prop.indexOf('.') > -1) {
        var sliced = prop.split('.');
        var out = dataRow;
        var i = 0;
        var ilen;
        for (i = 0, ilen = sliced.length - 1; i < ilen; i++) {
          if (typeof out[sliced[i]] === 'undefined') {
            out[sliced[i]] = {};
          }
          out = out[sliced[i]];
        }
        out[sliced[i]] = newValue;
      } else if (typeof prop === 'function') {
        prop(this.dataSource.slice(physicalRow, physicalRow + 1)[0], newValue);
      } else {
        dataRow[prop] = newValue;
      }
    }

    /**
     * This ridiculous piece of code maps rows Id that are present in table data to those displayed for user.
     * The trick is, the physical row id (stored in settings.data) is not necessary the same
     * as the visual (displayed) row id (e.g. When sorting is applied).
     *
     * @param {number} index Visual row index.
     * @param {number} amount An amount of rows to translate.
     * @returns {number}
     */
  }, {
    key: "visualRowsToPhysical",
    value: function visualRowsToPhysical(index, amount) {
      var totalRows = this.instance.countSourceRows();
      var logicRows = [];
      var physicRow = (totalRows + index) % totalRows;
      var rowsToRemove = amount;
      var row;
      while (physicRow < totalRows && rowsToRemove) {
        row = this.instance.toPhysicalRow(physicRow);
        logicRows.push(row);
        rowsToRemove -= 1;
        physicRow += 1;
      }
      return logicRows;
    }

    /**
     *
     * @param {number} index Visual column index.
     * @param {number} amount An amount of rows to translate.
     * @returns {Array}
     */
  }, {
    key: "visualColumnsToPhysical",
    value: function visualColumnsToPhysical(index, amount) {
      var totalCols = this.instance.countCols();
      var visualCols = [];
      var physicalCol = (totalCols + index) % totalCols;
      var colsToRemove = amount;
      while (physicalCol < totalCols && colsToRemove) {
        var col = this.instance.toPhysicalColumn(physicalCol);
        visualCols.push(col);
        colsToRemove -= 1;
        physicalCol += 1;
      }
      return visualCols;
    }

    /**
     * Clears the data array.
     */
  }, {
    key: "clear",
    value: function clear() {
      for (var r = 0; r < this.instance.countSourceRows(); r++) {
        for (var c = 0; c < this.instance.countCols(); c++) {
          this.set(r, this.colToProp(c), '');
        }
      }
    }

    /**
     * Get data length.
     *
     * @returns {number}
     */
  }, {
    key: "getLength",
    value: function getLength() {
      var maxRowsFromSettings = this.tableMeta.maxRows;
      var maxRows;
      if (maxRowsFromSettings < 0 || maxRowsFromSettings === 0) {
        maxRows = 0;
      } else {
        maxRows = maxRowsFromSettings || Infinity;
      }
      var length = this.instance.rowIndexMapper.getNotTrimmedIndexesLength();
      return Math.min(length, maxRows);
    }

    /**
     * Returns the data array.
     *
     * @returns {Array}
     */
  }, {
    key: "getAll",
    value: function getAll() {
      var start = {
        row: 0,
        col: 0
      };
      var end = {
        row: Math.max(this.instance.countRows() - 1, 0),
        col: Math.max(this.instance.countCols() - 1, 0)
      };
      if (start.row - end.row === 0 && !this.instance.countSourceRows()) {
        return [];
      }
      return this.getRange(start, end, DataMap.DESTINATION_RENDERER);
    }

    /**
     * Count the number of columns cached in the `colToProp` cache.
     *
     * @returns {number} Amount of cached columns.
     */
  }, {
    key: "countCachedColumns",
    value: function countCachedColumns() {
      return this.colToPropCache.length;
    }

    /**
     * Returns data range as array.
     *
     * @param {object} [start] Start selection position. Visual indexes.
     * @param {object} [end] End selection position. Visual indexes.
     * @param {number} destination Destination of datamap.get.
     * @returns {Array}
     */
  }, {
    key: "getRange",
    value: function getRange(start, end, destination) {
      var output = [];
      var r;
      var c;
      var row;
      var maxRows = this.tableMeta.maxRows;
      var maxCols = this.tableMeta.maxCols;
      if (maxRows === 0 || maxCols === 0) {
        return [];
      }
      var getFn = destination === DataMap.DESTINATION_CLIPBOARD_GENERATOR ? this.getCopyable : this.get;
      var rlen = Math.min(Math.max(maxRows - 1, 0), Math.max(start.row, end.row));
      var clen = Math.min(Math.max(maxCols - 1, 0), Math.max(start.col, end.col));
      for (r = Math.min(start.row, end.row); r <= rlen; r++) {
        row = [];
        // We just store indexes for rows without headers.
        var physicalRow = r >= 0 ? this.instance.toPhysicalRow(r) : r;
        for (c = Math.min(start.col, end.col); c <= clen; c++) {
          if (physicalRow === null) {
            break;
          }
          row.push(getFn.call(this, r, this.colToProp(c)));
        }
        if (physicalRow !== null) {
          output.push(row);
        }
      }
      return output;
    }

    /**
     * Return data as text (tab separated columns).
     *
     * @param {object} [start] Start selection position. Visual indexes.
     * @param {object} [end] End selection position. Visual indexes.
     * @returns {string}
     */
  }, {
    key: "getText",
    value: function getText(start, end) {
      return stringify(this.getRange(start, end, DataMap.DESTINATION_RENDERER));
    }

    /**
     * Return data as copyable text (tab separated columns intended for clipboard copy to an external application).
     *
     * @param {object} [start] Start selection position. Visual indexes.
     * @param {object} [end] End selection position. Visual indexes.
     * @returns {string}
     */
  }, {
    key: "getCopyableText",
    value: function getCopyableText(start, end) {
      return stringify(this.getRange(start, end, DataMap.DESTINATION_CLIPBOARD_GENERATOR));
    }

    /**
     * Destroy instance.
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this.instance = null;
      this.tableMeta = null;
      this.dataSource = null;
      this.duckSchema = null;
      this.colToPropCache.length = 0;
      this.propToColCache.clear();
      this.propToColCache = void 0;
    }
  }], [{
    key: "DESTINATION_RENDERER",
    get:
    /**
     * @type {number}
     */
    function get() {
      return 1;
    }

    /**
     * @type {number}
     */
  }, {
    key: "DESTINATION_CLIPBOARD_GENERATOR",
    get: function get() {
      return 2;
    }
  }]);
  return DataMap;
}();
export default DataMap;