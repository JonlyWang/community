import { getValidSelection } from "../utils.mjs";
import * as C from "../../../i18n/constants.mjs";
export var KEY = 'row_below';

/**
 * @returns {object}
 */
export default function rowBelowItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_ROW_BELOW);
    },
    callback: function callback() {
      var latestSelection = this.getSelectedRangeLast().getBottomRightCorner();
      this.alter('insert_row_below', latestSelection.row, 1, 'ContextMenu.rowBelow');
    },
    disabled: function disabled() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      if (this.selection.isSelectedByCorner()) {
        // Enable "Insert row below" always when the menu is triggered by corner click.
        return false;
      }
      return this.selection.isSelectedByColumnHeader() || this.countRows() >= this.getSettings().maxRows;
    },
    hidden: function hidden() {
      return !this.getSettings().allowInsertRow;
    }
  };
}