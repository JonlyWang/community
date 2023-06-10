import { getValidSelection } from "../utils.mjs";
import * as C from "../../../i18n/constants.mjs";
export var KEY = 'col_left';

/**
 * @returns {object}
 */
export default function columnLeftItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_INSERT_LEFT);
    },
    callback: function callback() {
      var latestSelection = this.getSelectedRangeLast().getTopLeftCorner();
      var alterAction = this.isRtl() ? 'insert_col_end' : 'insert_col_start';
      this.alter(alterAction, latestSelection.col, 1, 'ContextMenu.columnLeft');
    },
    disabled: function disabled() {
      if (!this.isColumnModificationAllowed()) {
        return true;
      }
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      if (this.selection.isSelectedByCorner()) {
        var totalColumns = this.countCols();

        // Enable "Insert column left" only when there is at least one column.
        return totalColumns === 0;
      }
      return this.selection.isSelectedByRowHeader() || this.countCols() >= this.getSettings().maxCols;
    },
    hidden: function hidden() {
      return !this.getSettings().allowInsertColumn;
    }
  };
}