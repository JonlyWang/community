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
exports.KEY = void 0;
exports.default = readOnlyItem;
var _utils = require("../utils");
var _array = require("../../../helpers/array");
var C = _interopRequireWildcard(require("../../../i18n/constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var KEY = 'make_read_only';

/**
 * @returns {object}
 */
exports.KEY = KEY;
function readOnlyItem() {
  return {
    key: KEY,
    name: function name() {
      var _this = this;
      var label = this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_READ_ONLY);
      var atLeastOneReadOnly = (0, _utils.checkSelectionConsistency)(this.getSelectedRange(), function (row, col) {
        return _this.getCellMeta(row, col).readOnly;
      });
      if (atLeastOneReadOnly) {
        label = (0, _utils.markLabelAsSelected)(label);
      }
      return label;
    },
    callback: function callback() {
      var _this2 = this;
      var ranges = this.getSelectedRange();
      var atLeastOneReadOnly = (0, _utils.checkSelectionConsistency)(ranges, function (row, col) {
        return _this2.getCellMeta(row, col).readOnly;
      });
      (0, _array.arrayEach)(ranges, function (range) {
        range.forAll(function (row, col) {
          if (row >= 0 && col >= 0) {
            _this2.setCellMeta(row, col, 'readOnly', !atLeastOneReadOnly);
          }
        });
      });
      this.render();
    },
    disabled: function disabled() {
      if (this.selection.isSelectedByCorner()) {
        return true;
      }
      if (this.countRows() === 0 || this.countCols() === 0) {
        return true;
      }
      if (!this.getSelectedRange() || this.getSelectedRange().length === 0) {
        return true;
      }
      return false;
    }
  };
}