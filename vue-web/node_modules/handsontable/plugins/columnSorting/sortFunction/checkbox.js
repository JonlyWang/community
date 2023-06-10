"use strict";

exports.__esModule = true;
exports.COLUMN_DATA_TYPE = void 0;
exports.compareFunctionFactory = compareFunctionFactory;
var _sortService = require("../sortService");
var _default = require("../sortFunction/default");
var _mixed = require("../../../helpers/mixed");
/**
 * Checkbox sorting compare function factory. Method get as parameters `sortOrder` and `columnMeta` and return compare function.
 *
 * @param {string} sortOrder Sort order (`asc` for ascending, `desc` for descending).
 * @param {object} columnMeta Column meta object.
 * @param {object} columnPluginSettings Plugin settings for the column.
 * @returns {Function} The compare function.
 */
function compareFunctionFactory(sortOrder, columnMeta, columnPluginSettings) {
  var checkedTemplate = columnMeta.checkedTemplate;
  var uncheckedTemplate = columnMeta.uncheckedTemplate;
  var sortEmptyCells = columnPluginSettings.sortEmptyCells;
  return function (value, nextValue) {
    var isEmptyValue = (0, _mixed.isEmpty)(value);
    var isEmptyNextValue = (0, _mixed.isEmpty)(nextValue);
    var unifiedValue = isEmptyValue ? uncheckedTemplate : value;
    var unifiedNextValue = isEmptyNextValue ? uncheckedTemplate : nextValue;
    var isValueFromTemplate = unifiedValue === uncheckedTemplate || unifiedValue === checkedTemplate;
    var isNextValueFromTemplate = unifiedNextValue === uncheckedTemplate || unifiedNextValue === checkedTemplate;

    // As an empty cell we recognize cells with undefined, null and '' values.
    if (sortEmptyCells === false) {
      if (isEmptyValue && isEmptyNextValue === false) {
        return _sortService.FIRST_AFTER_SECOND;
      }
      if (isEmptyValue === false && isEmptyNextValue) {
        return _sortService.FIRST_BEFORE_SECOND;
      }
    }

    // 1st value === #BAD_VALUE#
    if (isValueFromTemplate === false && isNextValueFromTemplate) {
      return sortOrder === 'asc' ? _sortService.FIRST_BEFORE_SECOND : _sortService.FIRST_AFTER_SECOND;
    }

    // 2nd value === #BAD_VALUE#
    if (isValueFromTemplate && isNextValueFromTemplate === false) {
      return sortOrder === 'asc' ? _sortService.FIRST_AFTER_SECOND : _sortService.FIRST_BEFORE_SECOND;
    }

    // 1st value === #BAD_VALUE# && 2nd value === #BAD_VALUE#
    if (isValueFromTemplate === false && isNextValueFromTemplate === false) {
      // Sorting by values (not just by visual representation).
      return (0, _default.compareFunctionFactory)(sortOrder, columnMeta, columnPluginSettings)(value, nextValue);
    }
    if (unifiedValue === uncheckedTemplate && unifiedNextValue === checkedTemplate) {
      return sortOrder === 'asc' ? _sortService.FIRST_BEFORE_SECOND : _sortService.FIRST_AFTER_SECOND;
    }
    if (unifiedValue === checkedTemplate && unifiedNextValue === uncheckedTemplate) {
      return sortOrder === 'asc' ? _sortService.FIRST_AFTER_SECOND : _sortService.FIRST_BEFORE_SECOND;
    }
    return _sortService.DO_NOT_SWAP;
  };
}
var COLUMN_DATA_TYPE = 'checkbox';
exports.COLUMN_DATA_TYPE = COLUMN_DATA_TYPE;