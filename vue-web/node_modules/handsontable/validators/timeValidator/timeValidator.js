"use strict";

exports.__esModule = true;
exports.VALIDATOR_TYPE = void 0;
exports.timeValidator = timeValidator;
require("core-js/modules/es.regexp.exec.js");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Formats which are correctly parsed to time (supported by momentjs)
var STRICT_FORMATS = ['YYYY-MM-DDTHH:mm:ss.SSSZ', 'X',
// Unix timestamp
'x' // Unix ms timestamp
];

var VALIDATOR_TYPE = 'time';

/**
 * The Time cell validator.
 *
 * @private
 * @param {*} value Value of edited cell.
 * @param {Function} callback Callback called with validation result.
 */
exports.VALIDATOR_TYPE = VALIDATOR_TYPE;
function timeValidator(value, callback) {
  var timeFormat = this.timeFormat || 'h:mm:ss a';
  var valid = true;
  var valueToValidate = value;
  if (valueToValidate === null) {
    valueToValidate = '';
  }
  valueToValidate = /^\d{3,}$/.test(valueToValidate) ? parseInt(valueToValidate, 10) : valueToValidate;
  var twoDigitValue = /^\d{1,2}$/.test(valueToValidate);
  if (twoDigitValue) {
    valueToValidate += ':00';
  }
  var date = (0, _moment.default)(valueToValidate, STRICT_FORMATS, true).isValid() ? (0, _moment.default)(valueToValidate) : (0, _moment.default)(valueToValidate, timeFormat);
  var isValidTime = date.isValid();

  // is it in the specified format
  var isValidFormat = (0, _moment.default)(valueToValidate, timeFormat, true).isValid() && !twoDigitValue;
  if (this.allowEmpty && valueToValidate === '') {
    isValidTime = true;
    isValidFormat = true;
  }
  if (!isValidTime) {
    valid = false;
  }
  if (!isValidTime && isValidFormat) {
    valid = true;
  }
  if (isValidTime && !isValidFormat) {
    if (this.correctFormat === true) {
      // if format correction is enabled
      var correctedValue = date.format(timeFormat);
      var row = this.instance.toVisualRow(this.row);
      var column = this.instance.toVisualColumn(this.col);
      this.instance.setDataAtCell(row, column, correctedValue, 'timeValidator');
      valid = true;
    } else {
      valid = false;
    }
  }
  callback(valid);
}
timeValidator.VALIDATOR_TYPE = VALIDATOR_TYPE;