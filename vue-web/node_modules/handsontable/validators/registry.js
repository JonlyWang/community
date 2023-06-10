"use strict";

exports.__esModule = true;
exports.getRegisteredValidators = exports.getRegisteredValidatorNames = void 0;
exports.getValidator = _getItem;
exports.hasValidator = void 0;
exports.registerValidator = _register;
var _staticRegister2 = _interopRequireDefault(require("../utils/staticRegister"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _staticRegister = (0, _staticRegister2.default)('validators'),
  register = _staticRegister.register,
  getItem = _staticRegister.getItem,
  hasItem = _staticRegister.hasItem,
  getNames = _staticRegister.getNames,
  getValues = _staticRegister.getValues;

/**
 * Retrieve validator function.
 *
 * @param {string} name Validator identification.
 * @returns {Function} Returns validator function.
 */
exports.getRegisteredValidators = getValues;
exports.getRegisteredValidatorNames = getNames;
exports.hasValidator = hasItem;
function _getItem(name) {
  if (typeof name === 'function') {
    return name;
  }
  if (!hasItem(name)) {
    throw Error("No registered validator found under \"".concat(name, "\" name"));
  }
  return getItem(name);
}

/**
 * Register validator under its alias.
 *
 * @param {string|Function} name Validator's alias or validator function with its descriptor.
 * @param {Function} [validator] Validator function.
 */
function _register(name, validator) {
  if (typeof name !== 'string') {
    validator = name;
    name = validator.VALIDATOR_TYPE;
  }
  register(name, validator);
}