"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
exports.__esModule = true;
exports.normalizeSettings = normalizeSettings;
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.array.concat.js");
var _array = require("../../../helpers/array");
var _object = require("../../../helpers/object");
var _mixed = require("../../../helpers/mixed");
var _utils = require("./utils");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * A function that normalizes user-defined settings into one predictable
 * structure. Currently, the developer can declare nested headers by passing
 * the following unstructured (and sometimes uncompleted) array.
 *   [
 *     [{ label: 'A1', colspan: 2 }],
 *     [{ label: true }, 'B2', 4],
 *     [],
 *   ]
 *
 * The normalization process equalizes the length of columns to each header
 * layers to the same length and generates object settings with a common shape.
 * So the above mentioned example will be normalized into this:
 *   [
 *     [
 *       { label: 'A1', colspan: 2, isHidden: false, ... },
 *       { label: '', colspan: 1, isHidden: true, ... },
 *       { label: '', colspan: 1, isHidden: false, ... },
 *     ],
 *     [
 *       { label: 'true', colspan: 1, isHidden: false, ... },
 *       { label: 'B2', colspan: 1, isHidden: false, ... },
 *       { label: '4', colspan: 1, isHidden: false, ... },
 *     ],
 *     [
 *       { label: '', colspan: 1, isHidden: false, ... },
 *       { label: '', colspan: 1, isHidden: false, ... },
 *       { label: '', colspan: 1, isHidden: false, ... },
 *     ],
 *   ]
 *
 * @param {Array[]} sourceSettings An array with defined nested headers settings.
 * @param {number} [columnsLimit=Infinity] A number of columns to which the structure
 *                                         will be trimmed. While trimming the colspan
 *                                         values are adjusted to preserve the original
 *                                         structure.
 * @returns {Array[]}
 */
function normalizeSettings(sourceSettings) {
  var columnsLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  var normalizedSettings = [];
  if (columnsLimit === 0) {
    return normalizedSettings;
  }

  // Normalize array items (header settings) into one shape - literal object with default props.
  (0, _array.arrayEach)(sourceSettings, function (headersSettings) {
    var columns = [];
    var columnIndex = 0;
    normalizedSettings.push(columns);
    (0, _array.arrayEach)(headersSettings, function (sourceHeaderSettings) {
      var headerSettings = (0, _utils.createDefaultHeaderSettings)();
      if ((0, _object.isObject)(sourceHeaderSettings)) {
        var label = sourceHeaderSettings.label,
          colspan = sourceHeaderSettings.colspan;
        headerSettings.label = (0, _mixed.stringify)(label);
        if (typeof colspan === 'number' && colspan > 1) {
          headerSettings.colspan = colspan;
          headerSettings.origColspan = colspan;
        }
      } else {
        headerSettings.label = (0, _mixed.stringify)(sourceHeaderSettings);
      }
      columnIndex += headerSettings.origColspan;
      var cancelProcessing = false;
      if (columnIndex >= columnsLimit) {
        // Adjust the colspan value to not overlap the columns limit.
        headerSettings.colspan = headerSettings.origColspan - (columnIndex - columnsLimit);
        headerSettings.origColspan = headerSettings.colspan;
        cancelProcessing = true;
      }
      columns.push(headerSettings);
      if (headerSettings.colspan > 1) {
        for (var i = 0; i < headerSettings.colspan - 1; i++) {
          columns.push((0, _utils.createPlaceholderHeaderSettings)());
        }
      }
      return !cancelProcessing;
    });
  });
  var columnsLength = Math.max.apply(Math, _toConsumableArray((0, _array.arrayMap)(normalizedSettings, function (headersSettings) {
    return headersSettings.length;
  })));

  // Normalize the length of each header layer to the same columns length.
  (0, _array.arrayEach)(normalizedSettings, function (headersSettings) {
    if (headersSettings.length < columnsLength) {
      var defaultSettings = (0, _array.arrayMap)(new Array(columnsLength - headersSettings.length), function () {
        return (0, _utils.createDefaultHeaderSettings)();
      });
      headersSettings.splice.apply(headersSettings, [headersSettings.length, 0].concat(_toConsumableArray(defaultSettings)));
    }
  });
  return normalizedSettings;
}