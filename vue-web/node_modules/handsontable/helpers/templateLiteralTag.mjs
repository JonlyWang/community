import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.string.trim.js";
import { arrayReduce } from "../helpers/array.mjs"; /**
                                                     * Tags a multiline string and return new one without line break characters and following spaces.
                                                     *
                                                     * @param {Array} strings Parts of the entire string without expressions.
                                                     * @param {...string} expressions Expressions converted to strings, which are added to the entire string.
                                                     * @returns {string}
                                                     */
export function toSingleLine(strings) {
  for (var _len = arguments.length, expressions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    expressions[_key - 1] = arguments[_key];
  }
  var result = arrayReduce(strings, function (previousValue, currentValue, index) {
    var valueWithoutWhiteSpaces = currentValue.replace(/\r?\n\s*/g, '');
    var expressionForIndex = expressions[index] ? expressions[index] : '';
    return previousValue + valueWithoutWhiteSpaces + expressionForIndex;
  }, '');
  return result.trim();
}