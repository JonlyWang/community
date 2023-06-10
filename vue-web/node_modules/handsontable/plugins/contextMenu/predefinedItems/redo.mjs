import * as C from "../../../i18n/constants.mjs";
export var KEY = 'redo';

/**
 * @returns {object}
 */
export default function redoItem() {
  return {
    key: KEY,
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_REDO);
    },
    callback: function callback() {
      this.redo();
    },
    hidden: function hidden() {
      var undoRedo = this.getPlugin('undoRedo');
      return !undoRedo || !undoRedo.isEnabled();
    },
    disabled: function disabled() {
      return !this.getPlugin('undoRedo').isRedoAvailable();
    }
  };
}