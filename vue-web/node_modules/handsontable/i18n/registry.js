"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
exports.__esModule = true;
exports.dictionaryKeys = exports.DEFAULT_LANGUAGE_CODE = void 0;
exports.getDefaultLanguageDictionary = getDefaultLanguageDictionary;
exports.getLanguageDictionary = getLanguageDictionary;
exports.getLanguagesDictionaries = getLanguagesDictionaries;
exports.getTranslatedPhrase = getTranslatedPhrase;
exports.getValidLanguageCode = getValidLanguageCode;
exports.hasLanguageDictionary = hasLanguageDictionary;
exports.registerLanguageDictionary = registerLanguageDictionary;
var _object = require("../helpers/object");
var _array = require("./../helpers/array");
var _mixed = require("../helpers/mixed");
var _utils = require("./utils");
var _staticRegister2 = _interopRequireDefault(require("../utils/staticRegister"));
var _phraseFormatters = require("./phraseFormatters");
var _enUS = _interopRequireDefault(require("./languages/en-US"));
var _dictionaryKeys = _interopRequireWildcard(require("./constants"));
exports.dictionaryKeys = _dictionaryKeys;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DEFAULT_LANGUAGE_CODE = _enUS.default.languageCode;
exports.DEFAULT_LANGUAGE_CODE = DEFAULT_LANGUAGE_CODE;
var _staticRegister = (0, _staticRegister2.default)('languagesDictionaries'),
  registerGloballyLanguageDictionary = _staticRegister.register,
  getGlobalLanguageDictionary = _staticRegister.getItem,
  hasGlobalLanguageDictionary = _staticRegister.hasItem,
  getGlobalLanguagesDictionaries = _staticRegister.getValues;

/**
 * Register automatically the default language dictionary.
 */
registerLanguageDictionary(_enUS.default);

/**
 * Register language dictionary for specific language code.
 *
 * @param {string|object} languageCodeOrDictionary Language code for specific language i.e. 'en-US', 'pt-BR', 'de-DE' or object representing dictionary.
 * @param {object} dictionary Dictionary for specific language (optional if first parameter has already dictionary).
 * @returns {object}
 */
function registerLanguageDictionary(languageCodeOrDictionary, dictionary) {
  var languageCode = languageCodeOrDictionary;
  var dictionaryObject = dictionary;

  // Dictionary passed as first argument.
  if ((0, _object.isObject)(languageCodeOrDictionary)) {
    dictionaryObject = languageCodeOrDictionary;
    languageCode = dictionaryObject.languageCode;
  }
  extendLanguageDictionary(languageCode, dictionaryObject);
  registerGloballyLanguageDictionary(languageCode, (0, _object.deepClone)(dictionaryObject));

  // We do not allow user to work with dictionary by reference, it can cause lot of bugs.
  return (0, _object.deepClone)(dictionaryObject);
}

/**
 * Extend handled dictionary by default language dictionary. As result, if any dictionary key isn't defined for specific language, it will be filled with default language value ("dictionary gaps" are supplemented).
 *
 * @private
 * @param {string} languageCode Language code.
 * @param {object} dictionary Dictionary which is extended.
 */
function extendLanguageDictionary(languageCode, dictionary) {
  if (languageCode !== DEFAULT_LANGUAGE_CODE) {
    (0, _utils.extendNotExistingKeys)(dictionary, getGlobalLanguageDictionary(DEFAULT_LANGUAGE_CODE));
  }
}

/**
 * Get language dictionary for specific language code.
 *
 * @param {string} languageCode Language code.
 * @returns {object} Object with constants representing identifiers for translation (as keys) and corresponding translation phrases (as values).
 */
function getLanguageDictionary(languageCode) {
  if (!hasLanguageDictionary(languageCode)) {
    return null;
  }
  return (0, _object.deepClone)(getGlobalLanguageDictionary(languageCode));
}

/**
 *
 * Get if language with specified language code was registered.
 *
 * @param {string} languageCode Language code for specific language i.e. 'en-US', 'pt-BR', 'de-DE'.
 * @returns {boolean}
 */
function hasLanguageDictionary(languageCode) {
  return hasGlobalLanguageDictionary(languageCode);
}

/**
 * Get default language dictionary.
 *
 * @returns {object} Object with constants representing identifiers for translation (as keys) and corresponding translation phrases (as values).
 */
function getDefaultLanguageDictionary() {
  return _enUS.default;
}

/**
 * Get registered language dictionaries.
 *
 * @returns {Array}
 */
function getLanguagesDictionaries() {
  return getGlobalLanguagesDictionaries();
}

/**
 * Get phrase for specified dictionary key.
 *
 * @param {string} languageCode Language code for specific language i.e. 'en-US', 'pt-BR', 'de-DE'.
 * @param {string} dictionaryKey Constant which is dictionary key.
 * @param {*} argumentsForFormatters Arguments which will be handled by formatters.
 *
 * @returns {string}
 */
function getTranslatedPhrase(languageCode, dictionaryKey, argumentsForFormatters) {
  var languageDictionary = getLanguageDictionary(languageCode);
  if (languageDictionary === null) {
    return null;
  }
  var phrasePropositions = languageDictionary[dictionaryKey];
  if ((0, _mixed.isUndefined)(phrasePropositions)) {
    return null;
  }
  var formattedPhrase = getFormattedPhrase(phrasePropositions, argumentsForFormatters);
  if (Array.isArray(formattedPhrase)) {
    return formattedPhrase[0];
  }
  return formattedPhrase;
}

/**
 * Get formatted phrase from phrases propositions for specified dictionary key.
 *
 * @private
 * @param {Array|string} phrasePropositions List of phrase propositions.
 * @param {*} argumentsForFormatters Arguments which will be handled by formatters.
 *
 * @returns {Array|string}
 */
function getFormattedPhrase(phrasePropositions, argumentsForFormatters) {
  var formattedPhrasePropositions = phrasePropositions;
  (0, _array.arrayEach)((0, _phraseFormatters.getPhraseFormatters)(), function (formatter) {
    formattedPhrasePropositions = formatter(phrasePropositions, argumentsForFormatters);
  });
  return formattedPhrasePropositions;
}

/**
 * Returns valid language code. If the passed language code doesn't exist default one will be used.
 *
 * @param {string} languageCode Language code for specific language i.e. 'en-US', 'pt-BR', 'de-DE'.
 * @returns {string}
 */
function getValidLanguageCode(languageCode) {
  var normalizedLanguageCode = (0, _utils.normalizeLanguageCode)(languageCode);
  if (!hasLanguageDictionary(normalizedLanguageCode)) {
    normalizedLanguageCode = DEFAULT_LANGUAGE_CODE;
    (0, _utils.warnUserAboutLanguageRegistration)(languageCode);
  }
  return normalizedLanguageCode;
}