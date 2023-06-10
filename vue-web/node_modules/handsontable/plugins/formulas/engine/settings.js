"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
exports.__esModule = true;
exports.DEFAULT_LICENSE_KEY = void 0;
exports.getEngineSettingsOverrides = getEngineSettingsOverrides;
exports.getEngineSettingsWithDefaultsAndOverrides = getEngineSettingsWithDefaultsAndOverrides;
exports.getEngineSettingsWithOverrides = getEngineSettingsWithOverrides;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.keys.js");
var _formulas = require("../formulas");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var DEFAULT_LICENSE_KEY = 'internal-use-in-handsontable';
exports.DEFAULT_LICENSE_KEY = DEFAULT_LICENSE_KEY;
var DEFAULT_SETTINGS = {
  licenseKey: DEFAULT_LICENSE_KEY,
  useArrayArithmetic: true,
  useColumnIndex: false,
  useStats: false,
  evaluateNullToZero: true,
  precisionEpsilon: 1e-13,
  precisionRounding: 14,
  smartRounding: true,
  leapYear1900: true,
  nullDate: {
    year: 1899,
    month: 12,
    day: 31
  },
  nullYear: 30,
  dateFormats: ['DD/MM/YYYY', 'DD/MM/YY'],
  timeFormats: ['hh:mm', 'hh:mm:ss.sss'],
  matchWholeCell: true,
  useRegularExpressions: false,
  useWildcards: true,
  functionArgSeparator: ',',
  thousandSeparator: '',
  decimalSeparator: '.',
  language: 'enGB'
};

/**
 * Gets a set of engine settings to be applied on top of the provided settings, based on user's Handsontable settings.
 *
 * @param {object} hotSettings Handsontable settings object.
 * @returns {object} Object containing the overriding options.
 */
function getEngineSettingsOverrides(hotSettings) {
  var _hotSettings$PLUGIN_K, _hotSettings$PLUGIN_K2;
  return {
    maxColumns: hotSettings.maxColumns,
    maxRows: hotSettings.maxRows,
    language: (_hotSettings$PLUGIN_K = hotSettings[_formulas.PLUGIN_KEY]) === null || _hotSettings$PLUGIN_K === void 0 ? void 0 : (_hotSettings$PLUGIN_K2 = _hotSettings$PLUGIN_K.language) === null || _hotSettings$PLUGIN_K2 === void 0 ? void 0 : _hotSettings$PLUGIN_K2.langCode
  };
}

/**
 * Drop `hyperformula` key from object if it exists.
 *
 * @param {object} pluginSettings Formulas plugin settings.
 * @returns {object}
 */
function cleanEngineSettings(pluginSettings) {
  return Object.keys(pluginSettings).reduce(function (obj, key) {
    if (key !== 'hyperformula') {
      obj[key] = pluginSettings[key];
    }
    return obj;
  }, {});
}

/**
 * Takes the default, user and overriding settings and merges them into a single object to be passed to the engine.
 *
 * The final object gets its parameters in the following order,
 * with properties attached to objects listed in the lower levels of the list overriding the
 * ones above them:
 *
 * 1. Default settings
 * 2. User settings
 * 3. Overrides.
 *
 * Meant to be used during *initialization* of the engine.
 *
 * @param {object} hotSettings The Handsontable settings.
 * @returns {object} The final engine settings.
 */
function getEngineSettingsWithDefaultsAndOverrides(hotSettings) {
  var _pluginSettings$engin;
  var pluginSettings = hotSettings[_formulas.PLUGIN_KEY];
  var userSettings = cleanEngineSettings(pluginSettings !== null && pluginSettings !== void 0 && (_pluginSettings$engin = pluginSettings.engine) !== null && _pluginSettings$engin !== void 0 && _pluginSettings$engin.hyperformula ? pluginSettings.engine : {});
  var overrides = getEngineSettingsOverrides(hotSettings);
  return _objectSpread(_objectSpread(_objectSpread({}, DEFAULT_SETTINGS), userSettings), overrides);
}

/**
 * Get engine settings from a Handsontable settings object with overrides.
 *
 * @param {object} hotSettings Handsontable settings object.
 * @returns {object}
 */
function getEngineSettingsWithOverrides(hotSettings) {
  var _pluginSettings$engin2;
  var pluginSettings = hotSettings[_formulas.PLUGIN_KEY];
  var userSettings = cleanEngineSettings(pluginSettings !== null && pluginSettings !== void 0 && (_pluginSettings$engin2 = pluginSettings.engine) !== null && _pluginSettings$engin2 !== void 0 && _pluginSettings$engin2.hyperformula ? pluginSettings.engine : {});
  var overrides = getEngineSettingsOverrides(hotSettings);
  return _objectSpread(_objectSpread({}, userSettings), overrides);
}