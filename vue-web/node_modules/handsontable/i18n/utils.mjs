var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";
import { isUndefined, isDefined } from "./../helpers/mixed.mjs";
import { objectEach } from "./../helpers/object.mjs";
import { error } from "./../helpers/console.mjs";
import { toSingleLine } from "./../helpers/templateLiteralTag.mjs"; /**
                                                                     * Perform shallow extend of a target object with only this extension's properties which doesn't exist in the target.
                                                                     *
                                                                     * TODO: Maybe it should be moved to global helpers? It's changed `extend` function.
                                                                     *
                                                                     * @param {object} target An object that will receive the new properties.
                                                                     * @param {object} extension An object containing additional properties to merge into the target.
                                                                     * @returns {object}
                                                                     */
export function extendNotExistingKeys(target, extension) {
  objectEach(extension, function (value, key) {
    if (isUndefined(target[key])) {
      target[key] = value;
    }
  });
  return target;
}

/**
 * Create range of values basing on cell indexes. For example, it will create below ranges for specified function arguments:
 *
 * createCellHeadersRange(2, 7) => `2-7`
 * createCellHeadersRange(7, 2) => `2-7`
 * createCellHeadersRange(0, 4, 'A', 'D') => `A-D`
 * createCellHeadersRange(4, 0, 'D', 'A') => `A-D`.
 *
 * @param {number} firstRowIndex Index of "first" cell.
 * @param {number} nextRowIndex Index of "next" cell.
 * @param {*} fromValue Value which will represent "first" cell.
 * @param {*} toValue Value which will represent "next" cell.
 * @returns {string} Value representing range i.e. A-Z, 11-15.
 */
export function createCellHeadersRange(firstRowIndex, nextRowIndex) {
  var fromValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : firstRowIndex;
  var toValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : nextRowIndex;
  // Will swap `fromValue` with `toValue` if it's necessary.
  var from = fromValue,
    to = toValue;
  if (firstRowIndex > nextRowIndex) {
    var _ref = [to, from];
    from = _ref[0];
    to = _ref[1];
  }
  return "".concat(from, "-").concat(to);
}

/**
 * Normalize language code. It takes handled languageCode proposition and change it to proper languageCode.
 * For example, when it takes `eN-us` as parameter it return `en-US`.
 *
 * @param {string} languageCode Language code for specific language i.e. 'en-US', 'pt-BR', 'de-DE'.
 * @returns {string}
 */
export function normalizeLanguageCode(languageCode) {
  var languageCodePattern = /^([a-zA-Z]{2})-([a-zA-Z]{2})$/;
  var partsOfLanguageCode = languageCodePattern.exec(languageCode);
  if (partsOfLanguageCode) {
    return "".concat(partsOfLanguageCode[1].toLowerCase(), "-").concat(partsOfLanguageCode[2].toUpperCase());
  }
  return languageCode;
}

/**
 *
 * Warn user if there is no registered language.
 *
 * @param {string} languageCode Language code for specific language i.e. 'en-US', 'pt-BR', 'de-DE'.
 */
export function warnUserAboutLanguageRegistration(languageCode) {
  if (isDefined(languageCode)) {
    error(toSingleLine(_templateObject || (_templateObject = _taggedTemplateLiteral(["Language with code \"", "\" was not found. You should register particular language \n    before using it. Read more about this issue at: https://docs.handsontable.com/i18n/missing-language-code."], ["Language with code \"", "\" was not found. You should register particular language\\x20\n    before using it. Read more about this issue at: https://docs.handsontable.com/i18n/missing-language-code."])), languageCode));
  }
}