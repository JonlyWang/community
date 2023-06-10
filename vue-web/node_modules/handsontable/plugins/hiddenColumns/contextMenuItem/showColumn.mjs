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
                                                   * @param {HiddenColumns} hiddenColumnsPlugin The plugin instance.
                                                   * @returns {object}
                                                   */
export default function showColumnItem(hiddenColumnsPlugin) {
  var columns = [];
  return {
    key: 'hidden_columns_show',
    name: function name() {
      var pluralForm = columns.length > 1 ? 1 : 0;
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_SHOW_COLUMN, pluralForm);
    },
    callback: function callback() {
      var _this$columnIndexMapp, _this$columnIndexMapp2;
      if (columns.length === 0) {
        return;
      }
      var startVisualColumn = columns[0];
      var endVisualColumn = columns[columns.length - 1];

      // Add to the selection one more visual column on the left.
      startVisualColumn = (_this$columnIndexMapp = this.columnIndexMapper.getNearestNotHiddenIndex(startVisualColumn - 1, -1)) !== null && _this$columnIndexMapp !== void 0 ? _this$columnIndexMapp : 0;
      // Add to the selection one more visual column on the right.
      endVisualColumn = (_this$columnIndexMapp2 = this.columnIndexMapper.getNearestNotHiddenIndex(endVisualColumn + 1, 1)) !== null && _this$columnIndexMapp2 !== void 0 ? _this$columnIndexMapp2 : this.countCols() - 1;
      hiddenColumnsPlugin.showColumns(columns);

      // We render columns at first. It was needed for getting fixed columns.
      // Please take a look at #6864 for broader description.
      this.render();
      this.view.adjustElementsSize(true);
      var allColumnsSelected = endVisualColumn - startVisualColumn + 1 === this.countCols();

      // When all headers needs to be selected then do nothing. The header selection is
      // automatically handled by corner click.
      if (!allColumnsSelected) {
        this.selectColumns(startVisualColumn, endVisualColumn);
      }
    },
    disabled: false,
    hidden: function hidden() {
      var _this = this;
      var hiddenPhysicalColumns = arrayMap(hiddenColumnsPlugin.getHiddenColumns(), function (visualColumnIndex) {
        return _this.toPhysicalColumn(visualColumnIndex);
      });
      if (!(this.selection.isSelectedByColumnHeader() || this.selection.isSelectedByCorner()) || hiddenPhysicalColumns.length < 1) {
        return true;
      }
      columns.length = 0;
      var selectedRangeLast = this.getSelectedRangeLast();
      var visualStartColumn = selectedRangeLast.getTopStartCorner().col;
      var visualEndColumn = selectedRangeLast.getBottomEndCorner().col;
      var columnIndexMapper = this.columnIndexMapper;
      var renderableStartColumn = columnIndexMapper.getRenderableFromVisualIndex(visualStartColumn);
      var renderableEndColumn = columnIndexMapper.getRenderableFromVisualIndex(visualEndColumn);
      var notTrimmedColumnIndexes = columnIndexMapper.getNotTrimmedIndexes();
      var physicalColumnIndexes = [];
      if (visualStartColumn !== visualEndColumn) {
        var visualColumnsInRange = visualEndColumn - visualStartColumn + 1;
        var renderedColumnsInRange = renderableEndColumn - renderableStartColumn + 1;

        // Collect not trimmed columns if there are some hidden columns in the selection range.
        if (visualColumnsInRange > renderedColumnsInRange) {
          var physicalIndexesInRange = notTrimmedColumnIndexes.slice(visualStartColumn, visualEndColumn + 1);
          physicalColumnIndexes.push.apply(physicalColumnIndexes, _toConsumableArray(physicalIndexesInRange.filter(function (physicalIndex) {
            return hiddenPhysicalColumns.includes(physicalIndex);
          })));
        }

        // Handled column is the first rendered index and there are some visual indexes before it.
      } else if (renderableStartColumn === 0 && renderableStartColumn < visualStartColumn) {
        // not trimmed indexes -> array of mappings from visual (native array's index) to physical indexes (value).
        physicalColumnIndexes.push.apply(physicalColumnIndexes, _toConsumableArray(notTrimmedColumnIndexes.slice(0, visualStartColumn))); // physical indexes

        // When all columns are hidden and the context menu is triggered using top-left corner.
      } else if (renderableStartColumn === null) {
        // Show all hidden columns.
        physicalColumnIndexes.push.apply(physicalColumnIndexes, _toConsumableArray(notTrimmedColumnIndexes.slice(0, this.countCols())));
      } else {
        var lastVisualIndex = this.countCols() - 1;
        var lastRenderableIndex = columnIndexMapper.getRenderableFromVisualIndex(columnIndexMapper.getNearestNotHiddenIndex(lastVisualIndex, -1));

        // Handled column is the last rendered index and there are some visual indexes after it.
        if (renderableEndColumn === lastRenderableIndex && lastVisualIndex > visualEndColumn) {
          physicalColumnIndexes.push.apply(physicalColumnIndexes, _toConsumableArray(notTrimmedColumnIndexes.slice(visualEndColumn + 1)));
        }
      }
      arrayEach(physicalColumnIndexes, function (physicalColumnIndex) {
        columns.push(_this.toVisualColumn(physicalColumnIndex));
      });
      return columns.length === 0;
    }
  };
}