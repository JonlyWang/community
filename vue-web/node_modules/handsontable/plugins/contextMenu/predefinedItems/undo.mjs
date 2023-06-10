import * as C from "../../../i18n/constants.mjs";
export var KEY = 'undo';

/**
 * @returns {object}
 */
export default function undoItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_UNDO);
    },
    callback: function callback() {
      this.undo();
    },
    hidden: function hidden() {
      var undoRedo = this.getPlugin('undoRedo');
      return !undoRedo || !undoRedo.isEnabled();
    },
    disabled: function disabled() {
      return !this.getPlugin('undoRedo').isUndoAvailable();
    }
  };
}