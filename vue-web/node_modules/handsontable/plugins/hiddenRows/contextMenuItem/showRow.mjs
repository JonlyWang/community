function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import { arrayEach, arrayMap } from "../../../helpers/array.mjs";
import * as C from "../../../i18n/constants.mjs"; /**
                                                   * @param {HiddenRows} hiddenRowsPlugin The plugin instance.
                                                   * @returns {object}
                                                   */
export default function showRowItem(hiddenRowsPlugin) {
  var rows = [];
  return {
    key: 'hidden_rows_show',
    name: function name() {
      var pluralForm = rows.length > 1 ? 1 : 0;
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_SHOW_ROW, pluralForm);
    },
    callback: function callback() {
      var _this$rowIndexMapper$, _this$rowIndexMapper$2;
      if (rows.length === 0) {
        return;
      }
      var startVisualRow = rows[0];
      var endVisualRow = rows[rows.length - 1];

      // Add to the selection one more visual row on the top.
      startVisualRow = (_this$rowIndexMapper$ = this.rowIndexMapper.getNearestNotHiddenIndex(startVisualRow - 1, -1)) !== null && _this$rowIndexMapper$ !== void 0 ? _this$rowIndexMapper$ : 0;
      // Add to the selection one more visual row on the bottom.
      endVisualRow = (_this$rowIndexMapper$2 = this.rowIndexMapper.getNearestNotHiddenIndex(endVisualRow + 1, 1)) !== null && _this$rowIndexMapper$2 !== void 0 ? _this$rowIndexMapper$2 : this.countRows() - 1;
      hiddenRowsPlugin.showRows(rows);

      // We render rows at first. It was needed for getting fixed rows.
      // Please take a look at #6864 for broader description.
      this.render();
      this.view.adjustElementsSize(true);
      var allRowsSelected = endVisualRow - startVisualRow + 1 === this.countRows();

      // When all headers needs to be selected then do nothing. The header selection is
      // automatically handled by corner click.
      if (!allRowsSelected) {
        this.selectRows(startVisualRow, endVisualRow);
      }
    },
    disabled: false,
    hidden: function hidden() {
      var _this = this;
      var hiddenPhysicalRows = arrayMap(hiddenRowsPlugin.getHiddenRows(), function (visualRowIndex) {
        return _this.toPhysicalRow(visualRowIndex);
      });
      if (!(this.selection.isSelectedByRowHeader() || this.selection.isSelectedByCorner()) || hiddenPhysicalRows.length < 1) {
        return true;
      }
      rows.length = 0;
      var selectedRangeLast = this.getSelectedRangeLast();
      var visualStartRow = selectedRangeLast.getTopStartCorner().row;
      var visualEndRow = selectedRangeLast.getBottomEndCorner().row;
      var rowIndexMapper = this.rowIndexMapper;
      var renderableStartRow = rowIndexMapper.getRenderableFromVisualIndex(visualStartRow);
      var renderableEndRow = rowIndexMapper.getRenderableFromVisualIndex(visualEndRow);
      var notTrimmedRowIndexes = rowIndexMapper.getNotTrimmedIndexes();
      var physicalRowIndexes = [];
      if (visualStartRow !== visualEndRow) {
        var visualRowsInRange = visualEndRow - visualStartRow + 1;
        var renderedRowsInRange = renderableEndRow - renderableStartRow + 1;

        // Collect not trimmed rows if there are some hidden rows in the selection range.
        if (visualRowsInRange > renderedRowsInRange) {
          var physicalIndexesInRange = notTrimmedRowIndexes.slice(visualStartRow, visualEndRow + 1);
          physicalRowIndexes.push.apply(physicalRowIndexes, _toConsumableArray(physicalIndexesInRange.filter(function (physicalIndex) {
            return hiddenPhysicalRows.includes(physicalIndex);
          })));
        }

        // Handled row is the first rendered index and there are some visual indexes before it.
      } else if (renderableStartRow === 0 && renderableStartRow < visualStartRow) {
        // not trimmed indexes -> array of mappings from visual (native array's index) to physical indexes (value).
        physicalRowIndexes.push.apply(physicalRowIndexes, _toConsumableArray(notTrimmedRowIndexes.slice(0, visualStartRow))); // physical indexes

        // When all rows are hidden and the context menu is triggered using top-left corner.
      } else if (renderableStartRow === null) {
        // Show all hidden rows.
        physicalRowIndexes.push.apply(physicalRowIndexes, _toConsumableArray(notTrimmedRowIndexes.slice(0, this.countRows())));
      } else {
        var lastVisualIndex = this.countRows() - 1;
        var lastRenderableIndex = rowIndexMapper.getRenderableFromVisualIndex(rowIndexMapper.getNearestNotHiddenIndex(lastVisualIndex, -1));

        // Handled row is the last rendered index and there are some visual indexes after it.
        if (renderableEndRow === lastRenderableIndex && lastVisualIndex > visualEndRow) {
          physicalRowIndexes.push.apply(physicalRowIndexes, _toConsumableArray(notTrimmedRowIndexes.slice(visualEndRow + 1)));
        }
      }
      arrayEach(physicalRowIndexes, function (physicalRowIndex) {
        rows.push(_this.toVisualRow(physicalRowIndex));
      });
      return rows.length === 0;
    }
  };
}