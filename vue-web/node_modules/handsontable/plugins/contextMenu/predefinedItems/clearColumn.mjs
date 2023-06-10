import { getValidSelection } from "../utils.mjs";
import * as C from "../../../i18n/constants.mjs";
export var KEY = 'clear_column';

/**
 * @returns {object}
 */
export default function clearColumnItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_CLEAR_COLUMN);
    },
    callback: function callback(key, selection) {
      var startColumn = selection[0].start.col;
      var endColumn = selection[0].end.col;
      if (this.countRows()) {
        this.populateFromArray(0, startColumn, [[null]], Math.max(selection[0].start.row, selection[0].end.row), endColumn, 'ContextMenu.clearColumn');
      }
    },
    disabled: function disabled() {
      var selected = getValidSelection(this);
      if (!selected) {
        return true;
      }
      return !this.selection.isSelectedByColumnHeader();
    }
  };
}