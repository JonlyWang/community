"use strict";

require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
exports.__esModule = true;
exports.createHighlight = createHighlight;
var _staticRegister2 = _interopRequireDefault(require("./../../../utils/staticRegister"));
var _constants = require("../constants");
var _activeHeader = _interopRequireDefault(require("./activeHeader"));
var _area = _interopRequireDefault(require("./area"));
var _cell = _interopRequireDefault(require("./cell"));
var _customSelection = _interopRequireDefault(require("./customSelection"));
var _fill = _interopRequireDefault(require("./fill"));
var _header = _interopRequireDefault(require("./header"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var _staticRegister = (0, _staticRegister2.default)('highlight/types'),
  register = _staticRegister.register,
  getItem = _staticRegister.getItem;
register(_constants.ACTIVE_HEADER_TYPE, _activeHeader.default);
register(_constants.AREA_TYPE, _area.default);
register(_constants.CELL_TYPE, _cell.default);
register(_constants.CUSTOM_SELECTION_TYPE, _customSelection.default);
register(_constants.FILL_TYPE, _fill.default);
register(_constants.HEADER_TYPE, _header.default);

/**
 * @param {string} highlightType The selection type.
 * @param {object} options The selection options.
 * @returns {Selection}
 */
function createHighlight(highlightType, options) {
  return getItem(highlightType)(_objectSpread({
    type: highlightType
  }, options));
}