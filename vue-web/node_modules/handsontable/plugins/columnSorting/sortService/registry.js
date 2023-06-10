"use strict";

exports.__esModule = true;
exports.getCompareFunctionFactory = getCompareFunctionFactory;
exports.registerRootComparator = exports.getRootComparator = void 0;
var _default = require("../sortFunction/default");
var _numeric = require("../sortFunction/numeric");
var _checkbox = require("../sortFunction/checkbox");
var _date = require("../sortFunction/date");
var _staticRegister3 = _interopRequireDefault(require("../../../utils/staticRegister"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _staticRegister = (0, _staticRegister3.default)('sorting.compareFunctionFactory'),
  registerCompareFunctionFactory = _staticRegister.register,
  getGloballyCompareFunctionFactory = _staticRegister.getItem,
  hasGloballyCompareFunctionFactory = _staticRegister.hasItem;
var _staticRegister2 = (0, _staticRegister3.default)('sorting.mainSortComparator'),
  registerRootComparator = _staticRegister2.register,
  getRootComparator = _staticRegister2.getItem;

/**
 * Gets sort function for the particular column basing on it's data type.
 *
 * @param {string} type The data type.
 * @returns {Function}
 */
exports.getRootComparator = getRootComparator;
exports.registerRootComparator = registerRootComparator;
function getCompareFunctionFactory(type) {
  if (hasGloballyCompareFunctionFactory(type)) {
    return getGloballyCompareFunctionFactory(type);
  }
  return getGloballyCompareFunctionFactory(_default.COLUMN_DATA_TYPE);
}
registerCompareFunctionFactory(_numeric.COLUMN_DATA_TYPE, _numeric.compareFunctionFactory);
registerCompareFunctionFactory(_checkbox.COLUMN_DATA_TYPE, _checkbox.compareFunctionFactory);
registerCompareFunctionFactory(_date.COLUMN_DATA_TYPE, _date.compareFunctionFactory);
registerCompareFunctionFactory(_default.COLUMN_DATA_TYPE, _default.compareFunctionFactory);