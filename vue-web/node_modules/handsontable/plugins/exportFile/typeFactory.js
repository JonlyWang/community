"use strict";

exports.__esModule = true;
exports.TYPE_PDF = exports.TYPE_EXCEL = exports.TYPE_CSV = exports.EXPORT_TYPES = void 0;
exports.default = typeFactory;
var _csv = _interopRequireDefault(require("./types/csv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var TYPE_CSV = 'csv';
exports.TYPE_CSV = TYPE_CSV;
var TYPE_EXCEL = 'excel'; // TODO
exports.TYPE_EXCEL = TYPE_EXCEL;
var TYPE_PDF = 'pdf'; // TODO
exports.TYPE_PDF = TYPE_PDF;
var EXPORT_TYPES = _defineProperty({}, TYPE_CSV, _csv.default);

/**
 * @private
 * @param {string} type The exporter type.
 * @param {DataProvider} dataProvider The data provider.
 * @param {object} options Constructor options for exporter class.
 * @returns {BaseType|null}
 */
exports.EXPORT_TYPES = EXPORT_TYPES;
function typeFactory(type, dataProvider, options) {
  if (typeof EXPORT_TYPES[type] === 'function') {
    return new EXPORT_TYPES[type](dataProvider, options);
  }
  return null;
}