import * as C from "../../../i18n/constants.mjs"; /**
                                                   * @param {CopyPaste} copyPastePlugin The plugin instance.
                                                   * @returns {object}
                                                   */
export default function cutItem(copyPastePlugin) {
  return {
    key: 'cut',
    name: function name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_CUT);
    },
    callback: function callback() {
      copyPastePlugin.cut();
    },
    disabled: function disabled() {
      if (this.countRows() === 0 || this.countCols() === 0) {
        return true;
      }
      var selected = this.getSelected();

      // Disable for no selection or for non-contiquous selection.
      if (!selected || selected.length > 1) {
        return true;
      }
      return false;
    },
    hidden: false
  };
}