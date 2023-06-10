function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import { getCellType } from "./../cellTypes/registry.mjs";
import { deepObjectSize, hasOwnProperty, isObject } from "./object.mjs";
var COLUMN_LABEL_BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var COLUMN_LABEL_BASE_LENGTH = COLUMN_LABEL_BASE.length;

/**
 * Generates spreadsheet-like column names: A, B, C, ..., Z, AA, AB, etc.
 *
 * @param {number} index Column index.
 * @returns {string}
 */
export function spreadsheetColumnLabel(index) {
  var dividend = index + 1;
  var columnLabel = '';
  var modulo;
  while (dividend > 0) {
    modulo = (dividend - 1) % COLUMN_LABEL_BASE_LENGTH;
    columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
    dividend = parseInt((dividend - modulo) / COLUMN_LABEL_BASE_LENGTH, 10);
  }
  return columnLabel;
}

/**
 * Generates spreadsheet-like column index from theirs labels: A, B, C ...., Z, AA, AB, etc.
 *
 * @param {string} label Column label.
 * @returns {number}
 */
export function spreadsheetColumnIndex(label) {
  var result = 0;
  if (label) {
    for (var i = 0, j = label.length - 1; i < label.length; i += 1, j -= 1) {
      result += Math.pow(COLUMN_LABEL_BASE_LENGTH, j) * (COLUMN_LABEL_BASE.indexOf(label[i]) + 1);
    }
  }
  result -= 1;
  return result;
}

/**
 * Creates 2D array of Excel-like values "A1", "A2", ...
 *
 * @param {number} rows Number of rows to generate.
 * @param {number} columns Number of columns to generate.
 * @returns {Array}
 */
export function createSpreadsheetData() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var _rows = [];
  var i;
  var j;
  for (i = 0; i < rows; i++) {
    var row = [];
    for (j = 0; j < columns; j++) {
      row.push(spreadsheetColumnLabel(j) + (i + 1));
    }
    _rows.push(row);
  }
  return _rows;
}

/**
 * Creates 2D array of Excel-like values "A1", "A2", as an array of objects.
 *
 * @param {number} rows Number of rows to generate.
 * @param {number} colCount Number of columns to generate.
 * @returns {Array}
 */
export function createSpreadsheetObjectData() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var colCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var _rows = [];
  var i;
  var j;
  for (i = 0; i < rows; i++) {
    var row = {};
    for (j = 0; j < colCount; j++) {
      row["prop".concat(j)] = spreadsheetColumnLabel(j) + (i + 1);
    }
    _rows.push(row);
  }
  return _rows;
}

/**
 * Generates an empty data object.
 *
 * @param {number} rows Number of rows to generate.
 * @param {number} columns Number of columns to generate.
 * @returns {Array}
 */
export function createEmptySpreadsheetData(rows, columns) {
  var data = [];
  var row;
  for (var i = 0; i < rows; i++) {
    row = [];
    for (var j = 0; j < columns; j++) {
      row.push('');
    }
    data.push(row);
  }
  return data;
}

/**
 * Factory that produces a function for searching methods (or any properties) which could be defined directly in
 * table configuration or implicitly, within cell type definition.
 *
 * For example: renderer can be defined explicitly using "renderer" property in column configuration or it can be
 * defined implicitly using "type" property.
 *
 * Methods/properties defined explicitly always takes precedence over those defined through "type".
 *
 * If the method/property is not found in an object, searching is continued recursively through prototype chain, until
 * it reaches the Object.prototype.
 *
 * @param {string} methodName Name of the method/property to search (i.e. 'renderer', 'validator', 'copyable').
 * @param {boolean} [allowUndefined] If `false`, the search is continued if methodName has not been found in cell
 *   "type".
 * @returns {Function}
 */
export function cellMethodLookupFactory(methodName, allowUndefined) {
  var isUndefinedAllowed = typeof allowUndefined === 'undefined' ? true : allowUndefined;
  return function cellMethodLookup(row, col) {
    return function getMethodFromProperties(properties) {
      if (!properties) {
        return; // method or property not found
      }

      if (hasOwnProperty(properties, methodName) && properties[methodName] !== void 0) {
        // check if it is own and is not empty
        return properties[methodName]; // method defined directly
      } else if (hasOwnProperty(properties, 'type') && properties.type) {
        // check if it is own and is not empty
        if (typeof properties.type !== 'string') {
          throw new Error('Cell "type" must be a string');
        }
        var type = getCellType(properties.type);
        if (hasOwnProperty(type, methodName)) {
          return type[methodName]; // method defined in type.
        } else if (isUndefinedAllowed) {
          return; // method does not defined in type (eg. validator), returns undefined
        }
      }

      return getMethodFromProperties(Object.getPrototypeOf(properties));
    }(typeof row === 'number' ? this.getCellMeta(row, col) : row);
  };
}

/**
 * Transform a data row (either an array or an object) or an array of data rows to array of changes in a form of `[row,
 * prop/col, value]`. Convenient to use with `setDataAtRowProp` and `setSourceDataAtCell` methods.
 *
 * @param {Array|object} dataRow Object of row data, array of row data or an array of either.
 * @param {number} rowOffset Row offset to be passed to the resulting change list. Defaults to `0`.
 * @returns {Array} Array of changes (in a form of an array).
 */
export function dataRowToChangesArray(dataRow) {
  var rowOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var dataRows = dataRow;
  var changesArray = [];
  if (!Array.isArray(dataRow) || !Array.isArray(dataRow[0])) {
    dataRows = [dataRow];
  }
  dataRows.forEach(function (row, rowIndex) {
    if (Array.isArray(row)) {
      row.forEach(function (value, column) {
        changesArray.push([rowIndex + rowOffset, column, value]);
      });
    } else {
      Object.keys(row).forEach(function (propName) {
        changesArray.push([rowIndex + rowOffset, propName, row[propName]]);
      });
    }
  });
  return changesArray;
}

/**
 * Count the number of keys (or, basically, columns when the data is an array or arrays) in the first row of the
 * provided dataset.
 *
 * @param {Array} data The dataset.
 * @returns {number} Number of keys in the first row of the dataset.
 */
export function countFirstRowKeys(data) {
  var result = 0;
  if (Array.isArray(data)) {
    if (data[0] && Array.isArray(data[0])) {
      result = data[0].length;
    } else if (data[0] && isObject(data[0])) {
      result = deepObjectSize(data[0]);
    }
  }
  return result;
}

/**
 * Check whether the provided dataset is a *non-empty* array of arrays.
 *
 * @param {Array} data Dataset to be checked.
 * @returns {boolean} `true` if data is an array of arrays, `false` otherwise.
 */
export function isArrayOfArrays(data) {
  return !!(Array.isArray(data) && data.length && data.every(function (el) {
    return Array.isArray(el);
  }));
}

/**
 * Check whether the provided dataset is a *non-empty* array of objects.
 *
 * @param {Array} data Dataset to be checked.
 * @returns {boolean} `true` if data is an array of objects, `false` otherwise.
 */
export function isArrayOfObjects(data) {
  return !!(Array.isArray(data) && data.length && data.every(function (el) {
    return _typeof(el) === 'object' && !Array.isArray(el) && el !== null;
  }));
}