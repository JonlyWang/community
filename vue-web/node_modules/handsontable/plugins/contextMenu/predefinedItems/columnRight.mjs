import { getValidSelection } from "../utils.mjs";
import * as C from "../../../i18n/constants.mjs";
export var KEY = 'col_right';

/**
 * @returns {object}
 */
export default function columnRightItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_INSERT_RIGHT);
    },
    callback: function callback() {
      var latestSelection = this.getSelectedRangeLast().getTopRightCorner();
      var alterAction = this.isRtl() ? 'insert_col_start' : 'insert_col_end';
      this.alter(alterAction, latestSelection.col, 1, 'ContextMenu.columnRight');
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
        // Enable "Insert column right" always when the menu is triggered by corner click.
        return false;
      }
      return this.selection.isSelectedByRowHeader() || this.countCols() >= this.getSettings().maxCols;
    },
    hidden: function hidden() {
      return !this.getSettings().allowInsertColumn;
    }
  };
}