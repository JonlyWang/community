function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import Csv from "./types/csv.mjs";
export var TYPE_CSV = 'csv';
export var TYPE_EXCEL = 'excel'; // TODO
export var TYPE_PDF = 'pdf'; // TODO

export var EXPORT_TYPES = _defineProperty({}, TYPE_CSV, Csv);

/**
 * @private
 * @param {string} type The exporter type.
 * @param {DataProvider} dataProvider The data provider.
 * @param {object} options Constructor options for exporter class.
 * @returns {BaseType|null}
 */
export default function typeFactory(type, dataProvider, options) {
  if (typeof EXPORT_TYPES[type] === 'function') {
    return new EXPORT_TYPES[type](dataProvider, options);
  }
  return null;
}