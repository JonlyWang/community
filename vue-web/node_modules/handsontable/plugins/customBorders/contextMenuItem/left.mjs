import * as C from "../../../i18n/constants.mjs";
import { checkSelectionBorders, markSelected } from "../utils.mjs"; /**
                                                                     * @param {CustomBorders} customBordersPlugin The plugin instance.
                                                                     * @returns {object}
                                                                     */
export default function left(customBordersPlugin) {
  var borderDirection = customBordersPlugin.hot.isRtl() ? 'end' : 'start';
  return {
    key: 'borders:left',
    name: function name() {
      var label = this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_BORDERS_LEFT);
      var hasBorder = checkSelectionBorders(this, borderDirection);
      if (hasBorder) {
        label = markSelected(label);
      }
      return label;
    },
    callback: function callback(key, selected) {
      var hasBorder = checkSelectionBorders(this, borderDirection);
      customBordersPlugin.prepareBorder(selected, borderDirection, hasBorder);
    }
  };
}