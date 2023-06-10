import { getValidSelection } from "../utils.mjs";
import * as C from "../../../i18n/constants.mjs";
export var KEY = 'row_above';

/**
 * @returns {object}
 */
export default function rowAboveItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_ROW_ABOVE);
    },
    callback: function callback() {
      var latestSelection = this.getSelectedRangeLast().getTopLeftCorner();
      this.alter('insert_row_above', latestSelection.row, 1, 'ContextMenu.rowAbove');
    },
    disabled: function disabled() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      if (this.selection.isSelectedByCorner()) {
        var totalRows = this.countRows();

        // Enable "Insert row above" only when there is at least one row.
        return totalRows === 0;
      }
      return this.selection.isSelectedByColumnHeader() || this.countRows() >= this.getSettings().maxRows;
    },
    hidden: function hidden() {
      return !this.getSettings().allowInsertRow;
    }
  };
}