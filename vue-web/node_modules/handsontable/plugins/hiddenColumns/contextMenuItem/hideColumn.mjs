import "core-js/modules/es.number.is-integer.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import * as C from "../../../i18n/constants.mjs"; /**
                                                   * @param {HiddenColumns} hiddenColumnsPlugin The plugin instance.
                                                   * @returns {object}
                                                   */
export default function hideColumnItem(hiddenColumnsPlugin) {
  return {
    key: 'hidden_columns_hide',
    name: function name() {
      var selection = this.getSelectedLast();
      var pluralForm = 0;
      if (Array.isArray(selection)) {
        var _selection = _slicedToArray(selection, 4),
          fromColumn = _selection[1],
          toColumn = _selection[3];
        if (fromColumn - toColumn !== 0) {
          pluralForm = 1;
        }
      }
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_HIDE_COLUMN, pluralForm);
    },
    callback: function callback() {
      var _this$getSelectedRang = this.getSelectedRangeLast(),
        from = _this$getSelectedRang.from,
        to = _this$getSelectedRang.to;
      var start = Math.max(Math.min(from.col, to.col), 0);
      var end = Math.max(from.col, to.col);
      var columnsToHide = [];
      for (var visualColumn = start; visualColumn <= end; visualColumn += 1) {
        columnsToHide.push(visualColumn);
      }
      hiddenColumnsPlugin.hideColumns(columnsToHide);
      var lastHiddenColumn = columnsToHide[columnsToHide.length - 1];
      var columnToSelect = this.columnIndexMapper.getNearestNotHiddenIndex(lastHiddenColumn, 1, true);
      if (Number.isInteger(columnToSelect) && columnToSelect >= 0) {
        this.selectColumns(columnToSelect);
      } else {
        this.deselectCell();
      }
      this.render();
      this.view.adjustElementsSize(true);
    },
    disabled: false,
    hidden: function hidden() {
      return !(this.selection.isSelectedByColumnHeader() || this.selection.isSelectedByCorner());
    }
  };
}