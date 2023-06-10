"use strict";

exports.__esModule = true;
exports.assert = assert;
exports.columnFactory = columnFactory;
exports.expandMetaType = expandMetaType;
exports.isNullish = isNullish;
exports.isUnsignedNumber = isUnsignedNumber;
require("core-js/modules/es.number.is-integer.js");
require("core-js/modules/es.number.constructor.js");
var _object = require("../../helpers/object");
var _registry = require("../../cellTypes/registry");
/**
 * Expands "type" property of the meta object to single values. For example `type: 'numeric'` sets
 * "renderer", "editor", "validator" properties to specific functions designed for numeric values.
 * If "type" is passed as an object that object will be returned, excluding properties that
 * already exist in the "metaObject" if passed.
 *
 * @param {object|string} type Type to expand;.
 * @param {object|undefined} [metaObject] Source meta object.
 * @returns {object|undefined}
 */
function expandMetaType(type, metaObject) {
  var validType = typeof type === 'string' ? (0, _registry.getCellType)(type) : type;
  if (!(0, _object.isObject)(validType)) {
    return;
  }
  var preventSourceOverwrite = (0, _object.isObject)(metaObject);
  var expandedType = {};
  (0, _object.objectEach)(validType, function (value, property) {
    var _metaObject$_automati;
    if (property !== 'CELL_TYPE' && (!preventSourceOverwrite || preventSourceOverwrite && (!(0, _object.hasOwnProperty)(metaObject, property) || (metaObject === null || metaObject === void 0 ? void 0 : (_metaObject$_automati = metaObject._automaticallyAssignedMetaProps) === null || _metaObject$_automati === void 0 ? void 0 : _metaObject$_automati[property]) === true))) {
      expandedType[property] = value;
      if (metaObject !== null && metaObject !== void 0 && metaObject._automaticallyAssignedMetaProps) {
        metaObject._automaticallyAssignedMetaProps[property] = true;
      }
    }
  });
  return expandedType;
}

/**
 * Creates new class which extends properties from TableMeta layer class.
 *
 * @param {TableMeta} TableMeta The TableMeta which the new ColumnMeta is created from.
 * @param {string[]} [conflictList] List of the properties which are conflicted with the column meta layer.
 *                                  Conflicted properties are overwritten by `undefined` value, to separate them
 *                                  from the TableMeta layer.
 * @returns {ColumnMeta} Returns constructor ready to initialize with `new` operator.
 */
function columnFactory(TableMeta) {
  var conflictList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // Do not use ES6 "class extends" syntax here. It seems that the babel produces code
  // which drastically decreases the performance of the ColumnMeta class creation.

  /**
   * Base "class" for column meta.
   */
  function ColumnMeta() {}
  (0, _object.inherit)(ColumnMeta, TableMeta);

  // Clear conflict settings
  for (var i = 0; i < conflictList.length; i++) {
    ColumnMeta.prototype[conflictList[i]] = void 0;
  }
  return ColumnMeta;
}

/**
 * Helper which checks if the provided argument is an unsigned number.
 *
 * @param {*} value Value to check.
 * @returns {boolean}
 */
function isUnsignedNumber(value) {
  return Number.isInteger(value) && value >= 0;
}

/**
 * Function which makes assertion by custom condition. Function throws an error when assertion doesn't meet the spec.
 *
 * @param {Function} condition Function with custom logic. The condition has to return boolean values.
 * @param {string} errorMessage String which describes assertion error.
 */
function assert(condition, errorMessage) {
  if (!condition()) {
    throw new Error("Assertion failed: ".concat(errorMessage));
  }
}

/**
 * Check if given variable is null or undefined.
 *
 * @param {*} variable Variable to check.
 * @returns {boolean}
 */
function isNullish(variable) {
  return variable === null || variable === void 0;
}