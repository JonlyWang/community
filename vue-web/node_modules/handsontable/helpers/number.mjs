function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.regexp.constructor.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.trim.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * Checks if the passed value is numeric one. For example these values (passed as string or number)
 * are considered as numeric values:
 *  - 0.001
 *  - .001
 *  - - 10000
 *  - 10000
 *  - 1e+26
 *  - 22e-26
 *  - .45e+26
 *  - 0xabcdef (hex)
 *  - 0x1 (hex)
 *
 * @param {*} value The value to check.
 * @param {string[]} additionalDelimiters An additional delimiters to be used while checking the numeric value.
 * @returns {boolean}
 */
export function isNumeric(value) {
  var additionalDelimiters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var type = _typeof(value);
  if (type === 'number') {
    return !isNaN(value) && isFinite(value);
  } else if (type === 'string') {
    if (value.length === 0) {
      return false;
    } else if (value.length === 1) {
      return /\d/.test(value);
    }
    var delimiter = Array.from(new Set(['.'].concat(_toConsumableArray(additionalDelimiters)))).map(function (d) {
      return "\\".concat(d);
    }).join('|');
    return new RegExp("^[+-]?\\s*(((".concat(delimiter, ")?\\d+((").concat(delimiter, ")\\d+)?(e[+-]?\\d+)?)|(0x[a-f\\d]+))$"), 'i').test(value.trim());
  } else if (type === 'object') {
    return !!value && typeof value.valueOf() === 'number' && !(value instanceof Date);
  }
  return false;
}
/* eslint-enable jsdoc/require-description-complete-sentence */

/**
 * Checks if the passed value is numeric-like value. The helper returns `true` for the same
 * values as for the `isNumeric` function plus `true` for numbers delimited by comma.
 *
 * @param {*} value The value to check.
 * @returns {boolean}
 */
export function isNumericLike(value) {
  return isNumeric(value, [',']);
}

/**
 * A specialized version of `.forEach` defined by ranges.
 *
 * @param {number} rangeFrom The number from start iterate.
 * @param {number|Function} rangeTo The number where finish iterate or function as a iteratee.
 * @param {Function} [iteratee] The function invoked per iteration.
 */
export function rangeEach(rangeFrom, rangeTo, iteratee) {
  var index = -1;
  if (typeof rangeTo === 'function') {
    iteratee = rangeTo;
    rangeTo = rangeFrom;
  } else {
    index = rangeFrom - 1;
  }

  /* eslint-disable-next-line no-plusplus */
  while (++index <= rangeTo) {
    if (iteratee(index) === false) {
      break;
    }
  }
}

/**
 * A specialized version of `.forEach` defined by ranges iterable in reverse order.
 *
 * @param {number} rangeFrom The number from start iterate.
 * @param {number|Function} rangeTo The number where finish iterate or function as a iteratee.
 * @param {Function} [iteratee] The function invoked per iteration.
 */
export function rangeEachReverse(rangeFrom, rangeTo, iteratee) {
  var index = rangeFrom + 1;
  if (typeof rangeTo === 'function') {
    iteratee = rangeTo;
    rangeTo = 0;
  }
  /* eslint-disable-next-line no-plusplus */
  while (--index >= rangeTo) {
    if (iteratee(index) === false) {
      break;
    }
  }
}

/**
 * Calculate value from percent.
 *
 * @param {number} value Base value from percent will be calculated.
 * @param {string|number} percent Can be number or string (eq. `'33%'`).
 * @returns {number}
 */
export function valueAccordingPercent(value, percent) {
  percent = parseInt(percent.toString().replace('%', ''), 10);
  percent = isNaN(percent) ? 0 : percent;
  return parseInt(value * percent / 100, 10);
}