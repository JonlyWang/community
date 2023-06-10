function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
import { FILL_TYPE } from "../constants.mjs";
import VisualSelection from "../visualSelection.mjs"; /**
                                                       * Creates the new instance of Selection, responsible for highlighting cells which are covered by fill handle
                                                       * functionality. This type of selection can present on the table only one at the time.
                                                       *
                                                       * @param {object} highlightParams A configuration object to create a highlight.
                                                       * @returns {Selection}
                                                       */
function createHighlight(_ref) {
  var restOptions = Object.assign({}, (_objectDestructuringEmpty(_ref), _ref));
  var s = new VisualSelection(_objectSpread(_objectSpread({
    className: 'fill',
    border: {
      width: 1,
      color: '#ff0000'
    }
  }, restOptions), {}, {
    selectionType: FILL_TYPE
  }));
  return s;
}
export default createHighlight;