"use strict";

exports.__esModule = true;
exports.VALIDATOR_TYPE = void 0;
exports.autocompleteValidator = autocompleteValidator;
var VALIDATOR_TYPE = 'autocomplete';

/**
 * The Autocomplete cell validator.
 *
 * @private
 * @param {*} value Value of edited cell.
 * @param {Function} callback Callback called with validation result.
 */
exports.VALIDATOR_TYPE = VALIDATOR_TYPE;
function autocompleteValidator(value, callback) {
  var valueToValidate = value;
  if (valueToValidate === null || valueToValidate === void 0) {
    valueToValidate = '';
  }
  if (this.allowEmpty && valueToValidate === '') {
    callback(true);
    return;
  }
  if (this.strict && this.source) {
    if (typeof this.source === 'function') {
      this.source(valueToValidate, process(valueToValidate, callback));
    } else {
      process(valueToValidate, callback)(this.source);
    }
  } else {
    callback(true);
  }
}
autocompleteValidator.VALIDATOR_TYPE = VALIDATOR_TYPE;

/**
 * Function responsible for validation of autocomplete value.
 *
 * @param {*} value Value of edited cell.
 * @param {Function} callback Callback called with validation result.
 * @returns {Function}
 */
function process(value, callback) {
  var originalVal = value;
  return function (source) {
    var found = false;
    for (var s = 0, slen = source.length; s < slen; s++) {
      if (originalVal === source[s]) {
        found = true; // perfect match
        break;
      }
    }
    callback(found);
  };
}