import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import staticRegister from "./../../../utils/staticRegister.mjs";
import { ACTIVE_HEADER_TYPE, AREA_TYPE, CELL_TYPE, CUSTOM_SELECTION_TYPE, FILL_TYPE, HEADER_TYPE } from "../constants.mjs";
import activeHeaderHighlight from "./activeHeader.mjs";
import areaHighlight from "./area.mjs";
import cellHighlight from "./cell.mjs";
import customSelection from "./customSelection.mjs";
import fillHighlight from "./fill.mjs";
import headerHighlight from "./header.mjs";
var _staticRegister = staticRegister('highlight/types'),
  register = _staticRegister.register,
  getItem = _staticRegister.getItem;
register(ACTIVE_HEADER_TYPE, activeHeaderHighlight);
register(AREA_TYPE, areaHighlight);
register(CELL_TYPE, cellHighlight);
register(CUSTOM_SELECTION_TYPE, customSelection);
register(FILL_TYPE, fillHighlight);
register(HEADER_TYPE, headerHighlight);

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
export { createHighlight };